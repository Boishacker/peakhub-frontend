import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Typography, 
  Button, 
  Row, 
  Col, 
  Card, 
  Divider, 
  Tabs, 
  Avatar, 
  Rate, 
  Carousel,
  Tag
} from 'antd';
import { 
  LeftOutlined, 
  RightOutlined,
  ArrowRightOutlined,
  PlayCircleOutlined
} from '@ant-design/icons';
import MainLayout from '../../components/layout/MainLayout';
import { useAuth } from '../../contexts/AuthContext';
import { banners as dataBanners } from '../../data/courses';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

// Banner data
const banners = [
  {
    id: 1,
    title: 'Master AI Skills',
    subtitle: 'Build the future with cutting-edge AI courses',
    cta: 'Start Learning',
    link: '/courses',
    bgColor: 'from-purple-700 to-indigo-600'
  },
  {
    id: 2,
    title: 'AI Certification',
    subtitle: 'Get certified in the most in-demand AI skills',
    cta: 'View Certifications',
    link: '/certifications',
    bgColor: 'from-blue-600 to-cyan-500'
  },
  {
    id: 3,
    title: 'Special Offer',
    subtitle: 'Get 30% off on all AI courses this month',
    cta: 'Claim Offer',
    link: '/offers',
    bgColor: 'from-rose-600 to-pink-500'
  }
];

// Category tabs data
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

// Popular categories
const popularCategories = [
  { id: 'pc1', name: 'Computer Vision', courses: 42, color: 'magenta' },
  { id: 'pc2', name: 'Natural Language Processing', courses: 38, color: 'red' },
  { id: 'pc3', name: 'Generative AI', courses: 35, color: 'volcano' },
  { id: 'pc4', name: 'Machine Learning', courses: 64, color: 'orange' },
  { id: 'pc5', name: 'Deep Learning', courses: 51, color: 'gold' },
  { id: 'pc6', name: 'Reinforcement Learning', courses: 28, color: 'lime' },
  { id: 'pc7', name: 'AI Ethics', courses: 18, color: 'green' },
  { id: 'pc8', name: 'Neural Networks', courses: 46, color: 'cyan' },
  { id: 'pc9', name: 'Prompt Engineering', courses: 24, color: 'blue' },
  { id: 'pc10', name: 'AI Applications', courses: 37, color: 'geekblue' },
  { id: 'pc11', name: 'Data Science', courses: 58, color: 'purple' },
  { id: 'pc12', name: 'AI for Healthcare', courses: 21, color: 'red' }
];

// Top instructors
const topInstructors = [
  { id: 'ins1', name: 'Dr. Sarah Chen', title: 'AI Researcher & Educator', courses: 12, students: 85000, rating: 4.9, image: '/public/mockups/mock1.jpg' },
  { id: 'ins2', name: 'Michael Wong', title: 'ML Engineer & Instructor', courses: 8, students: 63000, rating: 4.8, image: '/public/mockups/mock2.jpg' },
  { id: 'ins3', name: 'Dr. Alex Johnson', title: 'NLP Specialist', courses: 10, students: 71000, rating: 4.9, image: '/public/mockups/mock3.jpg' },
  { id: 'ins4', name: 'Lisa Park', title: 'AI Product Manager', courses: 6, students: 52000, rating: 4.7, image: '/public/mockups/mock4.jpg' },
  { id: 'ins5', name: 'Robert Zhang', title: 'Computer Vision Expert', courses: 9, students: 68000, rating: 4.8, image: '/public/mockups/mock5.jpg' }
];

// Student testimonials
const testimonials = [
  { 
    id: 'test1', 
    name: 'Jason Miller', 
    role: 'Data Scientist',
    company: 'TechCorp',
    image: '/public/mockups/mock1.jpg',
    text: 'The courses on PeakHub completely transformed my career. I went from a junior analyst to a senior data scientist in just 6 months after completing the Machine Learning track.',
    course: 'Advanced Machine Learning'
  },
  { 
    id: 'test2', 
    name: 'Emily Johnson', 
    role: 'AI Developer',
    company: 'InnovateTech',
    image: '/public/mockups/mock2.jpg',
    text: 'The practical approach of PeakHub courses helped me build real-world AI applications that impressed my employers. The instructors are world-class and the community support is amazing.',
    course: 'Building AI Applications'
  },
  { 
    id: 'test3', 
    name: 'Carlos Rodriguez', 
    role: 'ML Engineer',
    company: 'FinanceAI',
    image: '/public/mockups/mock3.jpg',
    text: 'I came from a non-technical background but was able to transition into AI thanks to PeakHub\'s beginner-friendly yet comprehensive courses. Now I\'m leading ML initiatives at my company.',
    course: 'ML for Non-Programmers'
  },
];

