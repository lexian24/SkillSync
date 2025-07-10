import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Chip,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { ArrowBack, Schedule, Star, Lock, CheckCircle, Check, School } from '@mui/icons-material';

interface CoursesProps {
  onBackToResults: () => void;
  userSalary?: number; // Monthly salary from user input
}

const courses = [
  {
    id: 4,
    title: 'Public Speaking & Communication',
    description: 'Build confidence in public speaking and enhance your communication skills. Perfect for career advancement and leadership roles.',
    duration: '4 weeks',
    level: 'Beginner',
    rating: 4.6,
    category: '- 5 TORS',
    skills: ['Presentation', 'Communication', 'Confidence', 'Leadership'],
    color: '#F59E0B',
    unlocked: true
  },
  {
    id: 1,
    title: 'Artificial Intelligence Fundamentals',
    description: 'Master the basics of AI, machine learning, and neural networks. Learn how to build intelligent systems and understand the future of technology.',
    duration: '8 weeks',
    level: 'Beginner',
    rating: 4.8,
    category: '- 10 TORS',
    skills: ['Machine Learning', 'Python', 'Neural Networks', 'Data Science'],
    color: '#8B5CF6',
    unlocked: false
  },
  {
    id: 2,
    title: 'Data Analytics & Visualization',
    description: 'Transform raw data into actionable insights. Learn statistical analysis, data visualization, and business intelligence tools.',
    duration: '6 weeks',
    level: 'Intermediate',
    rating: 4.7,
    category: '- 5 TORS',
    skills: ['SQL', 'Tableau', 'Statistics', 'Excel'],
    color: '#3B82F6',
    unlocked: false
  },
  {
    id: 3,
    title: 'Project Management Professional',
    description: 'Develop essential project management skills. Learn agile methodologies, risk management, and team leadership strategies.',
    duration: '10 weeks',
    level: 'Intermediate',
    rating: 4.9,
    category: '- 5 TORS',
    skills: ['Agile', 'Scrum', 'Leadership', 'Risk Management'],
    color: '#10B981',
    unlocked: false
  }
];

const pricingTiers = [
  {
    name: 'Essential',
    payoutPercent: 20,
    maxPayout: 2500,
    duration: 3,
    color: '#F59E0B',
    features: [
      'Payout capped at 20% of monthly wage',
      'Maximum payout: $2,500',
      '3-month payout',
      '120-day deferment',
      'Pathway Subsidy up to 40%'
    ]
  },
  {
    name: 'Enhanced',
    payoutPercent: 40,
    maxPayout: 5000,
    duration: 3,
    color: '#3B82F6',
    features: [
      'Payout capped at 40% of monthly wage',
      'Maximum payout: $5,000',
      '3-month payout',
      '90-day deferment',
      'Pathway Subsidy up to 50%'
    ]
  },
  {
    name: 'Exclusive',
    payoutPercent: 60,
    maxPayout: 7500,
    duration: 5,
    color: '#10B981',
    features: [
      'Payout capped at 60% of monthly wage',
      'Maximum payout: $7,500',
      '5-month payout',
      '60-day deferment',
      'Pathway Subsidy up to 70%'
    ]
  }
];

const reskillingTiers = [
  { name: 'Aware', discount: 1, pathways: 1, color: '#F59E0B' },
  { name: 'Ready', discount: 3, pathways: 2, color: '#3B82F6' },
  { name: 'Adapter', discount: 6, pathways: 3, color: '#8B5CF6' },
  { name: 'Shaper', discount: 10, pathways: 4, color: '#10B981' }
];

// Pricing calculation function
const calculatePricing = (tier: typeof pricingTiers[0], monthlySalary: number, torsScore: number) => {
  const BPR = 0.40; // Base Premium Rate (fixed after actuarial modeling)
  const commercialLoadingFactor = 0.25; // 25%
  
  const totalCoverageValue = (monthlySalary * (tier.payoutPercent / 100) * tier.duration) / 1000;
  const basePremium = torsScore * totalCoverageValue * BPR;
  const finalPremium = basePremium * (1 + commercialLoadingFactor);
  
  return Math.round(finalPremium);
};

