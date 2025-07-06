import React from 'react';
import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import Threads from './Threads';
import RotatingText from './RotatingText';

interface LandingPageProps {
  onStartAssessment: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartAssessment }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
        overflow: 'hidden',
        px: { xs: 2, sm: 4 },
        py: { xs: 4, sm: 6 }
      }}
    >
      {/* Animated Background */}
      <Threads
        color={[0.2, 0.2, 0.2]}
        amplitude={1.5}
        distance={0.3}
        enableMouseInteraction={!isMobile}
      />

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '800px',
          width: '100%'
        }}
      >
        {/* Main Title */}
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Typography
            variant="h1"
            sx={{
              fontFamily: '"Fira Sans", sans-serif',
              fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
              fontWeight: 700,
              color: '#ffffff',
              mb: { xs: 2, sm: 3 },
              textShadow: '0 2px 10px rgba(255,255,255,0.1)',
              letterSpacing: '-0.02em'
            }}
          >
            Skill Sync
          </Typography>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Fira Sans", sans-serif',
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              fontWeight: 400,
              color: '#cccccc',
              mb: { xs: 1, sm: 2 }
            }}
          >
            For Your
          </Typography>
        </motion.div>

        {/* Rotating Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          style={{ marginBottom: isMobile ? '3rem' : '4rem' }}
        >
          <RotatingText
            texts={["Self", "Family", "Future"]}
            rotationInterval={3000}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            style={{
              fontFamily: '"Fira Sans", sans-serif',
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 600,
              color: '#ffffff',
              display: 'block',
              textShadow: '0 2px 15px rgba(255,255,255,0.2)'
            }}
          />
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
        >
          <Button
            onClick={onStartAssessment}
            variant="contained"
            size="large"
            sx={{
              fontFamily: '"Fira Sans", sans-serif',
              fontSize: { xs: '1.1rem', sm: '1.3rem' },
              fontWeight: 600,
              background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
              color: '#ffffff',
              px: { xs: 4, sm: 6 },
              py: { xs: 1.5, sm: 2 },
              borderRadius: '50px',
              textTransform: 'none',
              boxShadow: '0 4px 20px rgba(139, 92, 246, 0.4)',
              border: '2px solid transparent',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'transparent',
                color: 'transparent',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                backgroundImage: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
                borderImage: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%) 1',
                boxShadow: '0 6px 30px rgba(139, 92, 246, 0.6)',
                transform: 'translateY(-2px)',
                '&::before': {
                  content: '"START NOW →"',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }
              },
              '&:active': {
                transform: 'translateY(0)'
              }
            }}
          >
            START NOW →
          </Button>
        </motion.div>

        {/* Subtitle Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
        >
          <Typography
            variant="body1"
            sx={{
              fontFamily: '"Fira Sans", sans-serif',
              fontSize: { xs: '0.9rem', sm: '1rem' },
              fontWeight: 300,
              color: '#888888',
              mt: { xs: 3, sm: 4 },
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            Discover your career potential with Skill Sync assessment. 
            Get personalized insights and recommendations for your professional journey.
          </Typography>
        </motion.div>
      </Box>
    </Box>
  );
};

export default LandingPage; 