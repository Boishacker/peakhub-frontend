import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input, Checkbox, Divider, Typography, Select, Row, Col } from 'antd';
import { MailOutlined, GoogleOutlined, FacebookOutlined, AppleOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import type { RegisterData, UserRole } from '../../types/auth';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const Signup = () => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    name: '',
    role: 'student',
  });
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validate passwords match
    if (formData.password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const user = await register(formData);
      if (user) {
        // Successful registration
        navigate('/');
      } else {
        setError('Registration failed. Email may already be in use.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px' }}>
        <div style={{ 
          display: 'flex', 
          minHeight: '90vh', 
          backgroundColor: 'white', 
          borderRadius: '8px', 
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          overflow: 'hidden'
        }}>
          {/* Left side - Illustration */}
          <div style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
            <div style={{ maxWidth: '450px' }}>
              <img 
                src="/images/signup-illustration.svg" 
                alt="Learning illustration" 
                style={{ width: '100%', height: 'auto' }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/public/mockups/mock4.jpg";
                }}
              />
            </div>
          </div>

          {/* Right side - Signup form */}
          <div style={{ 
            flex: '1', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '40px 60px',
            borderLeft: '1px solid #E5E7EB'
          }}>
            <div style={{ width: '100%', maxWidth: '400px' }}>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <Title level={2} className="font-bold text-gray-800">
                  Sign up with email
                </Title>
              </div>

              {error && (
                <div style={{ marginBottom: '24px', padding: '12px 16px', backgroundColor: '#FEF2F2', border: '1px solid #F87171', color: '#B91C1C', borderRadius: '4px' }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <div style={{ marginBottom: '24px' }}>
                  <Input
                    size="large"
                    placeholder="Full name"
                    style={{ padding: '12px', borderRadius: '4px' }}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div style={{ marginBottom: '24px' }}>
                  <Input
                    size="large"
                    placeholder="Email"
                    style={{ padding: '12px', borderRadius: '4px' }}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div style={{ marginBottom: '24px' }}>
                  <Input.Password
                    size="large"
                    placeholder="Password"
                    style={{ padding: '12px', borderRadius: '4px' }}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div style={{ marginBottom: '24px' }}>
                  <Input.Password
                    size="large"
                    placeholder="Confirm password"
                    style={{ padding: '12px', borderRadius: '4px' }}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <Text style={{ display: 'block', marginBottom: '8px', color: '#4B5563' }}>I want to join as</Text>
                  <Select
                    size="large"
                    defaultValue="student"
                    style={{ width: '100%', height: '45px' }}
                    onChange={(value) => handleSelectChange(value, 'role')}
                    value={formData.role}
                  >
                    <Option value="student">Student</Option>
                    <Option value="instructor">Instructor</Option>
                  </Select>
                  <Text style={{ display: 'block', marginTop: '8px', fontSize: '12px', color: '#6B7280' }}>
                    {formData.role === 'student' 
                      ? 'As a student, you can enroll in courses and track your progress.'
                      : 'As an instructor, you can create and publish courses.'}
                  </Text>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <Checkbox className="text-gray-600">
                    Send me special offers, personalized recommendations, and learning tips.
                  </Checkbox>
                </div>

                <Button
                  type="primary"
                  size="large"
                  block
                  htmlType="submit"
                  loading={isLoading}
                  style={{ 
                    height: '48px', 
                    backgroundColor: '#8B5CF6', 
                    borderColor: '#8B5CF6',
                    borderRadius: '4px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MailOutlined style={{ marginRight: '8px' }} />
                    Continue with email
                  </div>
                </Button>

                <Divider style={{ margin: '24px 0' }}>
                  <span style={{ color: '#6B7280', fontSize: '14px' }}>Other sign up options</span>
                </Divider>

                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                  <Button 
                    size="large" 
                    icon={<GoogleOutlined />} 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderColor: '#D1D5DB', padding: '12px 0', transition: 'all 0.2s', background: '#fff' }}
                    className="mr-2 social-btn google-btn"
                  />
                  <Button 
                    size="large" 
                    icon={<FacebookOutlined />} 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderColor: '#D1D5DB', padding: '12px 0', transition: 'all 0.2s', background: '#fff' }}
                    className="mr-2 social-btn facebook-btn"
                  />
                  <Button 
                    size="large" 
                    icon={<AppleOutlined />} 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderColor: '#D1D5DB', padding: '12px 0', transition: 'all 0.2s', background: '#fff' }}
                    className="social-btn apple-btn"
                  />
                </div>
                <style>{`
                  .social-btn:hover.google-btn {
                    background: #f5f5f5 !important;
                    border-color: #ea4335 !important;
                    color: #ea4335 !important;
                  }
                  .social-btn:hover.facebook-btn {
                    background: #f0f6ff !important;
                    border-color: #1877f3 !important;
                    color: #1877f3 !important;
                  }
                  .social-btn:hover.apple-btn {
                    background: #222 !important;
                    border-color: #222 !important;
                    color: #fff !important;
                  }
                `}</style>

                <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '12px', color: '#6B7280' }}>
                  <Text>
                    By signing up, you agree to our <Link to="/terms" style={{ color: '#8B5CF6' }}>Terms of Use</Link> and <Link to="/privacy" style={{ color: '#8B5CF6' }}>Privacy Policy</Link>.
                  </Text>
                </div>

                <div style={{ textAlign: 'center', marginTop: '32px' }}>
                  <Text className="text-gray-600">
                    Already have an account? <Link to="/login" style={{ color: '#8B5CF6', fontWeight: 500 }}>Log in</Link>
                  </Text>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup; 