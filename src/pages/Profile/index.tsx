import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Typography, 
  Button, 
  Tabs, 
  Form, 
  Input, 
  Select, 
  Upload, 
  Divider, 
  Avatar,
  Row,
  Col,
  Card,
  Checkbox
} from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  LockOutlined, 
  GlobalOutlined, 
  CreditCardOutlined,
  NotificationOutlined,
  PictureOutlined,
  UploadOutlined
} from '@ant-design/icons';
import MainLayout from '../../components/layout/MainLayout';
import { useAuth } from '../../contexts/AuthContext';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

// Custom styles for UI elements
const customStyles = `
  /* Tab styling */
  .profile-tabs .ant-tabs-tab:hover .ant-tabs-tab-btn {
    color: #6f0fe0 !important;
    transform: translateY(-2px);
  }
  
  .profile-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #6f0fe0 !important;
    font-weight: 600 !important;
  }
  
  .profile-tabs .ant-tabs-ink-bar {
    background-color: #6f0fe0 !important;
    height: 3px !important;
    border-radius: 3px !important;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
  }
  
  .profile-tabs .ant-tabs-tab {
    transition: all 0.3s ease;
    padding: 12px 16px !important;
  }
  
  .profile-tabs .ant-tabs-content {
    transition: all 0.3s ease;
  }
  
  /* Button styling */
  .theme-button {
    transition: all 0.3s ease;
  }
  
  .theme-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(111, 15, 224, 0.2);
  }
  
  .theme-button:active {
    transform: translateY(0);
  }
  
  /* Remove focus outlines */
  button:focus, 
  .ant-btn:focus,
  .ant-btn-default:focus,
  .ant-btn-primary:focus,
  .ant-btn-link:focus,
  *:focus {
    outline: none !important;
    box-shadow: none !important;
  }
`;

const LANGUAGES = [
  { value: 'english', label: 'English' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'french', label: 'French' },
  { value: 'german', label: 'German' },
  { value: 'italian', label: 'Italian' },
  { value: 'portuguese', label: 'Portuguese' },
  { value: 'russian', label: 'Russian' },
  { value: 'japanese', label: 'Japanese' },
  { value: 'korean', label: 'Korean' },
  { value: 'chinese', label: 'Chinese' },
];

