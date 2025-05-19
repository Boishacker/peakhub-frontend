import React, { useState, useEffect, ReactNode } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Typography, 
  Breadcrumb, 
  Row, 
  Col, 
  Card, 
  Tabs, 
  Tag, 
  Rate, 
  Button, 
  List,
  Divider,
  Avatar,
  Progress,
  Collapse,
  Tooltip,
  Space,
  Image,
  Modal
} from 'antd';
import { 
  PlayCircleOutlined, 
  CheckOutlined, 
  ClockCircleOutlined, 
  FieldTimeOutlined,
  FileTextOutlined, 
  DownloadOutlined,
  GlobalOutlined,
  TranslationOutlined,
  LaptopOutlined,
  MobileOutlined,
  LikeOutlined,
  DislikeOutlined,
  StarOutlined,
  StarFilled,
  HeartOutlined,
  ShareAltOutlined,
  TrophyOutlined,
  TeamOutlined,
  CheckCircleFilled,
  InfoCircleOutlined,
  GiftOutlined
} from '@ant-design/icons';

import MainLayout from '../../components/layout/MainLayout';
import CourseContentAccordion from '../../components/CourseContent/CourseContentAccordion';
import { aiCategories } from '../../data/courses';

// Custom styles for theme-colored links
const themeLink = {
  color: '#9d78f2', 
  textDecoration: 'none',
  transition: 'color 0.3s'
};

const themeLinkHover = {
  color: '#b89df7'
};

// Custom CSS for tabs
const tabStyle = `
  .course-detail-tabs .ant-tabs-tab {
    transition: all 0.3s ease;
    padding: 12px 16px !important;
    position: relative;
    border-radius: 4px 4px 0 0;
    margin-right: 4px;
  }

  .course-detail-tabs .ant-tabs-tab:hover {
    background-color: rgba(111, 15, 224, 0.05);
  }
  
  .course-detail-tabs .ant-tabs-tab:hover .ant-tabs-tab-btn {
    color: #6f0fe0 !important;
    transform: translateY(-2px);
  }
  
  .course-detail-tabs .ant-tabs-tab-active {
    background-color: rgba(111, 15, 224, 0.08);
  }
  
  .course-detail-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #6f0fe0 !important;
    font-weight: 600 !important;
  }
  
  .course-detail-tabs .ant-tabs-ink-bar {
    background-color: #6f0fe0 !important;
    height: 3px !important;
    border-radius: 3px !important;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
  }

  .course-detail-tabs .ant-tabs-content {
    transition: all 0.3s ease;
  }

  .course-detail-tabs .ant-tabs-tabpane {
    transition: opacity 0.3s ease;
  }
  
  /* Remove black outline on button focus/click */
  button:focus, 
  .ant-btn:focus,
  .ant-btn-default:focus,
  .ant-btn-primary:focus,
  .ant-btn-link:focus,
  *:focus {
    outline: none !important;
    box-shadow: none !important;
  }
  
  /* Additional styles specifically for Ant Design buttons */
  .ant-btn {
    outline: none !important;
  }
  
  .ant-btn:focus, 
  .ant-btn:active,
  .ant-btn-default:focus,
  .ant-btn-default:active,
  .ant-btn-primary:focus,
  .ant-btn-primary:active,
  .ant-btn-link:focus,
  .ant-btn-link:active {
    outline: none !important;
    box-shadow: none !important;
    border-color: inherit !important;
  }
  
  /* For course content accordion buttons */
  .course-content-accordion .ant-collapse-item {
    border-radius: 0 !important;
  }
  
  .course-content-accordion .ant-collapse-header:focus,
  .course-content-accordion .ant-collapse-header:active {
    outline: none !important;
  }
  
  .course-content-accordion button:focus,
  .course-content-accordion button:active {
    outline: none !important;
    box-shadow: none !important;
  }
`;

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;

