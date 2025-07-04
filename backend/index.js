import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;
const MODEL_NAME = "o4-mini";

// Session tracking for multiple users
const activeSessions = new Map();

// Debug logging function
const debug = (message, data = null) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
  if (data) {
    console.log('Data:', JSON.stringify(data, null, 2));
  }
};

// Error logging function
const logError = (message, error) => {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] ERROR: ${message}`);
  console.error('Error details:', error);
  if (error.response?.data) {
    console.error('API Response:', JSON.stringify(error.response.data, null, 2));
  }
};

// Configure CORS
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // In development, allow any localhost or local network IP
    if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
      if (origin.startsWith('http://localhost:') || 
          origin.startsWith('http://127.0.0.1:') ||
          origin.match(/^http:\/\/192\.168\.\d+\.\d+:\d+$/)) {
        return callback(null, true);
      }
    }
    
    // In production, only allow specific origins
    const allowedOrigins = ['http://localhost:3000', 'http://157.180.120.247'];
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // Reject other origins
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Session-ID'],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Middleware to log all requests and track sessions
app.use((req, res, next) => {
  const sessionId = req.headers['x-session-id'] || req.body?.sessionId || 'anonymous';
  req.sessionId = sessionId;
  
  debug(`Incoming ${req.method} request to ${req.path}`, {
    sessionId,
    body: req.body,
    query: req.query,
    activeSessions: activeSessions.size
  });
  next();
});

// Clean up old sessions (older than 1 hour)
const cleanupSessions = () => {
  const oneHourAgo = Date.now() - (60 * 60 * 1000);
  let cleanedCount = 0;
  
  for (const [sessionId, sessionData] of activeSessions.entries()) {
    if (sessionData.lastActivity < oneHourAgo) {
      activeSessions.delete(sessionId);
      cleanedCount++;
    }
  }
  
  if (cleanedCount > 0) {
    debug(`Cleaned up ${cleanedCount} old sessions. Active sessions: ${activeSessions.size}`);
  }
};

// Run cleanup every 10 minutes
setInterval(cleanupSessions, 10 * 60 * 1000);

// Test endpoint (similar to your FastAPI root endpoint)
app.get('/', (req, res) => {
  debug('Health check endpoint called', {
    sessionId: req.sessionId,
    activeSessions: activeSessions.size
  });
  res.json({ 
    message: "Career Evaluator is running!",
    status: "healthy",
    timestamp: new Date().toISOString(),
    activeSessions: activeSessions.size
  });
});

app.post('/evaluate', async (req, res) => {
  const { answers, sessionId } = req.body;
  const currentSessionId = req.sessionId;
  
  debug('Received evaluation request', { 
    sessionId: currentSessionId, 
    answers,
    activeSessions: activeSessions.size 
  });

  if (!answers) {
    logError('Missing answers in request', { 
      sessionId: currentSessionId, 
      body: req.body 
    });
    return res.status(400).json({ error: 'Missing answers' });
  }

  if (!process.env.OPENAI_API_KEY) {
    logError('OpenAI API key not configured', { sessionId: currentSessionId });
    return res.status(500).json({ 
      error: 'OpenAI API key not configured',
      details: 'Please set OPENAI_API_KEY environment variable'
    });
  }

  // Track session activity
  activeSessions.set(currentSessionId, {
    startTime: Date.now(),
    lastActivity: Date.now(),
    status: 'processing'
  });

  try {
    const systemPrompt = `You are a career risk assessment AI. Analyze the candidate's profile and provide:
1. A risk score (0-100, higher means MORE RISK)
2. A brief, robotic explanation of the risk factors considering the current job market and technology trends.

Format your response EXACTLY as:
Score: [number]
Explanation: [1 robotic sentences about user role and industry. 2 robotic sentences about risk factors considering the current job market and technology trends]`;

    const userPrompt = `Career profile to analyze:\n${JSON.stringify(answers, null, 2)}`;

    debug('Sending request to OpenAI', {
      sessionId: currentSessionId,
      model: MODEL_NAME,
      systemPrompt,
      userPrompt
    });

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: MODEL_NAME,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_completion_tokens: 1500
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    debug('Received response from OpenAI', {
      sessionId: currentSessionId,
      status: response.status,
      data: response.data,
      content: response.data?.choices?.[0]?.message?.content
    });

    const content = response.data.choices[0].message.content;
    const match = content.match(/Score:\s*(\d+).*?Explanation:\s*(.*)/s);
    
    if (match) {
      const [_, scoreStr, explanation] = match;
      const score = parseInt(scoreStr, 10);
      
      if (isNaN(score) || score < 0 || score > 100) {
        logError('Invalid score value', { 
          sessionId: currentSessionId, 
          score, 
          content 
        });
        return res.status(500).json({
          error: 'Invalid score',
          details: 'The AI model returned an invalid score value'
        });
      }

      // Update session status
      const sessionData = activeSessions.get(currentSessionId);
      if (sessionData) {
        sessionData.status = 'completed';
        sessionData.lastActivity = Date.now();
        sessionData.result = { score, explanation: explanation.trim() };
      }

      debug('Successfully parsed response', {
        sessionId: currentSessionId,
        score,
        explanation: explanation.trim()
      });

      res.json({ 
        score,
        explanation: explanation.trim(),
        sessionId: currentSessionId
      });
    } else {
      logError('Failed to parse OpenAI response', { 
        sessionId: currentSessionId, 
        content 
      });
      
      // Update session status
      const sessionData = activeSessions.get(currentSessionId);
      if (sessionData) {
        sessionData.status = 'error';
        sessionData.lastActivity = Date.now();
        sessionData.error = 'Failed to parse AI response';
      }
      
      res.status(500).json({ 
        error: 'Failed to parse AI response',
        details: 'Could not extract score and explanation from the response',
        rawResponse: content,
        sessionId: currentSessionId
      });
    }
  } catch (error) {
    logError('Error during evaluation', { 
      sessionId: currentSessionId, 
      error 
    });
    
    // Update session status
    const sessionData = activeSessions.get(currentSessionId);
    if (sessionData) {
      sessionData.status = 'error';
      sessionData.lastActivity = Date.now();
      sessionData.error = error.message;
    }
    
    const errorMessage = error.response?.data?.error?.message || error.message;
    const errorDetails = error.response?.data?.error || error;
    
    res.status(500).json({ 
      error: 'Failed to evaluate answers',
      details: errorMessage,
      raw: errorDetails,
      sessionId: currentSessionId
    });
  }
});

// New endpoint to check session status (optional)
app.get('/session/:sessionId', (req, res) => {
  const sessionId = req.params.sessionId;
  const sessionData = activeSessions.get(sessionId);
  
  if (!sessionData) {
    return res.status(404).json({ 
      error: 'Session not found',
      sessionId 
    });
  }
  
  res.json({
    sessionId,
    status: sessionData.status,
    startTime: sessionData.startTime,
    lastActivity: sessionData.lastActivity,
    result: sessionData.result || null,
    error: sessionData.error || null
  });
});

// Global error handler
app.use((err, req, res, next) => {
  logError('Unhandled error', { 
    sessionId: req.sessionId, 
    error: err 
  });
  res.status(500).json({
    error: 'Internal server error',
    details: err.message,
    sessionId: req.sessionId
  });
});

app.listen(PORT, '0.0.0.0', () => {
  debug(`Server started`, {
    port: PORT,
    host: '0.0.0.0',
    nodeEnv: process.env.NODE_ENV,
    apiKeyStatus: process.env.OPENAI_API_KEY ? 'Configured' : 'Missing'
  });
}); 