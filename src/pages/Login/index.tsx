import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input, Checkbox, Divider, Typography, Row, Col } from 'antd';
import { MailOutlined, GoogleOutlined, FacebookOutlined, AppleOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import type { LoginCredentials } from '../../types/auth';

const { Title, Text } = Typography;

const Login = () => {
  const [credentials, setCredentials] = React.useState({
    email: '',
    password: '',
  });
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const user = await login(credentials);
      if (user) {
        // Successful login
        if (user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Quick login buttons for demo purposes
  const quickLoginAs = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const user = await login({ email, password });
      if (user) {
        navigate('/');
      } else {
        setError('Quick login failed. Please try manual login.');
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
                src="/images/login-illustration.svg" 
                alt="Learning illustration" 
                style={{ width: '100%', height: 'auto' }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/public/mockups/mock3.jpg";
                }}
              />
            </div>
          </div>

          {/* Right side - Login form */}
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
                  Log in to continue your learning journey
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
                    placeholder="Email"
                    style={{ padding: '12px', borderRadius: '4px' }}
                    name="email"
                    value={credentials.email}
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
                    value={credentials.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <Checkbox className="text-gray-600">Remember me</Checkbox>
                  <Link to="/forgot-password" style={{ color: '#8B5CF6', fontSize: '14px' }}>
                    Forgot password?
                  </Link>
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
                  <span style={{ color: '#6B7280', fontSize: '14px' }}>Other log in options</span>
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

                <div style={{ textAlign: 'center', marginTop: '32px' }}>
                  <Text className="text-gray-600">
                    Don't have an account? <Link to="/signup" style={{ color: '#8B5CF6', fontWeight: 500 }}>Sign up</Link>
                  </Text>
                </div>
              </form>

              {/* Demo Login Section */}
              <div style={{ marginTop: '48px', backgroundColor: '#F9FAFB', padding: '16px', borderRadius: '8px' }}>
                <Title level={5} style={{ marginBottom: '16px', textAlign: 'center', color: '#6B7280' }}>
                  Demo Quick Login
                </Title>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  <Button onClick={() => quickLoginAs('student@peakhub.com', 'password123')} style={{ padding: '8px 0' }}>
                    Login as Student
                  </Button>
                  <Button onClick={() => quickLoginAs('instructor@peakhub.com', 'password123')} style={{ padding: '8px 0' }}>
                    Login as Instructor
                  </Button>
                  <Button onClick={() => quickLoginAs('admin@peakhub.com', 'password123')} style={{ padding: '8px 0' }}>
                    Login as Admin
                  </Button>
                  <Button onClick={() => quickLoginAs('moderator@peakhub.com', 'password123')} style={{ padding: '8px 0' }}>
                    Login as Moderator
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 