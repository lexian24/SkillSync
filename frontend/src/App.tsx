import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  ThemeProvider,
  CssBaseline,
} from '@mui/material';
import CareerForm from './components/CareerForm';
import Results from './components/Results';
import LandingPage from './components/LandingPage';
import LoadingScreen from './components/LoadingScreen';
import Courses from './components/Courses';
import theme from './theme';

export interface EvaluationResult {
  score: number;
  explanation: string;
  rawResponse?: string;
}

// API configuration
const getApiUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'http://157.180.120.247:5002';
  }
  
  // In development, use the current host IP for the backend
  const currentHost = window.location.hostname;
  if (currentHost === 'localhost' || currentHost === '127.0.0.1') {
    return 'http://localhost:5002';
  } else {
    // For network access (like from mobile), use the same IP as frontend but port 5002
    return `http://${currentHost}:5002`;
  }
};

const API_URL = getApiUrl();

// Generate unique session ID for each user
const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'form' | 'loading' | 'results' | 'courses'>('landing');
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sessionId] = useState(() => generateSessionId());

  const handleStartAssessment = () => {
    setCurrentView('form');
    setError(null);
  };

  const handleSubmit = async (answers: Record<string, string>) => {
    console.log('🚀 FORM SUBMITTED - Starting evaluation process');
    console.log('📊 Form answers:', answers);
    console.log('🔗 API URL:', API_URL);
    console.log('🆔 Session ID:', sessionId);
    
    setCurrentView('loading');
    setError(null);
    
    // Start the minimum 5-second timer
    const minLoadingTime = 5000;
    const startTime = Date.now();
    
    try {
      debug('Sending request to:', API_URL);
      debug('Session ID:', sessionId);
      
      console.log('📡 Making fetch request to:', `${API_URL}/evaluate`);
      
      const response = await fetch(`${API_URL}/evaluate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-ID': sessionId, // Add session ID to headers for backend tracking
        },
        body: JSON.stringify({ 
          answers,
          sessionId // Include session ID in request body as well
        }),
        credentials: 'include',
      });
      
      console.log('📥 Response received:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        url: response.url,
        headers: Object.fromEntries(response.headers.entries())
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('❌ Response not OK:', { status: response.status, errorData });
        throw new Error(
          errorData?.error || 
          `Failed to evaluate answers (Status: ${response.status})`
        );
      }
      
      const data = await response.json();
      console.log('✅ Response data:', data);
      
      if (!data.score && data.score !== 0) {
        console.error('❌ Invalid response format - missing score:', data);
        throw new Error('Invalid response format: missing score');
      }

      // Add random score adjustment (+1 to +4)
      const originalScore = data.score;
      const randomAdjustment = Math.floor(Math.random() * 4) + 1; // Random number between 1-4
      const adjustedScore = Math.min(100, originalScore + randomAdjustment); // Cap at 100
      
      debug(`Original score: ${originalScore}, Adjustment: +${randomAdjustment}, Final score: ${adjustedScore}`);
      console.log('🎯 Score adjustment:', { originalScore, randomAdjustment, adjustedScore });
      
      const adjustedResult = {
        ...data,
        score: adjustedScore,
        originalScore // Keep track of original for debugging
      };

      // Ensure minimum loading time
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
      
      if (remainingTime > 0) {
        console.log('⏱️ Waiting for minimum loading time:', remainingTime, 'ms');
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }
      
      console.log('🎉 SUCCESS - Setting results and navigating to results view');
      setResult(adjustedResult);
      setCurrentView('results');
    } catch (err) {
      console.error('💥 ERROR occurred:', err);
      console.error('💥 Error details:', {
        message: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : undefined,
        name: err instanceof Error ? err.name : 'Unknown',
        apiUrl: API_URL
      });
      
      // Ensure minimum loading time even for errors
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
      
      if (remainingTime > 0) {
        console.log('⏱️ Waiting for minimum loading time (error case):', remainingTime, 'ms');
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }
      
      let errorMessage = 'An error occurred while processing your assessment.';
      
      if (err instanceof Error) {
        if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
          errorMessage = 'Network connection failed. Please check your internet connection and try again.';
        } else if (err.message.includes('Status: 5')) {
          errorMessage = 'Server error occurred. Please try again in a moment.';
        } else {
          errorMessage = err.message;
        }
      }
      
      console.log('🔄 Setting error and staying on results view with error message:', errorMessage);
      setError(errorMessage);
      setCurrentView('form'); // Go back to form on error
    }
  };

  const handleReset = () => {
    setResult(null);
    setCurrentView('landing');
    setError(null);
  };

  const handleViewCourses = () => {
    setCurrentView('courses');
  };

  const handleBackToResults = () => {
    setCurrentView('results');
  };

  // Debug logging
  const debug = (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Debug] ${message}`, ...args);
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onStartAssessment={handleStartAssessment} />;
      case 'form':
        return <CareerForm onSubmit={handleSubmit} />;
      case 'loading':
        return <LoadingScreen />;
      case 'results':
        return result ? (
          <Results result={result} onReset={handleReset} onViewCourses={handleViewCourses} />
        ) : (
          // If we're on results view but no result, show error and go back to form
          <CareerForm onSubmit={handleSubmit} />
        );
      case 'courses':
        return <Courses onBackToResults={handleBackToResults} />;
      default:
        return <LandingPage onStartAssessment={handleStartAssessment} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#000000',
          py: 0,
        }}
      >
        {renderCurrentView()}
        
        {error && currentView !== 'landing' && currentView !== 'loading' && (
          <Container maxWidth="md">
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                mt: 2, 
                backgroundColor: 'error.light',
                color: 'error.contrastText',
                textAlign: 'center',
              }}
            >
              <Typography>{error}</Typography>
            </Paper>
          </Container>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
