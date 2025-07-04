import React from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Chip,
  Container,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { EvaluationResult } from '../App';

interface ResultsProps {
  result: EvaluationResult;
  onReset: () => void;
  onViewCourses: () => void;
}

const calculateRiskLevel = (score: number): string => {
  if (score >= 71) return 'HIGH';
  if (score >= 41) return 'MEDIUM';
  return 'LOW';
};

const getRiskColor = (score: number) => {
  if (score >= 71) return '#ff4444';
  if (score >= 41) return '#ffa726';
  return '#10B981';
};

const Results: React.FC<ResultsProps> = ({ result, onReset, onViewCourses }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const riskLevel = calculateRiskLevel(result.score);
  const color = getRiskColor(result.score);

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#000000',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3 }, position: 'relative', zIndex: 10 }}>
        <Box
          sx={{
            mt: { xs: 2, sm: 4 },
            mb: { xs: 2, sm: 4 },
            p: { xs: 2, sm: 4 },
            borderRadius: 3,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(20px)',
            border: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 40px rgba(0, 0, 0, 0.5)'
          }}
        >
          <Typography
            variant="h3"
            align="center"
            sx={{
              mb: { xs: 3, sm: 4 },
              color: '#FFFFFF',
              p: { xs: 2, sm: 3 },
              borderRadius: 2,
              fontWeight: 'bold',
              fontSize: { xs: '1.8rem', sm: '2.2rem' },
              textShadow: '0 2px 10px rgba(255, 255, 255, 0.3)'
            }}
          >
            Assessment Results
          </Typography>

          <Paper 
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              mb: { xs: 2, sm: 3 },
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: 2,
              border: 1,
              borderColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF', fontWeight: 'bold', textAlign: 'center' }}>
              Career Risk Score
            </Typography>
            <Divider sx={{ mb: 3, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
            
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              gap: { xs: 2, sm: 4 }, 
              mb: 3,
              flexDirection: { xs: 'column', sm: 'row' }
            }}>
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                  <CircularProgress
                    variant="determinate"
                    value={100}
                    size={isMobile ? 100 : 120}
                    thickness={4}
                    sx={{
                      position: 'absolute',
                      color: 'rgba(255, 255, 255, 0.2)',
                    }}
                  />
                  <CircularProgress
                    variant="determinate"
                    value={result.score}
                    size={isMobile ? 100 : 120}
                    thickness={4}
                    sx={{
                      color: result.score < 41 ? '#10B981' : typeof color === 'string' && !color.includes('gradient') ? color : '#8B5CF6',
                      borderRadius: '50%',
                      zIndex: 1,
                    }}
                  />
                  {result.score < 41 && (
                    <svg width="0" height="0">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#10B981" />
                          <stop offset="100%" stopColor="#10B981" />
                        </linearGradient>
                      </defs>
                    </svg>
                  )}
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant={isMobile ? "h5" : "h4"}
                      component="div"
                      sx={{ 
                        color: result.score < 41 ? '#10B981' : typeof color === 'string' && !color.includes('gradient') ? color : '#8B5CF6',
                        fontWeight: 'bold' 
                      }}
                    >
                      {result.score}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ mt: 1, color: 'rgba(255, 255, 255, 0.8)' }}>
                  Risk Score
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <Chip
                  label={`${riskLevel} RISK`}
                  sx={{
                    background: result.score < 41 ? '#10B981' : typeof color === 'string' && !color.includes('gradient') ? color : '#8B5CF6',
                    color: 'white',
                    fontSize: { xs: '1rem', sm: '1.2rem' },
                    px: { xs: 2, sm: 3 },
                    py: { xs: 1, sm: 1.5 },
                    height: 'auto',
                    fontWeight: 'bold',
                    '& .MuiChip-label': {
                      fontSize: { xs: '1rem', sm: '1.2rem' },
                    }
                  }}
                />
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', textAlign: 'center' }}>
                  Career Displacement Risk
                </Typography>
              </Box>
            </Box>

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              p: 2,
              borderRadius: 1,
              border: 1,
              borderColor: 'rgba(255, 255, 255, 0.15)'
            }}>
              <Box sx={{ textAlign: 'center', flex: 1 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  Low Risk
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: '#10B981',
                    fontWeight: 'bold'
                  }}
                >
                  0-40
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center', flex: 1 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  Medium Risk
                </Typography>
                <Typography variant="caption" sx={{ color: '#ffa726' }}>
                  41-70
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center', flex: 1 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  High Risk
                </Typography>
                <Typography variant="caption" sx={{ color: '#ff4444' }}>
                  71-100
                </Typography>
              </Box>
            </Box>
          </Paper>

          <Paper 
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              mb: { xs: 3, sm: 4 },
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: 2,
              border: 1,
              borderColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
              AI Analysis & Recommendations
            </Typography>
            <Divider sx={{ mb: 2, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
            <Typography
              variant="body1"
              sx={{
                whiteSpace: 'pre-line',
                lineHeight: 1.7,
                color: '#FFFFFF'
              }}
            >
              {result.explanation}
            </Typography>
          </Paper>

          <Button
            variant="contained"
            onClick={onViewCourses}
            size="large"
            fullWidth
            sx={{ 
              py: { xs: 1.5, sm: 2 }, 
              fontSize: { xs: 16, sm: 18 },
              borderRadius: 2,
              fontWeight: 'bold',
              textTransform: 'none',
              background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
              color: '#FFFFFF',
              border: '2px solid transparent',
              boxShadow: '0 4px 20px rgba(139, 92, 246, 0.4)',
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
                  content: '"Purchase Skill Sync"',
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
            Purchase Skill Sync
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Results;