const ProfilePage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [avatarUrl, setAvatarUrl] = useState(
    user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=random&size=200`
  );

  const handleProfileSubmit = (values: any) => {
    console.log('Profile updated with:', values);
    // Here you would call an API to update the user profile
  };

  const handlePasswordSubmit = (values: any) => {
    console.log('Password updated with:', values);
    // Here you would call an API to update the password
  };

  return (
    <MainLayout>
      {/* Apply custom styles */}
      <style>{customStyles}</style>
      
      <div className="bg-gray-50 py-8">
        <div className="content-container">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Profile Header */}
            <div className="bg-primary-600 text-white p-8 relative" style={{ backgroundColor: '#6f0fe0' }}>
              <div className="flex items-start">
                <Avatar 
                  size={100} 
                  src={avatarUrl}
                  alt={user?.name}
                  icon={<UserOutlined />}
                  className="border-4 border-white"
                />
                <div className="ml-6">
                  <Title level={2} className="text-white m-0" style={{ color: 'white' }}>
                    {user?.name || 'Student Name'}
                  </Title>
                  <Text className="text-gray-200 block">{user?.email || 'student@example.com'}</Text>
                  <Text className="text-gray-200 block"><strong>Account Type:</strong> {user?.role || 'Student'}</Text>
                  <div className="mt-4">
                    <Link to="/my-learning">
                      <Button 
                        type="primary" 
                        className="mr-3 theme-button" 
                        style={{ backgroundColor: '#ffffff', borderColor: '#ffffff', color: '#6f0fe0' }}
                      >
                        My Learning
                      </Button>
                    </Link>
                    <Link to="/notifications">
                      <Button 
                        className="theme-button" 
                        style={{ borderColor: '#d3c2fb', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
                      >
                        Notifications
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Profile Content */}
            <div className="p-8">
              <Tabs 
                activeKey={activeTab} 
                onChange={setActiveTab} 
                className="profile-tabs"
                animated={{ inkBar: true, tabPane: true }}
              >
                <TabPane tab="Profile" key="profile">
                  <div className="max-w-3xl">
                    <Title level={4} className="mb-6">Personal Information</Title>
                    <Form
                      form={profileForm}
                      layout="vertical"
                      initialValues={{
                        name: user?.name || '',
                        email: user?.email || '',
                        bio: '',
                        language: 'english',
                        website: '',
                        twitter: '',
                        facebook: '',
                        linkedin: '',
                        youtube: '',
                      }}
                      onFinish={handleProfileSubmit}
                    >
                      <Row gutter={24}>
                        <Col span={12}>
                          <Form.Item
                            name="name"
                            label="Full Name"
                            rules={[{ required: true, message: 'Please enter your name' }]}
                          >
                            <Input prefix={<UserOutlined />} placeholder="Your full name" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                              { required: true, message: 'Please enter your email' },
                              { type: 'email', message: 'Please enter a valid email' }
                            ]}
                          >
                            <Input 
                              prefix={<MailOutlined />} 
                              placeholder="Your email" 
                              disabled 
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item name="bio" label="Biography">
                        <Input.TextArea 
                          rows={4} 
                          placeholder="Tell us about yourself..." 
                        />
                      </Form.Item>

                      <Form.Item name="language" label="Language">
                        <Select>
                          {LANGUAGES.map(lang => (
                            <Option key={lang.value} value={lang.value}>{lang.label}</Option>
                          ))}
                        </Select>
                      </Form.Item>

                      <Form.Item name="website" label="Website">
                        <Input 
                          prefix={<GlobalOutlined />} 
                          placeholder="https://yourwebsite.com" 
                        />
                      </Form.Item>

                      <Divider orientation="left">Social Profiles</Divider>

                      <Row gutter={24}>
                        <Col span={12}>
                          <Form.Item name="twitter" label="Twitter">
                            <Input placeholder="Your Twitter username" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item name="facebook" label="Facebook">
                            <Input placeholder="Your Facebook profile URL" />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={24}>
                        <Col span={12}>
                          <Form.Item name="linkedin" label="LinkedIn">
                            <Input placeholder="Your LinkedIn profile URL" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item name="youtube" label="YouTube">
                            <Input placeholder="Your YouTube channel URL" />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item>
                        <Button 
                          type="primary" 
                          htmlType="submit" 
                          className="theme-button"
                          style={{ backgroundColor: '#6f0fe0', borderColor: '#6f0fe0' }}
                        >
                          Save Changes
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </TabPane>
                
                <TabPane tab="Photo" key="photo">
                  <div className="max-w-3xl">
                    <Title level={4} className="mb-6">Profile Photo</Title>
                    <div className="flex items-start">
                      <Avatar 
                        size={150} 
                        src={avatarUrl}
                        alt={user?.name}
                        icon={<UserOutlined />}
                      />
                      <div className="ml-6">
                        <Upload 
                          name="avatar"
                          listType="picture"
                          className="avatar-uploader"
                          showUploadList={false}
                          beforeUpload={(file) => {
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = () => {
                              setAvatarUrl(reader.result as string);
                            };
                            return false;
                          }}
                        >
                          <Button 
                            icon={<UploadOutlined />} 
                            className="theme-button"
                            style={{ borderColor: '#d3c2fb', color: '#6f0fe0' }}
                          >
                            Change Photo
                          </Button>
                        </Upload>
                        <Text className="block mt-2 text-gray-500">
                          Recommended: Square JPG, PNG. Max size 1MB.
                        </Text>
                      </div>
                    </div>
                  </div>
                </TabPane>
                
                <TabPane tab="Account Security" key="security">
                  <div className="max-w-3xl">
                    <Title level={4} className="mb-6">Change Password</Title>
                    <Form
                      form={passwordForm}
                      layout="vertical"
                      onFinish={handlePasswordSubmit}
                    >
                      <Form.Item
                        name="currentPassword"
                        label="Current Password"
                        rules={[{ required: true, message: 'Please enter your current password' }]}
                      >
                        <Input.Password 
                          prefix={<LockOutlined />} 
                          placeholder="Enter your current password" 
                        />
                      </Form.Item>

                      <Form.Item
                        name="newPassword"
                        label="New Password"
                        rules={[
                          { required: true, message: 'Please enter your new password' },
                          { min: 8, message: 'Password must be at least 8 characters' }
                        ]}
                      >
                        <Input.Password 
                          prefix={<LockOutlined />} 
                          placeholder="Enter your new password" 
                        />
                      </Form.Item>

                      <Form.Item
                        name="confirmPassword"
                        label="Confirm New Password"
                        dependencies={['newPassword']}
                        rules={[
                          { required: true, message: 'Please confirm your new password' },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue('newPassword') === value) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error('The two passwords do not match'));
                            },
                          }),
                        ]}
                      >
                        <Input.Password 
                          prefix={<LockOutlined />} 
                          placeholder="Confirm your new password" 
                        />
                      </Form.Item>

                      <Form.Item>
                        <Button 
                          type="primary" 
                          htmlType="submit" 
                          className="theme-button"
                          style={{ backgroundColor: '#6f0fe0', borderColor: '#6f0fe0' }}
                        >
                          Change Password
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </TabPane>
                
                <TabPane tab="Notifications" key="notifications">
                  <div className="max-w-3xl">
                    <Title level={4} className="mb-6">Notification Preferences</Title>
                    <Card>
                      <Form layout="vertical">
                        <div className="mb-4">
                          <Title level={5}>Course Updates</Title>
                          <Form.Item name="courseUpdates">
                            <Checkbox.Group>
                              <div className="flex flex-col space-y-2">
                                <Checkbox value="announcements">Announcements from instructors</Checkbox>
                                <Checkbox value="newCourses">New courses available</Checkbox>
                                <Checkbox value="promotions">Promotional offers</Checkbox>
                              </div>
                            </Checkbox.Group>
                          </Form.Item>
                        </div>
                        
                        <div className="mb-4">
                          <Title level={5}>Account Activity</Title>
                          <Form.Item name="accountActivity">
                            <Checkbox.Group>
                              <div className="flex flex-col space-y-2">
                                <Checkbox value="purchases">Purchase confirmations</Checkbox>
                                <Checkbox value="security">Security alerts</Checkbox>
                                <Checkbox value="reminders">Course reminders</Checkbox>
                              </div>
                            </Checkbox.Group>
                          </Form.Item>
                        </div>
                        
                        <Form.Item>
                          <Button 
                            type="primary" 
                            className="theme-button"
                            style={{ backgroundColor: '#6f0fe0', borderColor: '#6f0fe0' }}
                          >
                            Save Preferences
                          </Button>
                        </Form.Item>
                      </Form>
                    </Card>
                  </div>
                </TabPane>
                
                <TabPane tab="Payment Methods" key="payment">
                  <div className="max-w-3xl">
                    <Title level={4} className="mb-6">Payment Methods</Title>
                    <Card className="mb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <CreditCardOutlined className="text-2xl mr-3 text-primary-500" style={{ color: '#7811f7' }} />
                            <div>
                              <Text strong>Visa ending in 4242</Text>
                              <Text className="block text-gray-500">Expires 04/2026</Text>
                            </div>
                          </div>
                        </div>
                        <Button 
                          type="link" 
                          danger 
                          className="theme-button"
                        >
                          Remove
                        </Button>
                      </div>
                    </Card>
                    
                    <Button 
                      type="primary" 
                      className="theme-button"
                      style={{ backgroundColor: '#6f0fe0', borderColor: '#6f0fe0' }}
                    >
                      Add Payment Method
                    </Button>
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage; 