// Define a comprehensive interface for Course objects
interface CourseType {
  id: string;
  title: string;
  instructor?: string | { name: string; id: string };
  rating: number;
  students?: number;
  image: string;
  price?: number;
  level?: string;
  description?: string;
  ratingCount?: number;
  discountPrice?: number;
  longDescription?: string;
  duration?: string;
  isBestseller?: boolean;
  tag?: string;
}

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);
  const navigate = useNavigate();

  // Find the course from the data
  useEffect(() => {
    // Import the category tabs data from src/pages/Home/index.tsx if you need to use it directly
    // For simplicity, we'll just define the data we need here
    const categoryTabs = [
      {
        key: 'image',
        title: 'AI for Images',
        courses: [
          { id: 'img1', title: 'Computer Vision Fundamentals', instructor: 'Dr. Sarah Chen', rating: 4.8, students: 8400, image: '/public/mockups/mock6.jpg', price: 89.99 },
          { id: 'img2', title: 'Image Generation with GANs', instructor: 'Michael Wong', rating: 4.7, students: 6200, image: '/public/mockups/mock7.jpg', price: 94.99 },
          { id: 'img3', title: 'Stable Diffusion Masterclass', instructor: 'Emma Davis', rating: 4.9, students: 5100, image: '/public/mockups/mock8.jpg', price: 79.99 },
          { id: 'img4', title: 'Object Detection for Beginners', instructor: 'James Wilson', rating: 4.6, students: 4300, image: '/public/mockups/mock9.jpg', price: 69.99 },
        ]
      },
      {
        key: 'text',
        title: 'AI for Text',
        courses: [
          { id: 'txt1', title: 'Natural Language Processing', instructor: 'Dr. Alex Johnson', rating: 4.9, students: 12600, image: '/public/mockups/mock1.jpg', price: 99.99 },
          { id: 'txt2', title: 'Building ChatGPT Applications', instructor: 'Lisa Park', rating: 4.8, students: 9800, image: '/public/mockups/mock2.jpg', price: 89.99 },
          { id: 'txt3', title: 'Text Classification with Transformers', instructor: 'Robert Zhang', rating: 4.7, students: 5600, image: '/public/mockups/mock3.jpg', price: 74.99 },
          { id: 'txt4', title: 'Advanced Text Generation', instructor: 'Sophia Rodriguez', rating: 4.6, students: 4100, image: '/public/mockups/mock4.jpg', price: 79.99 },
        ]
      },
      {
        key: 'audio',
        title: 'AI for Audio',
        courses: [
          { id: 'aud1', title: 'Speech Recognition Systems', instructor: 'Dr. Thomas Lee', rating: 4.8, students: 7200, image: '/public/mockups/mock5.jpg', price: 89.99 },
          { id: 'aud2', title: 'Music Generation with AI', instructor: 'Maria Garcia', rating: 4.7, students: 5100, image: '/public/mockups/mock6.jpg', price: 79.99 },
          { id: 'aud3', title: 'Audio Processing Fundamentals', instructor: 'John Smith', rating: 4.6, students: 4800, image: '/public/mockups/mock7.jpg', price: 69.99 },
          { id: 'aud4', title: 'Voice Cloning Techniques', instructor: 'Kevin Brown', rating: 4.8, students: 3900, image: '/public/mockups/mock8.jpg', price: 84.99 },
        ]
      },
      {
        key: 'code',
        title: 'AI for Code',
        courses: [
          { id: 'code1', title: 'AI-Assisted Coding', instructor: 'Daniel Kim', rating: 4.9, students: 8700, image: '/public/mockups/mock9.jpg', price: 94.99 },
          { id: 'code2', title: 'Building Code Copilots', instructor: 'Jennifer Liu', rating: 4.8, students: 6100, image: '/public/mockups/mock10.jpg', price: 89.99 },
          { id: 'code3', title: 'Automated Code Review with AI', instructor: 'Paul Martinez', rating: 4.7, students: 4500, image: '/public/mockups/mock1.jpg', price: 79.99 },
          { id: 'code4', title: 'Code Generation Techniques', instructor: 'Olivia Wilson', rating: 4.6, students: 3800, image: '/public/mockups/mock2.jpg', price: 74.99 },
        ]
      },
      {
        key: 'business',
        title: 'AI for Business',
        courses: [
          { id: 'biz1', title: 'AI Strategy for Executives', instructor: 'Dr. Richard Taylor', rating: 4.8, students: 9300, image: '/public/mockups/mock3.jpg', price: 99.99 },
          { id: 'biz2', title: 'Predictive Analytics for Business', instructor: 'Amanda Johnson', rating: 4.7, students: 7200, image: '/public/mockups/mock4.jpg', price: 89.99 },
          { id: 'biz3', title: 'Customer Insights with AI', instructor: 'David Wilson', rating: 4.8, students: 5600, image: '/public/mockups/mock5.jpg', price: 84.99 },
          { id: 'biz4', title: 'AI Automation for Businesses', instructor: 'Michelle Lee', rating: 4.6, students: 4300, image: '/public/mockups/mock6.jpg', price: 79.99 },
        ]
      }
    ];

    const featuredCourses = [
      { id: '1', title: 'Introduction to AI and Machine Learning', level: 'Beginner', rating: 4.8, students: 12500, image: '/public/mockups/mock1.jpg' },
      { id: '2', title: 'Deep Learning with TensorFlow', level: 'Intermediate', rating: 4.9, students: 8300, image: '/public/mockups/mock2.jpg' },
      { id: '3', title: 'Natural Language Processing Fundamentals', level: 'Intermediate', rating: 4.7, students: 6200, image: '/public/mockups/mock3.jpg' },
    ];

    // Find the course in all categories and featured courses
    const allCategoryCourses = categoryTabs.flatMap(category => category.courses);
    const aiCategoryCourses = aiCategories ? aiCategories.flatMap(category => category.courses) : [];
    const allCourses = [...aiCategoryCourses, ...allCategoryCourses, ...featuredCourses];
    const foundCourse = allCourses.find(c => c.id === courseId);
    
    console.log("CourseDetail - Current courseId:", courseId);
    console.log("CourseDetail - Available course IDs:", allCourses.map(c => c.id));
    console.log("CourseDetail - Found course:", foundCourse);
    
    if (foundCourse) {
      // Convert to our CourseType and add missing properties
      const extendedCourse = foundCourse as CourseType;
      
      // Add description if it doesn't exist
      if (!extendedCourse.description) {
        extendedCourse.description = `This comprehensive course on ${extendedCourse.title} will teach you everything you need to know to become proficient in this area. Join the ${extendedCourse.students?.toLocaleString() || '1000+' } students who have already enrolled!`;
      }
      
      // Add rating count if it doesn't exist
      if (!extendedCourse.ratingCount && extendedCourse.students) {
        extendedCourse.ratingCount = Math.floor(extendedCourse.students / 10);
      }
      
      setCourse(extendedCourse);
    } else {
      console.error("CourseDetail - Course not found with ID:", courseId);
    }
    
    setLoading(false);
  }, [courseId]);

  // Mock course content data (in a real app this would come from the API)
  const courseContent = [
    {
      id: 'section-1',
      title: 'Getting Started with AI',
      duration: '1h 20m',
      items: [
        { id: 'item-1-1', title: 'Introduction to the Course', duration: '5:20', isPreview: true, type: 'video' },
        { id: 'item-1-2', title: 'How to Get the Most Out of This Course', duration: '8:30', isPreview: false, type: 'video' },
        { id: 'item-1-3', title: 'Setting Up Your Environment', duration: '12:45', isPreview: false, type: 'video' },
        { id: 'item-1-4', title: 'Understanding AI Basics - Quiz', duration: '15:00', isPreview: false, type: 'quiz' },
      ],
      totalLectures: 4,
    },
    {
      id: 'section-2',
      title: 'Fundamentals of Machine Learning',
      duration: '2h 45m',
      items: [
        { id: 'item-2-1', title: 'What is Machine Learning?', duration: '10:15', isPreview: true, type: 'video' },
        { id: 'item-2-2', title: 'Supervised vs Unsupervised Learning', duration: '15:30', isPreview: false, type: 'video' },
        { id: 'item-2-3', title: 'Regression and Classification', duration: '18:20', isPreview: false, type: 'video' },
        { id: 'item-2-4', title: 'Practice Exercise: Building Your First Model', duration: '25:00', isPreview: false, type: 'exercise' },
        { id: 'item-2-5', title: 'ML Fundamentals - Assignment', duration: '45:00', isPreview: false, type: 'assignment' },
      ],
      totalLectures: 5,
    },
    {
      id: 'section-3',
      title: 'Neural Networks and Deep Learning',
      duration: '3h 30m',
      items: [
        { id: 'item-3-1', title: 'Introduction to Neural Networks', duration: '12:30', isPreview: false, type: 'video' },
        { id: 'item-3-2', title: 'Building a Simple Neural Network', duration: '22:45', isPreview: false, type: 'video' },
        { id: 'item-3-3', title: 'Understanding Backpropagation', duration: '18:10', isPreview: false, type: 'video' },
        { id: 'item-3-4', title: 'Deep Learning Applications', duration: '15:35', isPreview: false, type: 'video' },
        { id: 'item-3-5', title: 'Hands-on Project: Image Classification', duration: '45:00', isPreview: false, type: 'project' },
        { id: 'item-3-6', title: 'Neural Networks - Quiz', duration: '20:00', isPreview: false, type: 'quiz' },
      ],
      totalLectures: 6,
    },
    {
      id: 'section-4',
      title: 'Advanced AI Techniques',
      duration: '4h 15m',
      items: [
        { id: 'item-4-1', title: 'Reinforcement Learning Fundamentals', duration: '15:45', isPreview: false, type: 'video' },
        { id: 'item-4-2', title: 'Natural Language Processing', duration: '20:30', isPreview: false, type: 'video' },
        { id: 'item-4-3', title: 'Computer Vision Deep Dive', duration: '25:20', isPreview: false, type: 'video' },
        { id: 'item-4-4', title: 'Generative AI and GANs', duration: '18:15', isPreview: false, type: 'video' },
        { id: 'item-4-5', title: 'Final Course Project', duration: '90:00', isPreview: false, type: 'project' },
      ],
      totalLectures: 5,
    },
  ];

  // Calculate total lectures and duration
  const totalLectures = courseContent.reduce((acc, section) => acc + section.items.length, 0);
  const totalSections = courseContent.length;

  // Mocked course requirements and what you'll learn items
  const requirements = [
    'Basic understanding of programming concepts',
    'Familiarity with Python is recommended but not required',
    'No prior AI or machine learning knowledge needed',
    'A computer with at least 8GB RAM and modern CPU',
  ];

  const whatYoullLearn = [
    'Understand the core concepts of artificial intelligence and machine learning',
    'Build and train neural networks for various applications',
    'Implement advanced AI techniques like reinforcement learning and NLP',
    'Create your own AI-powered applications and models',
    'Prepare for a career in the rapidly growing field of AI',
    'Apply AI techniques to solve real-world problems',
  ];

  // Mock instructor data
  const instructor = {
    name: 'Dr. Alex Johnson',
    role: 'AI Research Scientist & Educator',
    bio: 'Dr. Johnson has over 10 years of experience in AI research and development. He has worked at top tech companies and published numerous papers in leading AI conferences. He is passionate about making AI education accessible to everyone.',
    avatar: '/public/mockups/mock1.jpg',
    rating: 4.8,
    students: 245000,
    courses: 12,
    reviews: 12500,
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="content-container py-8">
          <Text>Loading course details...</Text>
        </div>
      </MainLayout>
    );
  }

  if (!course) {
    return (
      <MainLayout>
        <div className="content-container py-8">
          <Title level={3}>Course not found</Title>
          <Link to="/courses">Browse all courses</Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Custom style for tabs */}
      <style>{tabStyle}</style>
      
      {/* Course Header - Dark section with course basic info */}
      <div className="w-full bg-gray-900 py-12 text-white relative">
        <div className="content-container">
          <Breadcrumb 
            className="mb-4"
            items={[
              { title: <Link to="/" style={themeLink} onMouseOver={(e) => e.currentTarget.style.color = themeLinkHover.color} onMouseOut={(e) => e.currentTarget.style.color = themeLink.color}>Home</Link> },
              { title: <Link to="/courses" style={themeLink} onMouseOver={(e) => e.currentTarget.style.color = themeLinkHover.color} onMouseOut={(e) => e.currentTarget.style.color = themeLink.color}>Courses</Link> },
              { title: <span className="text-gray-300">{course.title}</span> }
            ]}
            separator={<span style={{ color: '#9d78f2' }}>/</span>}
          />
          
          <Row gutter={[32, 32]}>
            <Col xs={24} md={16}>
              <Title level={1} className="text-white mb-2" style={{ color: 'white' }}>
                {course.title}
              </Title>
              
              <Paragraph className="text-xl text-gray-200 mb-4">
                {course.description}
              </Paragraph>
              
              <div className="flex flex-wrap items-center mb-4">
                <Tag color="orange" className="mr-3 mb-2">{course.level}</Tag>
                <div className="flex items-center mr-4 mb-2">
                  <Rate disabled defaultValue={course.rating} className="text-yellow-400 text-sm mr-2" />
                  <Text className="text-gray-300">({course.ratingCount} ratings)</Text>
                </div>
                <Text className="text-gray-300 mr-4 mb-2">{totalLectures} lectures</Text>
                <Text className="text-gray-300 mr-4 mb-2">{totalSections} sections</Text>
                <Text className="text-gray-300 mb-2">11.5 total hours</Text>
              </div>
              
              <div className="mb-4">
                <Text className="text-gray-300">
                  Created by{' '}
                  <Link 
                    to={`/instructor/${instructor.name}`} 
                    style={themeLink}
                    onMouseOver={(e) => e.currentTarget.style.color = themeLinkHover.color} 
                    onMouseOut={(e) => e.currentTarget.style.color = themeLink.color}
                  >
                    {instructor.name}
                  </Link>
                </Text>
              </div>
              
              <div className="flex flex-wrap items-center">
                <Text className="text-gray-300 flex items-center mr-4 mb-2">
                  <InfoCircleOutlined className="mr-1" /> Last updated 06/2023
                </Text>
                <Text className="text-gray-300 flex items-center mr-4 mb-2">
                  <GlobalOutlined className="mr-1" /> English
                </Text>
                <Text className="text-gray-300 flex items-center mb-2">
                  <TranslationOutlined className="mr-1" /> English, Spanish [CC]
                </Text>
              </div>
            </Col>
            
            <Col xs={24} md={8} className="md:absolute md:right-0 md:pr-6 md:z-10" >
              <Card className="shadow-xl">
                <div className="relative mb-4">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full rounded-md"
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                  <Button 
                    type="primary" 
                    size="large" 
                    icon={<PlayCircleOutlined />} 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    onClick={() => setIsVideoModalVisible(true)}
                    style={{ backgroundColor: '#6f0fe0', borderColor: '#6f0fe0' }}
                  >
                    Preview
                  </Button>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Title level={2} className="m-0">${course.discountPrice || course.price}</Title>
                    {course.discountPrice && (
                      <Text className="text-gray-500 line-through">${course.price}</Text>
                    )}
                  </div>
                  {course.discountPrice && (
                    <Text className="text-red-500 block mb-2">
                      {Math.round((1 - course.discountPrice / course.price) * 100)}% off
                    </Text>
                  )}
                  <Text className="text-gray-500">
                    <ClockCircleOutlined className="mr-1" /> 3 days left at this price!
                  </Text>
                </div>
                
                <div className="mb-4 space-y-2">
                  <Button type="primary" block size="large" className="bg-primary-600 hover:bg-primary-700 border-primary-600" style={{ backgroundColor: '#6f0fe0', borderColor: '#6f0fe0' }}>
                    Buy Now
                  </Button>
                  <Button block size="large">
                    Add to Cart
                  </Button>
                  {/* Add "Go to Course" button for users who already purchased the course */}
                  <Button 
                    type="link" 
                    block 
                    size="large"
                    icon={<PlayCircleOutlined />}
                    className="bg-green-50 text-green-600 hover:text-green-700 hover:bg-green-100 border border-green-200"
                    onClick={() => {
                      console.log("Redirecting to CoursePlayer with ID:", courseId);
                      // Store the current course in localStorage to retrieve in CoursePlayer
                      if (course) {
                        localStorage.setItem('current_course', JSON.stringify(course));
                      }
                      navigate(`/course-player/${courseId}`);
                    }}
                  >
                    Go to Course
                  </Button>
                  <div className="text-center">
                    <Text className="text-gray-500">30-Day Money-Back Guarantee</Text>
                  </div>
                </div>
                
                <Divider className="my-3" />
                
                <div className="mb-4">
                  <Title level={5}>This course includes:</Title>
                  <List
                    itemLayout="horizontal"
                    dataSource={[
                      { icon: <PlayCircleOutlined />, text: '11.5 hours on-demand video' },
                      { icon: <FileTextOutlined />, text: '24 articles' },
                      { icon: <DownloadOutlined />, text: '85 downloadable resources' },
                      { icon: <LaptopOutlined />, text: 'Access on mobile and TV' },
                      { icon: <TrophyOutlined />, text: 'Certificate of completion' },
                    ]}
                    renderItem={item => (
                      <List.Item className="py-1 border-0">
                        <Space>
                          <span className="text-gray-600">{item.icon}</span>
                          <Text>{item.text}</Text>
                        </Space>
                      </List.Item>
                    )}
                  />
                </div>
                
                <div className="flex justify-between">
                  <Button type="link" icon={<ShareAltOutlined />}>
                    Share
                  </Button>
                  <Button type="link" icon={<HeartOutlined />}>
                    Wishlist
                  </Button>
                  <Button type="link" icon={<GiftOutlined />}>
                    Gift
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      {/* Course Content Tabs - Add top margin to make space for the overflowing card */}
      <div className="w-full border-b border-gray-200  md:mt-12">
        <div className="content-container">
          <Tabs 
            activeKey={activeTab} 
            onChange={setActiveTab}
            className="course-detail-tabs"
            size="large"
            tabBarStyle={{ fontWeight: 500 }}
            animated={{ inkBar: true, tabPane: true }}
          >
            <TabPane tab="Overview" key="overview" />
            <TabPane tab="Curriculum" key="curriculum" />
            <TabPane tab="Instructor" key="instructor" />
            <TabPane tab="Reviews" key="reviews" />
          </Tabs>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="w-full bg-white py-8">
        <div className="content-container">
          <Row gutter={[48, 32]}>
            <Col xs={24} md={16}>
              {activeTab === 'overview' && (
                <>
                  {/* What you'll learn section */}
                  <Card className="mb-8">
                    <Title level={4} className="mb-4">What you'll learn</Title>
                    <Row gutter={[16, 16]}>
                      {whatYoullLearn.map((item, index) => (
                        <Col xs={24} md={12} key={index}>
                          <div className="flex items-start">
                            <CheckCircleFilled className="text-primary-500 mt-1 mr-2 flex-shrink-0" />
                            <Text>{item}</Text>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </Card>
                  
                  {/* Course content preview */}
                  <Card className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <Title level={4} className="mb-0">Course content</Title>
                      <div>
                        <Text className="mr-4">
                          {totalSections} sections • {totalLectures} lectures • 11h 30m total length
                        </Text>
                        <Button 
                          type="link" 
                          onClick={() => setActiveTab('curriculum')}
                          style={{ color: '#9d78f2' }}
                          className="hover:text-primary-300"
                        >
                          View all sections
                        </Button>
                      </div>
                    </div>
                    
                    <CourseContentAccordion 
                      sections={courseContent.slice(0, 2)} 
                      expandedSections={['section-1']}
                    />
                    
                    {courseContent.length > 2 && (
                      <Button 
                        type="link" 
                        block 
                        className="mt-4"
                        onClick={() => setActiveTab('curriculum')}
                        style={{ color: '#9d78f2' }}
                      >
                        Show more sections
                      </Button>
                    )}
                  </Card>
                  
                  {/* Requirements */}
                  <Card className="mb-8">
                    <Title level={4} className="mb-4">Requirements</Title>
                    <ul className="list-disc pl-6 space-y-2">
                      {requirements.map((item, index) => (
                        <li key={index}>
                          <Text>{item}</Text>
                        </li>
                      ))}
                    </ul>
                  </Card>
                  
                  {/* Description */}
                  <Card className="mb-8">
                    <Title level={4} className="mb-4">Description</Title>
                    <Paragraph className="whitespace-pre-line">
                      {course.longDescription || `Welcome to the comprehensive AI course that will take you from a beginner to an advanced practitioner. This course is designed for anyone who wants to learn AI, whether you're a student, professional, or just curious about this exciting field.

In this course, you'll learn:

- The foundational concepts of artificial intelligence and machine learning
- How to implement various AI algorithms and techniques
- Real-world applications of AI across different industries
- Advanced topics such as deep learning, neural networks, and reinforcement learning

By the end of this course, you'll have built several AI projects that you can showcase in your portfolio, and you'll have the skills needed to apply AI to solve real-world problems.

Join thousands of other students who have transformed their careers with this course!`}
                    </Paragraph>
                    
                    <Divider />
                    
                    <Title level={5} className="mb-3">Who this course is for:</Title>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><Text>Beginners with no prior experience in AI or machine learning</Text></li>
                      <li><Text>Programmers who want to add AI skills to their toolkit</Text></li>
                      <li><Text>Professionals looking to apply AI in their industry</Text></li>
                      <li><Text>Students interested in pursuing a career in AI</Text></li>
                    </ul>
                  </Card>
                </>
              )}
              
              {activeTab === 'curriculum' && (
                <Card>
                  <div className="flex justify-between items-center mb-4">
                    <Title level={4} className="mb-0">Course content</Title>
                    <Text>
                      {totalSections} sections • {totalLectures} lectures • 11h 30m total length
                    </Text>
                  </div>
                  
                  <CourseContentAccordion 
                    sections={courseContent} 
                    expandedSections={[]}
                  />
                </Card>
              )}
              
              {activeTab === 'instructor' && (
                <Card>
                  <div className="flex items-start mb-6">
                    <Avatar src={instructor.avatar} size={80} />
                    <div className="ml-4">
                      <Title level={4} className="mb-1" style={{ color: '#6f0fe0' }}>{instructor.name}</Title>
                      <Text type="secondary" className="block mb-2">{instructor.role}</Text>
                      
                      <div className="flex flex-wrap my-3">
                        <div className="mr-6 mb-2">
                          <div className="flex items-center">
                            <StarFilled className="text-yellow-400 mr-2" />
                            <Text>{instructor.rating} Instructor Rating</Text>
                          </div>
                        </div>
                        <div className="mr-6 mb-2">
                          <div className="flex items-center">
                            <TeamOutlined className="mr-2" />
                            <Text>{(instructor.students / 1000).toFixed(0)}K Students</Text>
                          </div>
                        </div>
                        <div className="mb-2">
                          <div className="flex items-center">
                            <PlayCircleOutlined className="mr-2" />
                            <Text>{instructor.courses} Courses</Text>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Divider />
                  
                  <Paragraph className="whitespace-pre-line">
                    {instructor.bio}
                  </Paragraph>
                </Card>
              )}
              
              {activeTab === 'reviews' && (
                <Card>
                  <div className="flex items-center justify-between mb-6">
                    <Title level={4} className="mb-0">Student Reviews</Title>
                    <div className="text-right">
                      <Title level={2} className="mb-0 text-yellow-500">{course.rating}</Title>
                      <Rate disabled defaultValue={course.rating} className="text-yellow-400" />
                      <Text className="block">Course Rating</Text>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    {[5, 4, 3, 2, 1].map(star => (
                      <div key={star} className="flex items-center mb-2">
                        <Text className="w-16">{star} stars</Text>
                        <Progress 
                          percent={star === 5 ? 78 : star === 4 ? 15 : star === 3 ? 5 : star === 2 ? 1 : 1} 
                          showInfo={false} 
                          strokeColor="#f4b400"
                          className="flex-grow mx-4"
                        />
                        <Text>{star === 5 ? '78%' : star === 4 ? '15%' : star === 3 ? '5%' : star === 2 ? '1%' : '1%'}</Text>
                      </div>
                    ))}
                  </div>
                  
                  <Divider />
                  
                  {/* Reviews list would go here */}
                  <div className="space-y-6">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="border-b pb-6 last:border-b-0">
                        <div className="flex items-start mb-3">
                          <Avatar src={`/public/mockups/mock1.jpg`} />
                          <div className="ml-3">
                            <Text strong>Student {i}</Text>
                            <div className="flex items-center">
                              <Rate disabled defaultValue={5} className="text-yellow-400 text-sm mr-2" />
                              <Text type="secondary">2 months ago</Text>
                            </div>
                          </div>
                        </div>
                        <Paragraph>
                          This course exceeded my expectations. The instructor explains complex AI concepts in a way that's easy to understand, and the practical exercises helped me apply what I learned right away. I now feel confident implementing AI solutions in my own projects.
                        </Paragraph>
                        <div className="flex items-center">
                          <Button type="text" icon={<LikeOutlined />} size="small">
                            Helpful
                          </Button>
                          <Button type="text" icon={<DislikeOutlined />} size="small" className="ml-2">
                            Not helpful
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </Col>
          </Row>
        </div>
      </div>
      
      {/* Video Preview Modal */}
      <Modal
        title="Course Preview"
        open={isVideoModalVisible}
        onCancel={() => setIsVideoModalVisible(false)}
        footer={null}
        width={800}
      >
        <div className="aspect-w-16 aspect-h-9">
          <iframe 
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
            title="Course Preview" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="w-full h-96"
          ></iframe>
        </div>
      </Modal>
    </MainLayout>
  );
};

export default CourseDetail; 