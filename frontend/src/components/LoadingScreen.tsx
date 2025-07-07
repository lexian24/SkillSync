import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import Hyperspeed from './Hyperspeed';

const LoadingScreen: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#000000',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Hyperspeed Background */}
      <Hyperspeed />
      
      {/* Loading Content */}
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 10 }}>
        <Box
          sx={{
            textAlign: 'center',
            p: { xs: 2, sm: 4 },
            borderRadius: 3,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(20px)',
            border: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 40px rgba(0, 0, 0, 0.5)'
          }}
        >
          <Typography
            variant="h3"
            sx={{
              mb: 2,
              color: '#FFFFFF',
              fontWeight: 'bold',
              fontSize: { xs: '1.8rem', sm: '2.2rem' },
              textShadow: '0 2px 10px rgba(255, 255, 255, 0.3)'
            }}
          >
            Analyzing Your Career
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: { xs: '1rem', sm: '1.2rem' },
              mb: 3
            }}
          >
            SKill Sync is processing your responses and generating insights...
          </Typography>

          {/* Animated Loading Dots */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
            {[0, 1, 2].map((index) => (
              <Box
                key={index}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
                  animation: 'pulse 1.5s ease-in-out infinite',
                  animationDelay: `${index * 0.3}s`,
                  '@keyframes pulse': {
                    '0%, 100%': {
                      opacity: 0.3,
                      transform: 'scale(1)'
                    },
                    '50%': {
                      opacity: 1,
                      transform: 'scale(1.2)'
                    }
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LoadingScreen; 