const Courses: React.FC<CoursesProps> = ({ onBackToResults, userSalary = 5000 }) => {
  const theme = useTheme();
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [isPurchased, setIsPurchased] = useState(false);

  const handlePurchase = (tierIndex: number) => {
    // Fake button - just visual feedback
    console.log(`Would select tier: ${tierIndex}`);
  };

  // Calculate pricing range based on user salary ±15%
  const torsScore = 75; // Default TORS score
  const salaryRange = {
    min: userSalary * 0.85,
    max: userSalary * 1.15
  };

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#000000',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 }, position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <Box sx={{ pt: { xs: 2, sm: 4 }, pb: { xs: 2, sm: 3 } }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={onBackToResults}
            sx={{
              color: '#FFFFFF',
              mb: 2,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Back to Results
          </Button>
          
          <Typography
            variant="h3"
            align="center"
            sx={{
              color: '#FFFFFF',
              fontWeight: 'bold',
              fontSize: { xs: '1.8rem', sm: '2.2rem' },
              textShadow: '0 2px 10px rgba(255, 255, 255, 0.3)',
              mb: 1
            }}
          >
            Skill Sync Insurance
          </Typography>
          
          <Typography
            variant="h6"
            align="center"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: { xs: '1rem', sm: '1.1rem' },
              mb: 4
            }}
          >
            Select what suits your needs the most
          </Typography>
        </Box>

        {/* Pricing Tiers */}
        {!isPurchased && (
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {pricingTiers.map((tier, index) => (
              <Grid item xs={12} md={4} key={tier.name}>
                <Card
                  sx={{
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(10px)',
                    border: 2,
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: `0 12px 40px ${tier.color}60`,
                      borderColor: tier.color,
                    }
                  }}
                >
                  
                  <CardContent sx={{ p: 4 }}>
                    <Typography
                      variant="h4"
                      sx={{
                        color: tier.color,
                        fontWeight: 'bold',
                        mb: 1,
                        fontSize: { xs: '1.5rem', sm: '2rem' }
                      }}
                    >
                      {tier.name}
                    </Typography>

                    {/* Pricing Range */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                        Annual Premium*
                      </Typography>
                                           <Typography
                       variant="h5"
                       sx={{
                         color: '#FFFFFF',
                         fontWeight: 'bold',
                         mb: 1
                       }}
                     >
                       ${calculatePricing(tier, salaryRange.min, torsScore)} - ${calculatePricing(tier, salaryRange.max, torsScore)}
                     </Typography>
                     <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                      
                     </Typography>
                    </Box>

                    {/* Payout Range */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                        Monthly Payout
                      </Typography>
                                             <Typography
                         variant="h6"
                         sx={{
                           color: tier.color,
                           fontWeight: 'bold',
                           mb: 1
                         }}
                       >
                         ${Math.min(salaryRange.min * (tier.payoutPercent / 100), tier.maxPayout)} - ${Math.min(salaryRange.max * (tier.payoutPercent / 100), tier.maxPayout)}
                       </Typography>
                                             <Typography 
                         variant="body1" 
                         sx={{ 
                           background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
                           backgroundClip: 'text',
                           WebkitBackgroundClip: 'text',
                           WebkitTextFillColor: 'transparent',
                           fontWeight: 'bold' 
                         }}
                       >
                         for {tier.duration} months
                       </Typography>
                    </Box>

                    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', mb: 3 }} />

                    {/* Features */}
                    <Box sx={{ mb: 4 }}>
                      <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 'bold', mb: 2 }}>
                        Key Benefits
                      </Typography>
                      {tier.features.map((feature, featureIndex) => (
                        <Box
                          key={featureIndex}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 1.5,
                            gap: 1
                          }}
                        >
                          <Check sx={{ color: tier.color, fontSize: 20 }} />
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'rgba(255, 255, 255, 0.8)',
                              lineHeight: 1.4
                            }}
                          >
                            {feature}
                          </Typography>
                        </Box>
                      ))}
                    </Box>

                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => handlePurchase(index)}
                      sx={{
                        py: 2,
                        fontSize: 16,
                        fontWeight: 'bold',
                        textTransform: 'none',
                        background: `linear-gradient(135deg, ${tier.color} 0%, ${tier.color}CC 100%)`,
                        color: '#FFFFFF',
                        borderRadius: 2,
                        boxShadow: `0 4px 20px ${tier.color}40`,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: `linear-gradient(135deg, ${tier.color}DD 0%, ${tier.color}AA 100%)`,
                          transform: 'translateY(-2px)',
                          boxShadow: `0 6px 30px ${tier.color}60`,
                        }
                      }}
                    >
                      Select {tier.name}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}



        {/* Purchase Success Message */}
        {isPurchased && selectedTier !== null && (
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 4 },
              mb: 4,
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              borderRadius: 3,
              border: 1,
              borderColor: 'rgba(16, 185, 129, 0.3)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <CheckCircle sx={{ color: '#10B981', fontSize: 64, mb: 2 }} />
              <Typography
                variant="h5"
                sx={{
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                  mb: 1
                }}
              >
                Welcome to {pricingTiers[selectedTier].name} Plan!
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  mb: 2
                }}
              >
                Your career protection is now active. Access all pathways below to earn discounts!
              </Typography>
            </Box>
          </Paper>
        )}



        {/* Courses Section */}
        <Typography
          variant="h4"
          align="center"
          sx={{
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontSize: { xs: '1.5rem', sm: '1.8rem' },
            mb: 4
          }}
        >
          {isPurchased ? 'Recommended Pathways' : 'Recommended Pathways'}
        </Typography>

        {/* Courses Grid */}
        <Grid container spacing={3} sx={{ pb: 4 }}>
          {courses.map((course) => (
            <Grid item xs={12} md={6} key={course.id}>
              <Card
                sx={{
                  height: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                  border: 1,
                  borderColor: course.unlocked || isPurchased ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 3,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s ease',
                  filter: course.unlocked || isPurchased ? 'none' : 'blur(2px)',
                  opacity: course.unlocked || isPurchased ? 1 : 0.6,
                  position: 'relative',
                  '&:hover': {
                    transform: course.unlocked || isPurchased ? 'translateY(-4px)' : 'none',
                    boxShadow: course.unlocked || isPurchased ? '0 12px 40px rgba(0, 0, 0, 0.4)' : '0 8px 32px rgba(0, 0, 0, 0.3)',
                    borderColor: course.unlocked || isPurchased ? course.color : 'rgba(255, 255, 255, 0.05)',
                  }
                }}
              >
                {/* Lock Overlay for locked courses */}
                {!course.unlocked && !isPurchased && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      zIndex: 10,
                      borderRadius: 3,
                    }}
                  >
                    <Box sx={{ textAlign: 'center' }}>
                      <Lock sx={{ color: '#FFFFFF', fontSize: 48, mb: 1 }} />
                      <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                        {course.category}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        Unlock with Premium Plan
                      </Typography>
                    </Box>
                  </Box>
                )}

                {/* Course Image Placeholder */}
                <CardMedia
                  component="img"
                  height="200"
                  image="/images/courses/course-placeholder.jpg"
                  alt={course.title}
                  sx={{
                    height: 200,
                    objectFit: 'cover',
                    background: `linear-gradient(135deg, ${course.color}20 0%, ${course.color}40 100%)`,
                    position: 'relative',
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.style.background = `linear-gradient(135deg, ${course.color}20 0%, ${course.color}40 100%)`;
                      parent.style.display = 'flex';
                      parent.style.alignItems = 'center';
                      parent.style.justifyContent = 'center';
                      parent.innerHTML = `
                        <div style="display: flex; flex-direction: column; align-items: center; color: ${course.color}; opacity: 0.8;">
                          <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                          </svg>
                          <span style="font-size: 0.7rem; margin-top: 8px; color: rgba(255,255,255,0.6);">
                            Pathway Preview
                          </span>
                        </div>
                      `;
                    }
                  }}
                />

                <CardContent sx={{ p: 3 }}>
                  {/* Course Header */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Chip 
                      label={course.category}
                      size="small"
                      sx={{
                        backgroundColor: course.color,
                        color: '#FFFFFF',
                        fontWeight: 'bold'
                      }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Star sx={{ color: '#FFD700', fontSize: 16 }} />
                      <Typography variant="body2" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                        {course.rating}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Course Title */}
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      mb: 2,
                      fontSize: { xs: '1.1rem', sm: '1.25rem' }
                    }}
                  >
                    {course.title}
                  </Typography>

                  {/* Course Description */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      mb: 3,
                      lineHeight: 1.6
                    }}
                  >
                    {course.description}
                  </Typography>

                  {/* Course Details */}
                  <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Schedule sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 16 }} />
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        {course.duration}
                      </Typography>
                    </Box>
                    <Chip 
                      label={course.level}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: '0.7rem'
                      }}
                    />
                  </Box>

                  {/* Skills */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', mb: 1, display: 'block' }}>
                      Skills you'll learn:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {course.skills.slice(0, 3).map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill}
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: '0.7rem',
                            height: 24
                          }}
                        />
                      ))}
                      {course.skills.length > 3 && (
                        <Chip
                          label={`+${course.skills.length - 3} more`}
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            color: 'rgba(255, 255, 255, 0.6)',
                            fontSize: '0.7rem',
                            height: 24
                          }}
                        />
                      )}
                    </Box>
                  </Box>

                  {/* Enroll Button */}
                  <Button
                    variant="contained"
                    fullWidth
                    disabled={!course.unlocked && !isPurchased}
                    sx={{
                      background: course.unlocked || isPurchased 
                        ? `linear-gradient(135deg, ${course.color} 0%, ${course.color}CC 100%)`
                        : 'rgba(255, 255, 255, 0.1)',
                      color: course.unlocked || isPurchased ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
                      fontWeight: 'bold',
                      textTransform: 'none',
                      borderRadius: 2,
                      py: 1.5,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: course.unlocked || isPurchased
                          ? `linear-gradient(135deg, ${course.color}DD 0%, ${course.color}AA 100%)`
                          : 'rgba(255, 255, 255, 0.1)',
                        transform: course.unlocked || isPurchased ? 'translateY(-1px)' : 'none',
                        boxShadow: course.unlocked || isPurchased ? `0 4px 20px ${course.color}40` : 'none'
                      },
                      '&.Mui-disabled': {
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: 'rgba(255, 255, 255, 0.3)'
                      }
                    }}
                  >
                    {course.unlocked || isPurchased ? 'Start Course' : 'Premium Required'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Reskilling Incentive Section */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 6,
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            borderRadius: 3,
            border: 1,
            borderColor: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              color: '#FFFFFF',
              fontWeight: 'bold',
              mb: 3,
              fontSize: { xs: '1.5rem', sm: '2rem' }
            }}
          >
            Reskilling Incentive
          </Typography>

          <Typography
            variant="h6"
            align="center"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              mb: 4
            }}
          >
            Complete reskilling pathways to unlock premium discounts
          </Typography>

          <Grid container spacing={3}>
            {reskillingTiers.map((tier, index) => (
              <Grid item xs={12} sm={6} md={3} key={tier.name}>
                <Card
                  sx={{
                    height: '100%',
                    backgroundColor: `${tier.color}20`,
                    backdropFilter: 'blur(10px)',
                    border: 1,
                    borderColor: `${tier.color}40`,
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: `0 8px 32px ${tier.color}40`,
                      borderColor: tier.color,
                    }
                  }}
                >
                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <School sx={{ color: tier.color, fontSize: 48, mb: 2 }} />
                    <Typography
                      variant="h6"
                      sx={{
                        color: tier.color,
                        fontWeight: 'bold',
                        mb: 1
                      }}
                    >
                      {tier.name}
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        color: '#FFFFFF',
                        fontWeight: 'bold',
                        mb: 1
                      }}
                    >
                      {tier.discount}% OFF
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        mb: 2
                      }}
                    >
                      Annual Premium Discount
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.6)'
                      }}
                    >
                      Complete {tier.pathways} reskilling pathway{tier.pathways > 1 ? 's' : ''}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Bottom Action */}
        <Box sx={{ textAlign: 'center', pb: 4 }}>
          <Button
            variant="outlined"
            onClick={onBackToResults}
            size="large"
            sx={{
              color: '#FFFFFF',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
              px: 4,
              py: 1.5,
              fontWeight: 'bold',
              textTransform: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                transform: 'translateY(-1px)',
              }
            }}
          >
            Back to Assessment Results
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Courses; 