// Mock data for courses
const featuredCourses = [
  { id: '1', title: 'Introduction to AI and Machine Learning', level: 'Beginner', rating: 4.8, students: 12500, image: '/public/mockups/mock1.jpg' },
  { id: '2', title: 'Deep Learning with TensorFlow', level: 'Intermediate', rating: 4.9, students: 8300, image: '/public/mockups/mock2.jpg' },
  { id: '3', title: 'Natural Language Processing Fundamentals', level: 'Intermediate', rating: 4.7, students: 6200, image: '/public/mockups/mock3.jpg' },
];

// Mock data for categories
const categories = [
  { id: 'machine-learning', name: 'Machine Learning', courses: 42 },
  { id: 'deep-learning', name: 'Deep Learning', courses: 36 },
  { id: 'nlp', name: 'Natural Language Processing', courses: 28 },
  { id: 'computer-vision', name: 'Computer Vision', courses: 24 },
  { id: 'robotics', name: 'Robotics & AI', courses: 18 },
  { id: 'business', name: 'AI for Business', courses: 15 },
];

const Home = () => {
  console.log("Home component is rendering...");
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('image');
  
  useEffect(() => {
    if (user && user.role === 'admin') {
      navigate('/admin', { replace: true });
    }
  }, [user, navigate]);

  // Course card component to avoid repetition
  const CourseCard = ({ course, showInstructor = false }) => (
    <div className="course-card-wrapper">
      <Link to={`/course/${course.id}`} className="block h-full">
        <div className="course-card">
          <div className="course-image-container">
            <img 
              src={course.image || `/public/mockups/mock${Math.floor(Math.random() * 10) + 1}.jpg`} 
              alt={course.title}
              className="course-image"
            />
            <div className="course-overlay">
              <div className="preview-btn">
                <PlayCircleOutlined /> Preview
              </div>
            </div>
            {course.level && (
              <div className="level-tag">
                {course.level}
              </div>
            )}
          </div>
          <div className="course-content">
            <h3 className="course-title" title={course.title}>{course.title}</h3>
            {showInstructor && (
              <div className="instructor-name">By {course.instructor}</div>
            )}
            <div className="course-rating">
              <span className="rating-score">{course.rating}</span>
              <div className="stars-container">★★★★★</div>
              <span className="rating-count">({course.students?.toLocaleString() || 0} students)</span>
            </div>
            {course.price && (
              <div className="course-price">
                <span className="normal-price">${course.price}</span>
              </div>
            )}
            <button 
              className="view-course-btn"
              style={{ 
                backgroundColor: '#6f0fe0', 
                borderColor: '#6f0fe0'
              }}
            >
              View Course
            </button>
          </div>
        </div>
      </Link>
      <style>{`
        .course-card-wrapper {
          position: relative;
          height: 100%;
        }
        .course-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          border: 1px solid #e8e9eb;
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
          background: white;
        }
        .course-card:hover {
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          transform: translateY(-4px);
        }
        .course-image-container {
          position: relative;
          height: 140px;
          overflow: hidden;
        }
        .course-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .course-card:hover .course-image {
          transform: scale(1.05);
        }
        .course-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .course-card:hover .course-overlay {
          opacity: 1;
        }
        .preview-btn {
          background: white;
          color: #333;
          padding: 8px 16px;
          border-radius: 4px;
          font-weight: 600;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .level-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #5624d0;
          color: white;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 4px;
        }
        .course-content {
          padding: 12px 16px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .course-title {
          font-size: 16px;
          font-weight: 700;
          margin: 0 0 6px 0;
          line-height: 1.4;
          color: #1c1d1f;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .instructor-name {
          font-size: 13px;
          color: #6a6f73;
          margin-bottom: 6px;
        }
        .course-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 12px;
        }
        .rating-score {
          font-weight: 700;
          color: #b4690e;
          font-size: 14px;
        }
        .stars-container {
          color: #e59819;
          font-size: 14px;
        }
        .rating-count {
          font-size: 12px;
          color: #6a6f73;
        }
        .course-price {
          margin-top: auto;
          font-size: 16px;
          font-weight: 700;
          color: #1c1d1f;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }
        .normal-price {
          color: #6f0fe0;
        }
        .view-course-btn {
          padding: 8px 0;
          color: white;
          border-radius: 4px;
          font-weight: 600;
          font-size: 14px;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .view-course-btn:hover {
          background-color: #5d0ebb !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(111, 15, 224, 0.3);
        }
      `}</style>
    </div>
  );
  
  return (
    <MainLayout>
      {/* Slide Banner Section */}
      <div className="relative">
        <Carousel 
          autoplay 
          className="banner-carousel"
          arrows={false}
          draggable={true}
          autoplaySpeed={5000}
        >
          {dataBanners.map(banner => (
            <div key={banner.id}>
              <div 
                className="relative h-[480px]" 
                style={{ 
                  background: `linear-gradient(90deg, rgba(0, 0, 0, 0.7) 35%, rgba(0, 0, 0, 0.4) 100%)` 
                }}
              >
                <img 
                  src={banner.image} 
                  alt={banner.title}
                  className="absolute inset-0 w-full h-full object-cover -z-10"
                />
                <div className="content-container relative z-10 h-full flex items-center">
                  <div style={{
                    maxWidth: '500px',
                    backgroundColor: 'white',
                    padding: '32px',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
                  }}>
                    <Title level={1} style={{ margin: 0, fontSize: '36px', color: '#1f2937' }}>
                      {banner.title}
                    </Title>
                    <Paragraph style={{ fontSize: '18px', marginBottom: '32px', color: '#4b5563' }}>
                      {banner.description}
                    </Paragraph>
                    <Link to={banner.buttonLink}>
                      <Button 
                        type="primary"
                        size="large"
                        icon={<ArrowRightOutlined />}
                        className="start-learning-btn"
                        style={{ 
                          backgroundColor: '#6f0fe0', 
                          borderColor: '#6f0fe0',
                          height: '50px',
                          fontSize: '16px',
                          padding: '0 30px'
                        }}
                      >
                        {banner.buttonText}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
        <style>
          {`
            .banner-carousel .slick-dots {
              bottom: 20px;
            }
            .banner-carousel .slick-dots li.slick-active button {
              background: #6f0fe0 !important;
              width: 24px;
            }
            .banner-carousel .slick-dots li button {
              background: white !important;
              opacity: 0.8;
              width: 12px;
              height: 4px;
              border-radius: 2px;
            }
            .banner-carousel .slick-dots li {
              margin: 0 4px;
            }
            .banner-carousel .slick-track {
              cursor: grab;
            }
            .banner-carousel .slick-track:active {
              cursor: grabbing;
            }
            .start-learning-btn:hover {
              background-color: #5d0ebb !important;
              border-color: #5d0ebb !important;
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(111, 15, 224, 0.3);
            }
            .start-learning-btn:active {
              transform: translateY(0);
            }
          `}
        </style>
      </div>
      
      {/* Category Tabs Section */}
      <div className="py-16 bg-white">
        <div className="content-container">
          <div className="text-center mb-12">
            <Title level={2}>Explore AI Fields</Title>
            <Paragraph className="text-lg text-gray-600">
              Find the perfect AI course by specialized field
            </Paragraph>
          </div>
          
          <Tabs 
            activeKey={activeTab} 
            onChange={setActiveTab}
            centered
            className="category-tabs"
            animated={{ inkBar: true, tabPane: true }}
          >
            {categoryTabs.map(category => (
              <TabPane tab={category.title} key={category.key}>
                <div className="my-8">
                  <Row gutter={[24, 24]}>
                    {category.courses.map(course => (
                      <Col key={course.id} xs={24} sm={12} lg={6}>
                        <CourseCard course={course} showInstructor={true} />
                      </Col>
                    ))}
                  </Row>
                  <div className="mt-16 text-center">
                    <Link to={`/courses/category/${category.key}`}>
                      <Button 
                        size="large"
                        type="primary"
                        style={{ 
                          backgroundColor: '#6f0fe0', 
                          borderColor: '#6f0fe0'
                        }}
                        className="view-all-btn"
                      >
                        View All {category.title} Courses
                      </Button>
                    </Link>
                  </div>
                </div>
              </TabPane>
            ))}
          </Tabs>
          <style>
            {`
              .category-tabs .ant-tabs-nav::before {
                border-bottom: 1px solid #e5e7eb;
              }
              .category-tabs .ant-tabs-tab {
                font-size: 16px;
                padding: 12px 20px;
                transition: all 0.3s ease;
                margin: 0 4px;
              }
              .category-tabs .ant-tabs-tab:hover {
                color: #6f0fe0;
              }
              .category-tabs .ant-tabs-tab-active {
                font-weight: 600;
              }
              .category-tabs .ant-tabs-ink-bar {
                background-color: #6f0fe0 !important;
                height: 3px !important;
              }
              .category-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
                color: #6f0fe0 !important;
              }
              .category-tabs .ant-tabs-content {
                transition: all 0.3s ease-in-out;
              }
              .category-tabs .ant-tabs-tabpane {
                transition: opacity 0.4s ease-in-out;
              }
              .view-all-btn {
                margin-top: 12px;
                transition: all 0.3s ease;
                padding: 0 30px;
                height: 44px;
              }
              .view-all-btn:hover {
                background-color: #5d0ebb !important;
                border-color: #5d0ebb !important;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(111, 15, 224, 0.3);
              }
              .view-all-btn:active {
                transform: translateY(0);
              }
            `}
          </style>
        </div>
      </div>
      
      {/* Popular Categories Section */}
      <div className="py-16 bg-gray-50">
        <div className="content-container">
          <div className="text-center mb-12">
            <Title level={2}>Popular Categories</Title>
            <Paragraph className="text-lg text-gray-600">
              Browse our most in-demand AI topics
            </Paragraph>
          </div>
          
          <Row gutter={[16, 16]}>
            {popularCategories.map(category => (
              <Col key={category.id} xs={12} sm={8} md={6} lg={4}>
                <Link to={`/courses/category/${category.id}`}>
                  <Card hoverable className="text-center category-card">
                    <Tag color={category.color} className="mb-2 px-3 py-1">{category.courses} courses</Tag>
                    <Title level={5} className="m-0">{category.name}</Title>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
          <style>
            {`
              .category-card {
                transition: all 0.3s ease;
                height: 100%;
              }
              .category-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
              }
            `}
          </style>
        </div>
      </div>
      
      {/* Top Instructors Section */}
      <div className="py-16 bg-white">
        <div className="content-container">
          <div className="text-center mb-12">
            <Title level={2}>Learn from Top AI Experts</Title>
            <Paragraph className="text-lg text-gray-600">
              World-class instructors sharing their knowledge
            </Paragraph>
          </div>
          
          <Carousel 
            dots={true}
            slidesToShow={3}
            slidesToScroll={1}
            autoplay
            draggable={true}
            infinite={true}
            swipeToSlide={true}
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 640,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]}
            className="instructor-carousel"
          >
            {topInstructors.map(instructor => (
              <div key={instructor.id} style={{ padding: '0 15px' }}>
                <Card className="text-center h-full instructor-card" bordered={false}>
                  <Avatar 
                    size={100} 
                    src={instructor.image} 
                    alt={instructor.name}
                    className="mb-4 instructor-avatar"
                  />
                  <Title level={4} className="mb-1">{instructor.name}</Title>
                  <Text className="text-gray-600 block mb-2">{instructor.title}</Text>
                  <Rate disabled defaultValue={instructor.rating} className="mb-2" />
                  <Paragraph className="mb-1">
                    <strong>{instructor.courses}</strong> Courses
                  </Paragraph>
                  <Paragraph className="mb-4">
                    <strong>{(instructor.students / 1000).toFixed(0)}K</strong> Students
                  </Paragraph>
                  <Link to={`/instructor/${instructor.id}`}>
                    <Button 
                      type="primary" 
                      style={{ 
                        backgroundColor: '#6f0fe0', 
                        borderColor: '#6f0fe0'
                      }}
                      className="theme-button"
                    >
                      View Profile
                    </Button>
                  </Link>
                </Card>
              </div>
            ))}
          </Carousel>
          <style>
            {`
              .instructor-carousel .slick-dots li.slick-active button {
                background: #6f0fe0 !important;
              }
              .instructor-carousel .slick-dots li button {
                background: #d1d5db !important;
              }
              .instructor-carousel .slick-track {
                display: flex;
                padding: 20px 0;
                cursor: grab;
              }
              .instructor-carousel .slick-slide {
                padding: 0 15px;
                height: auto;
              }
              .instructor-carousel .slick-slide > div {
                height: 100%;
              }
              .instructor-carousel .slick-track:active {
                cursor: grabbing;
              }
              .instructor-avatar {
                border: 3px solid #f4f0fe;
                box-shadow: 0 0 0 2px #6f0fe0;
              }
              .instructor-card {
                transition: all 0.3s ease;
                padding: 20px 15px;
                height: 100%;
              }
              .instructor-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 15px 30px rgba(111, 15, 224, 0.1);
              }
              .category-tabs .ant-tabs-content {
                transition: all 0.3s ease-in-out;
              }
              .category-tabs .ant-tabs-tabpane {
                transition: opacity 0.4s ease-in-out;
              }
              .view-all-btn {
                margin-top: 24px;
                transition: all 0.3s ease;
              }
              .view-all-btn:hover {
                background-color: #5d0ebb !important;
                border-color: #5d0ebb !important;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(111, 15, 224, 0.3);
              }
              .view-all-btn:active {
                transform: translateY(0);
              }
              .theme-button {
                transition: all 0.3s ease;
              }
              .theme-button:hover {
                background-color: #5d0ebb !important;
                border-color: #5d0ebb !important;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(111, 15, 224, 0.3);
              }
              .theme-button:active {
                transform: translateY(0);
              }
            `}
          </style>
        </div>
      </div>
      
      {/* Student Testimonials */}
      <div className="py-16 bg-primary-50">
        <div className="content-container">
          <div className="text-center mb-12">
            <Title level={2}>Student Success Stories</Title>
            <Paragraph className="text-lg text-gray-600">
              See how PeakHub has transformed careers
            </Paragraph>
          </div>
          
          <Row gutter={[24, 24]}>
            {testimonials.map(testimonial => (
              <Col key={testimonial.id} xs={24} md={8}>
                <Card className="h-full" bordered={false}>
                  <div className="flex items-center mb-4">
                    <Avatar 
                      size={64} 
                      src={testimonial.image} 
                      alt={testimonial.name}
                    />
                    <div className="ml-4">
                      <Title level={5} className="mb-0">{testimonial.name}</Title>
                      <Text className="text-gray-600 block">{testimonial.role}</Text>
                      <Text className="text-gray-600 block">{testimonial.company}</Text>
                    </div>
                  </div>
                  <Paragraph className="italic mb-4">
                    "{testimonial.text}"
                  </Paragraph>
                  <div className="text-sm text-gray-500">
                    Course: <Link to={`/course/${testimonial.id}`}>{testimonial.course}</Link>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      
      {/* Featured Courses */}
      <div className="py-16 bg-white">
        <div className="content-container">
          <div className="text-center mb-12">
            <Title level={2}>Featured AI Courses</Title>
            <Paragraph className="text-lg text-gray-600">
              Start your journey with these popular courses
            </Paragraph>
          </div>
          
          <Row gutter={[24, 24]}>
            {featuredCourses.map(course => (
              <Col key={course.id} xs={24} md={8}>
                <CourseCard course={course} />
              </Col>
            ))}
          </Row>
          
          <div className="mt-16 text-center">
            <Link to="/courses">
              <Button 
                size="large" 
                type="primary"
                style={{ 
                  backgroundColor: '#6f0fe0', 
                  borderColor: '#6f0fe0',
                  padding: '0 30px',
                  height: '44px'
                }}
                className="view-all-btn"
              >
                View All Courses
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Categories */}
      <div className="py-16 bg-gray-50">
        <div className="content-container">
          <div className="text-center mb-12">
            <Title level={2}>Explore AI Categories</Title>
            <Paragraph className="text-lg text-gray-600">
              Dive into specialized fields of artificial intelligence
            </Paragraph>
          </div>
          
          <Row gutter={[16, 16]}>
            {categories.map(category => (
              <Col key={category.id} xs={12} md={8}>
                <Link to={`/courses/category/${category.id}`}>
                  <Card hoverable className="text-center">
                    <Title level={4}>{category.name}</Title>
                    <Paragraph className="text-gray-500">
                      {category.courses} courses
                    </Paragraph>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-5 mt-5 bg-gradient-to-r from-primary-600 to-primary-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="content-container text-center relative z-10">
          <Title level={2} className="mb-6 text-4xl" style={{ color: 'white' }}>Ready to start your AI journey?</Title>
          <Paragraph className="text-white text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of students already learning on PeakHub. Get unlimited access 
            to all courses, projects, and exclusive learning resources.
          </Paragraph>
          <Link to={user ? "/courses" : "/signup"}>
            <Button 
              type="primary" 
              size="large"
              className="bg-white border-white text-primary-600 h-[50px] text-base px-8 font-bold hover:bg-primary-50 hover:border-primary-50 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              {user ? "Browse Courses" : "Start Learning Today"}
            </Button>
          </Link>
        </div>
        <style>
          {`
            .bg-pattern {
              background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
            }
          `}
        </style>
      </div>
    </MainLayout>
  );
};

export default Home;