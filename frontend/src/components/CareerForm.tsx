import React, { useState, ChangeEvent } from 'react';
import {
  Button,
  TextField,
  Box,
  Typography,
  FormControl,
  FormLabel,
  Rating,
  Grid as MuiGrid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Paper,
  Container,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';

const Grid = (props: any) => <MuiGrid {...props} />;

interface CareerFormProps {
  onSubmit: (answers: Record<string, string>) => void;
}

const CareerForm: React.FC<CareerFormProps> = ({ onSubmit }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [answers, setAnswers] = useState({
    age: '', gender: '', maritalStatus: '', citizenship: '',
    education: '', certifications: '',
    currentRole: '', company: '', industry: '', salaryRange: '', location: '', experience: '',
    technicalSkills: '3', communicationSkills: '3', problemSolving: '3', leadership: '3',
    teamwork: '3', workLifeBalance: '3', stressManagement: '3', careerGrowth: '3',
    roleSkills: '', personalSkills: '', interests: '', strengths: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    const { name, value } = e.target;
    setAnswers(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(answers);
  };

  const renderRating = (name: string, label: string) => (
    <Box sx={{ 
      mt: { xs: 1, sm: 2 },
      p: 2,
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      borderRadius: 2,
      border: 1,
      borderColor: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
    }}>
      <FormLabel sx={{ 
        display: 'block',
        mb: 1,
        fontWeight: 'medium',
        color: '#FFFFFF',
        fontSize: '0.95rem'
      }}>
        {label}
      </FormLabel>
      <Rating
        name={name}
        value={Number(answers[name as keyof typeof answers])}
        onChange={(_, value) => {
          if (value !== null) {
            setAnswers(prev => ({ ...prev, [name]: value.toString() }));
          }
        }}
        size={isMobile ? "large" : "medium"}
        sx={{ 
          mt: 0.5,
          '& .MuiRating-icon': {
            color: '#FFFFFF'
          },
          '& .MuiRating-iconFilled': {
            background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          },
          '& .MuiRating-iconHover': {
            color: '#FFFFFF'
          }
        }}
      />
    </Box>
  );

  const renderSection = (title: string, children: React.ReactNode) => (
    <Paper 
      elevation={0} 
      sx={{ 
        p: { xs: 2, sm: 3 }, 
        mb: { xs: 2, sm: 3 }, 
        borderRadius: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        border: 1,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
      }}
    >
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{
          color: '#FFFFFF',
          fontWeight: 'bold',
          mb: 1,
          fontSize: '1.1rem'
        }}
      >
        {title}
      </Typography>
      <Divider sx={{ mb: 2, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
      {children}
    </Paper>
  );

  const renderSelect = (name: string, label: string, options: string[]) => (
    <FormControl fullWidth required>
      <FormLabel sx={{ mb: 1, fontWeight: 'medium', color: '#FFFFFF' }}>{label}</FormLabel>
      <Select
        name={name}
        value={answers[name as keyof typeof answers]}
        onChange={handleChange}
        variant="outlined"
        displayEmpty
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: '#FFFFFF',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.3)'
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.5)'
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderImage: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%) 1'
          },
          '& .MuiSelect-icon': {
            color: '#FFFFFF'
          }
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(10px)',
              border: 1,
              borderColor: 'rgba(255, 255, 255, 0.2)',
              '& .MuiMenuItem-root': {
                color: '#FFFFFF',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                },
                '&.Mui-selected': {
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)'
                }
              }
            }
          }
        }}
      >
        <MenuItem value="" disabled sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
          Select {label}
        </MenuItem>
        {options.map(option => (
          <MenuItem key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1).replace('_', ' ')}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const renderTextField = (name: string, label: string) => (
    <TextField
      fullWidth
      label={label}
      name={name}
      value={answers[name as keyof typeof answers]}
      onChange={handleChange}
      required
      variant="outlined"
      sx={{
        '& .MuiInputLabel-root': {
          color: '#FFFFFF'
        },
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: '#FFFFFF',
          '& fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.3)'
          },
          '&:hover fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.5)'
          },
          '&.Mui-focused fieldset': {
            borderImage: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%) 1'
          }
        }
      }}
    />
  );

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
          component="form"
          onSubmit={handleSubmit}
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
            Career Assessment
          </Typography>

          {renderSection("Personal Information", (
            <Grid container spacing={2}>
              {[
                { name: 'age', label: 'Age', options: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'] },
                { name: 'gender', label: 'Gender', options: ['male', 'female', 'other'] },
                { name: 'maritalStatus', label: 'Marital Status', options: ['single', 'married', 'divorced', 'widowed'] },
                { name: 'citizenship', label: 'Citizenship', options: ['citizen', 'permanent_resident', 'work_permit', 'student_visa'] }
              ].map((field) => (
                <Grid item xs={12} sm={6} key={field.name}>
                  <FormControl fullWidth required>
                    <FormLabel sx={{ mb: 1, fontWeight: 'medium', color: '#FFFFFF' }}>{field.label}</FormLabel>
                    <Select
                      name={field.name}
                      value={answers[field.name as keyof typeof answers]}
                      onChange={handleChange}
                      variant="outlined"
                      displayEmpty
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: '#FFFFFF',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255, 255, 255, 0.3)'
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255, 255, 255, 0.5)'
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderImage: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%) 1'
                        },
                        '& .MuiSelect-icon': {
                          color: '#FFFFFF'
                        }
                      }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            backgroundColor: 'rgba(0, 0, 0, 0.9)',
                            backdropFilter: 'blur(10px)',
                            border: 1,
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            '& .MuiMenuItem-root': {
                              color: '#FFFFFF',
                              '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)'
                              },
                              '&.Mui-selected': {
                                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)'
                              }
                            }
                          }
                        }
                      }}
                    >
                      <MenuItem value="" disabled sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                        Select {field.label}
                      </MenuItem>
                      {field.options.map(option => (
                        <MenuItem key={option} value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1).replace('_', ' ')}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              ))}
            </Grid>
          ))}

          {renderSection("Education & Certifications", (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <FormLabel sx={{ mb: 1, fontWeight: 'medium', color: '#FFFFFF' }}>Highest Education Level</FormLabel>
                  <Select
                    name="education"
                    value={answers.education}
                    onChange={handleChange}
                    variant="outlined"
                    displayEmpty
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: '#FFFFFF',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.3)'
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.5)'
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderImage: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%) 1'
                      },
                      '& .MuiSelect-icon': {
                        color: '#FFFFFF'
                      }
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          backgroundColor: 'rgba(0, 0, 0, 0.9)',
                          backdropFilter: 'blur(10px)',
                          border: 1,
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                          '& .MuiMenuItem-root': {
                            color: '#FFFFFF',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.1)'
                            },
                            '&.Mui-selected': {
                              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)'
                            }
                          }
                        }
                      }
                    }}
                  >
                    <MenuItem value="" disabled sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                      Select Education Level
                    </MenuItem>
                    {['High School', 'Associate Degree', "Bachelor's Degree", "Master's Degree", 'Doctorate'].map((level) => (
                      <MenuItem key={level} value={level.toLowerCase().replace("'s", '').replace(' ', '')}>
                        {level}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Certifications"
                  name="certifications"
                  value={answers.certifications}
                  onChange={handleChange}
                  variant="outlined"
                  placeholder="Separate multiple certifications with commas"
                  helperText="e.g., PMP, AWS Certified, Google Analytics"
                  sx={{
                    '& .MuiInputLabel-root': {
                      color: '#FFFFFF'
                    },
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: '#FFFFFF',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)'
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.5)'
                      },
                      '&.Mui-focused fieldset': {
                        borderImage: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%) 1'
                      }
                    },
                    '& .MuiFormHelperText-root': {
                      color: 'rgba(255, 255, 255, 0.7)'
                    }
                  }}
                />
              </Grid>
            </Grid>
          ))}

          {renderSection("Professional Information", (
            <Grid container spacing={2}>
              {[
                { name: 'currentRole', label: 'Current Role', type: 'text', placeholder: 'e.g., Software Engineer' },
                { name: 'company', label: 'Company/Organization', type: 'text', placeholder: 'e.g., Google Inc.' },
                { name: 'industry', label: 'Industry', type: 'text', placeholder: 'e.g., Technology' },
                { name: 'salaryRange', label: 'Annual Salary', type: 'text', placeholder: 'e.g., 75,000' },
                { name: 'location', label: 'Work Location', type: 'text', placeholder: 'e.g., San Francisco, CA' },
                { name: 'experience', label: 'Years of Experience', type: 'number', placeholder: 'e.g., 5' }
              ].map((field) => (
                <Grid item xs={12} sm={6} key={field.name}>
                  <TextField
                    fullWidth
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    value={answers[field.name as keyof typeof answers]}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    placeholder={field.placeholder}
                    sx={{
                      '& .MuiInputLabel-root': {
                        color: '#FFFFFF'
                      },
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: '#FFFFFF',
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)'
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)'
                        },
                        '&.Mui-focused fieldset': {
                          borderImage: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%) 1'
                        }
                      }
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          ))}

          {renderSection("Skill Sets", (
            <Grid container spacing={2}>
              {[
                { name: 'roleSkills', label: 'Role Skills', placeholder: 'e.g., JavaScript, Excel, Data Analysis' },
                { name: 'personalSkills', label: 'Personal Skills', placeholder: 'e.g., Mentoring, Music, Consulting' }
              ].map((field) => (
                <Grid item xs={12} key={field.name}>
                  <TextField
                    fullWidth
                    label={field.label}
                    name={field.name}
                    value={answers[field.name as keyof typeof answers]}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    placeholder={field.placeholder}
                    helperText="Separate multiple skills with commas"
                    sx={{
                      '& .MuiInputLabel-root': {
                        color: '#FFFFFF'
                      },
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: '#FFFFFF',
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)'
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)'
                        },
                        '&.Mui-focused fieldset': {
                          borderImage: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%) 1'
                        }
                      },
                      '& .MuiFormHelperText-root': {
                        color: 'rgba(255, 255, 255, 0.7)'
                      }
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          ))}

          {renderSection("Skills Assessment", (
            <>
              <Typography variant="body2" sx={{ mb: 3, color: 'rgba(255, 255, 255, 0.8)' }}>
                Rate yourself on a scale of 1-5 stars (1 = Beginner, 5 = Expert)
              </Typography>
              <Grid container spacing={2}>
                {[
                  ['technicalSkills', 'Technical Skills'],
                  ['communicationSkills', 'Communication Skills'],
                  ['problemSolving', 'Problem Solving'],
                  ['leadership', 'Leadership'],
                  ['teamwork', 'Teamwork'],
                  ['workLifeBalance', 'Work-Life Balance'],
                  ['stressManagement', 'Stress Management'],
                  ['careerGrowth', 'Career Growth Potential']
                ].map(([key, label]) => (
                  <Grid item xs={12} sm={6} key={key}>
                    {renderRating(key, label)}
                  </Grid>
                ))}
              </Grid>
            </>
          ))}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{
              mt: { xs: 3, sm: 4 },
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
                  content: '"Submit Assessment"',
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
            Submit Assessment
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CareerForm;
