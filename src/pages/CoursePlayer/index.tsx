import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {   Layout,   Menu,   Typography,   Button,   Progress,   Tooltip,   Tabs,  Collapse,  Card,  Input,  Space,  Divider,  Badge,  Tag,  Modal,  Drawer,  Avatar,  Select,  Dropdown,  Checkbox} from 'antd';
import {   PlayCircleOutlined,   CheckCircleFilled,  FileTextOutlined,   BookOutlined,  DownloadOutlined,  CheckOutlined,  LockOutlined,  MenuFoldOutlined,  MenuUnfoldOutlined,  FileOutlined,  FormOutlined,  ProjectOutlined,  SettingOutlined,  LeftOutlined,  RightOutlined,  SearchOutlined,  QuestionCircleOutlined,  StarOutlined,  MessageOutlined,  DownOutlined,  UpOutlined,  MenuOutlined,  UnorderedListOutlined,  CaretDownOutlined,  CaretRightOutlined} from '@ant-design/icons';

import { aiCategories } from '../../data/courses';
import { useAuth } from '../../contexts/AuthContext';
import MainLayout from '../../components/layout/MainLayout';

const { Title, Text, Paragraph } = Typography;
const { Header, Sider, Content } = Layout;
const { Panel } = Collapse;
const { TabPane } = Tabs;

// Custom styles
const customStyles = `
  /* Tab styling */
  .course-player-tabs .ant-tabs-tab:hover .ant-tabs-tab-btn {
    color: #6f0fe0 !important;
    transform: translateY(-2px);
  }
  
  .course-player-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #6f0fe0 !important;
    font-weight: 600 !important;
  }
  
  .course-player-tabs .ant-tabs-ink-bar {
    background-color: #6f0fe0 !important;
    height: 3px !important;
    border-radius: 3px !important;
  }
  
  .course-player-tabs .ant-tabs-tab {
    transition: all 0.3s ease;
    padding: 12px 16px !important;
  }

  .course-player-tabs .ant-tabs-content {
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

const CoursePlayer = () => {
  const { courseId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  
  // Log courseId when component mounts
  useEffect(() => {
    console.log("CoursePlayer mounted with courseId:", courseId);
  }, []);
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [progress, setProgress] = useState(15); // percentage of course completed
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notesVisible, setNotesVisible] = useState(false);  
  const [activeTab, setActiveTab] = useState('overview');  
  const [quickNavVisible, setQuickNavVisible] = useState(false);
  const [rightSidebarVisible, setRightSidebarVisible] = useState(true);
  const [expandedSections, setExpandedSections] = useState(['section-1']);

  // Mock course content data
  const courseContent = [
    {
      id: 'section-1',
      title: 'Getting Started with AI',
      duration: '1h 20m',
      expanded: true,
      items: [
        { id: 'item-1-1', title: 'Introduction to the Course', duration: '5:20', completed: true, type: 'video', active: false },
        { id: 'item-1-2', title: 'How to Get the Most Out of This Course', duration: '8:30', completed: true, type: 'video', active: false },
        { id: 'item-1-3', title: 'Setting Up Your Environment', duration: '12:45', completed: false, type: 'video', active: true },
        { id: 'item-1-4', title: 'Understanding AI Basics - Quiz', duration: '15:00', completed: false, type: 'quiz', active: false },
      ],
    },
    {
      id: 'section-2',
      title: 'Fundamentals of Machine Learning',
      duration: '2h 45m',
      expanded: false,
      items: [
        { id: 'item-2-1', title: 'What is Machine Learning?', duration: '10:15', completed: false, type: 'video', active: false },
        { id: 'item-2-2', title: 'Supervised vs Unsupervised Learning', duration: '15:30', completed: false, type: 'video', active: false },
        { id: 'item-2-3', title: 'Regression and Classification', duration: '18:20', completed: false, type: 'video', active: false },
        { id: 'item-2-4', title: 'Practice Exercise: Building Your First Model', duration: '25:00', completed: false, type: 'exercise', active: false },
        { id: 'item-2-5', title: 'ML Fundamentals - Assignment', duration: '45:00', completed: false, type: 'assignment', active: false },
      ],
    },
    {
      id: 'section-3',
      title: 'Neural Networks and Deep Learning',
      duration: '3h 30m',
      expanded: false,
      items: [
        { id: 'item-3-1', title: 'Introduction to Neural Networks', duration: '12:30', completed: false, type: 'video', active: false },
        { id: 'item-3-2', title: 'Building a Simple Neural Network', duration: '22:45', completed: false, type: 'video', active: false },
        { id: 'item-3-3', title: 'Understanding Backpropagation', duration: '18:10', completed: false, type: 'video', active: false },
        { id: 'item-3-4', title: 'Deep Learning Applications', duration: '15:35', completed: false, type: 'video', active: false },
        { id: 'item-3-5', title: 'Hands-on Project: Image Classification', duration: '45:00', completed: false, type: 'project', active: false },
        { id: 'item-3-6', title: 'Neural Networks - Quiz', duration: '20:00', completed: false, type: 'quiz', active: false },
      ],
    },
    {
      id: 'section-4',
      title: 'Advanced AI Techniques',
      duration: '4h 15m',
      expanded: false,
      items: [
        { id: 'item-4-1', title: 'Reinforcement Learning Fundamentals', duration: '15:45', completed: false, type: 'video', active: false },
        { id: 'item-4-2', title: 'Natural Language Processing', duration: '20:30', completed: false, type: 'video', active: false },
        { id: 'item-4-3', title: 'Computer Vision Deep Dive', duration: '25:20', completed: false, type: 'video', active: false },
        { id: 'item-4-4', title: 'Generative AI and GANs', duration: '18:15', completed: false, type: 'video', active: false },
        { id: 'item-4-5', title: 'Final Course Project', duration: '90:00', completed: false, type: 'project', active: false },
      ],
    },
  ];

  // Find current lecture
  useEffect(() => {
    // Find the active lecture
    for (const section of courseContent) {
      const activeItem = section.items.find(item => item.active);
      if (activeItem) {
        setCurrentLecture(activeItem);
        break;
      }
    }
  }, []);

  // Find the course data
  useEffect(() => {
    console.log("CoursePlayer - Attempting to find course with ID:", courseId);
    
    // First, try to retrieve the course from localStorage
    try {
      const savedCourse = localStorage.getItem('current_course');
      if (savedCourse) {
        const parsedCourse = JSON.parse(savedCourse);
        
        // Verify it's the course we're looking for
        if (parsedCourse.id === courseId) {
          console.log("CoursePlayer - Found course in localStorage:", parsedCourse);
          setCourse(parsedCourse);
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      console.error("Error retrieving course from localStorage:", err);
    }
    
    // If not found in localStorage, search through all available courses
    // Find the course in all categories
    const allCourses = aiCategories.flatMap(category => category.courses);
    
    // Define additional course data sources similar to CourseDetail
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
    
    // Combine all course sources
    const categoryCourses = categoryTabs.flatMap(category => category.courses);
    const allAvailableCourses = [...allCourses, ...categoryCourses, ...featuredCourses];
    
    // Find the course
    const foundCourse = allAvailableCourses.find(c => c.id === courseId);
    
    console.log("CoursePlayer - Looking for course ID:", courseId);
    console.log("CoursePlayer - Available courses:", allAvailableCourses.map(c => c.id));
    console.log("CoursePlayer - Found course:", foundCourse);
    
    if (foundCourse) {
      setCourse(foundCourse);
    } else {
      console.error("Course not found with ID:", courseId);
    }
    
    setLoading(false);
  }, [courseId]);

  // Get total count of lectures and completed lectures
  const getTotalAndCompletedLectures = () => {
    let total = 0;
    let completed = 0;

    courseContent.forEach(section => {
      section.items.forEach(item => {
        total++;
        if (item.completed) {
          completed++;
        }
      });
    });

    return { total, completed };
  };

  const { total, completed } = getTotalAndCompletedLectures();

  // Handler for changing lectures
  const handleChangeLecture = (sectionId, itemId) => {
    // In a real app, you'd update the state of all lectures
    // and load the appropriate video
    
    // Update all course content to mark the active lecture
    const updatedContent = courseContent.map(section => {
      const updatedItems = section.items.map(item => {
        return {
          ...item,
          active: section.id === sectionId && item.id === itemId
        };
      });
      
      return {
        ...section,
        items: updatedItems,
        expanded: section.id === sectionId ? true : section.expanded
      };
    });
    
    // Find the selected lecture
    const selectedSection = updatedContent.find(section => section.id === sectionId);
    const selectedLecture = selectedSection.items.find(item => item.id === itemId);
    
    // Update state
    setCurrentLecture(selectedLecture);
    
    // Expand the section containing this lecture if it's not already expanded
    if (!expandedSections.includes(sectionId)) {
      setExpandedSections([...expandedSections, sectionId]);
    }
    
    // In a real app, you would load the appropriate video here
    // For this example, we're just updating the current lecture
    console.log(`Loading video for lecture: ${selectedLecture.title}`);
    
    // If this were a real application, you'd set the video URL here
    if (videoRef.current) {
      // In a real app, this would point to the actual video URL
      const videoId = `${selectedLecture.id}-video-id`;
      console.log(`Setting video source to: ${videoId}`);
      
      // Simulate changing the video
      if (videoRef.current.src) {
        // This is just for simulation - in a real app, you'd set the actual video source
        const currentSrc = videoRef.current.src;
        videoRef.current.src = currentSrc.split('?')[0] + `?lesson=${selectedLecture.id}&autoplay=1`;
      }
    }
  };

  const getItemIcon = (item) => {    if (item.completed) {      return <CheckCircleFilled className="text-green-500" />;    }    switch (item.type) {      case 'video':        return <PlayCircleOutlined />;      case 'quiz':        return <FormOutlined />;      case 'exercise':        return <FileTextOutlined />;      case 'assignment':        return <FormOutlined />;      case 'project':        return <ProjectOutlined />;      case 'article':        return <FileOutlined />;      default:        return <PlayCircleOutlined />;    }  };  // Function to find the current section  const getCurrentSection = () => {    if (!currentLecture) return null;        for (const section of courseContent) {      if (section.items.some(item => item.id === currentLecture.id)) {        return section;      }    }    return null;  };  // Current section  const currentSection = getCurrentSection();

  const renderCourseContent = () => {
    return (
      <div className="course-sidebar-content">
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <Title level={5} className="mb-0">Course Content</Title>
            <Button 
              type="text" 
              icon={searchVisible ? <UpOutlined /> : <SearchOutlined />} 
              onClick={() => setSearchVisible(!searchVisible)}
            />
          </div>
          
          {searchVisible && (
            <Input 
              placeholder="Search course content" 
              prefix={<SearchOutlined className="text-gray-400" />}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="mb-3"
            />
          )}

                    <div className="flex justify-between text-sm text-gray-600">            <span>{total} lectures • {courseContent.map(section => section.duration).join(' + ')} total length</span>            <span>{Math.round((completed / total) * 100)}% complete</span>          </div>
          <Progress percent={Math.round((completed / total) * 100)} size="small" />
        </div>

        {courseContent.map((section, sectionIndex) => (
          <Collapse 
            key={section.id} 
            defaultActiveKey={section.expanded ? [section.id] : []}
            ghost
            className="course-section-collapse"
          >
            <Panel 
              header={
                <div>
                  <Text strong>{section.title}</Text>
                  <div className="flex text-gray-500 text-xs">
                    <Text type="secondary">{section.items.length} lectures • {section.duration}</Text>
                  </div>
                </div>
              } 
              key={section.id}
            >
              {section.items.map((item, itemIndex) => (
                <div 
                  key={item.id}
                  className={`flex py-2 px-3 cursor-pointer hover:bg-gray-100 rounded ${item.active ? 'bg-blue-50' : ''}`}
                  onClick={() => handleChangeLecture(section.id, item.id)}
                >
                  <div className="mr-3 mt-1">
                    {getItemIcon(item)}
                  </div>
                  <div className="flex-grow">
                    <Text className={`block ${item.active ? 'text-blue-600 font-medium' : ''}`}>
                      {item.title}
                    </Text>
                    <div className="flex text-xs text-gray-500 mt-1">
                      <Text type="secondary">{item.type.charAt(0).toUpperCase() + item.type.slice(1)} • {item.duration}</Text>
                    </div>
                  </div>
                </div>
              ))}
            </Panel>
          </Collapse>
        ))}
      </div>
    );
  };

  const toggleSection = (sectionId) => {
    if (expandedSections.includes(sectionId)) {
      setExpandedSections(expandedSections.filter(id => id !== sectionId));
    } else {
      setExpandedSections([...expandedSections, sectionId]);
    }
  };

  const renderLessonNavigator = () => {
    return (
      <div className="lesson-navigator h-full overflow-auto bg-white">
        <div className="p-6 border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <Title level={5} className="mb-0 text-lg">Course content</Title>
          </div>
          
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{total} lectures • {courseContent.map(section => section.duration).join(' + ')} total length</span>
            <span>{Math.round((completed / total) * 100)}% complete</span>
          </div>
          <Progress percent={Math.round((completed / total) * 100)} size="small" strokeColor="#6f0fe0" />
        </div>

        <div className="course-sections bg-white">
          {courseContent.map((section) => (
            <div key={section.id} className="border-b border-gray-200">
              <div 
                className="px-6 py-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
                onClick={() => toggleSection(section.id)}
              >
                <div>
                  <Text strong className="text-base">{section.title}</Text>
                  <div className="text-xs text-gray-500 mt-1">
                    {section.items.filter(item => item.completed).length} / {section.items.length} lectures • {section.duration}
                  </div>
                </div>
                {expandedSections.includes(section.id) ? <UpOutlined /> : <DownOutlined />}
              </div>
              
              {expandedSections.includes(section.id) && (
                <div className="course-lectures bg-white">
                  {section.items.map((item, idx) => (
                    <div 
                      key={item.id}
                      className={`lecture-item flex items-start hover:bg-gray-50 cursor-pointer transition-colors ${item.active ? 'bg-blue-50 border-l-4 border-primary-600' : ''} ${idx !== section.items.length - 1 ? 'mb-3' : ''}`}
                      style={{ 
                        paddingTop: '20px', 
                        paddingBottom: '20px', 
                        paddingLeft: item.active ? '20px' : '24px', 
                        paddingRight: '24px' 
                      }}
                      onClick={() => handleChangeLecture(section.id, item.id)}
                    >
                      <Checkbox 
                        checked={item.completed}
                        className="mt-1 mr-4 flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Update the completion status of this item
                          const updatedContent = courseContent.map(s => {
                            if (s.id === section.id) {
                              const updatedItems = s.items.map(i => {
                                if (i.id === item.id) {
                                  return { ...i, completed: !i.completed };
                                }
                                return i;
                              });
                              return { ...s, items: updatedItems };
                            }
                            return s;
                          });
                          // In a real app, you would persist this change
                          console.log(`Marked ${item.title} as ${!item.completed ? 'completed' : 'incomplete'}`);
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between w-full">
                          <div className="flex items-start min-w-0">
                            <div className="mr-3 mt-1 text-lg flex-shrink-0">
                              {item.type === 'video' ? <PlayCircleOutlined className={item.active ? 'text-primary-600' : ''} /> : getItemIcon(item)}
                            </div>
                            <Text className={`${item.active ? 'text-primary-600 font-medium' : ''} break-words`} ellipsis={{ tooltip: item.title }}>
                              {item.title}
                            </Text>
                          </div>
                          <Text className="text-xs text-gray-500 whitespace-nowrap ml-3 mt-1 flex-shrink-0">
                            {item.duration}
                          </Text>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderVideoPlayer = () => {
    // In a real app, you'd have actual video URLs
    // For this example, we'll use a placeholder
    return (
      <div className="course-video-player relative mx-auto px-0 md:px-6">
        {/* Video Player */}
        <div className="aspect-w-16 aspect-h-9 bg-black mb-4" style={{ maxHeight: '70vh', height: '70vh' }}>
          <iframe 
            src={`https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&showinfo=0&autoplay=1&lesson=${currentLecture?.id || ''}`}
            title="Course Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
            ref={videoRef}
          ></iframe>
        </div>

        {/* Video Controls */}
        <div className="video-controls px-5 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center flex-wrap">
            <div className="flex space-x-4 mb-2 md:mb-0">
              <Button 
                type="primary" 
                icon={<CheckOutlined />}
                onClick={() => {
                  if (currentLecture) {
                    // Update the completion status of the current lecture
                    const updatedContent = courseContent.map(section => {
                      const updatedItems = section.items.map(item => {
                        if (item.id === currentLecture.id) {
                          return { ...item, completed: true };
                        }
                        return item;
                      });
                      return { ...section, items: updatedItems };
                    });
                    // In a real app, you would persist this change
                    console.log(`Marked ${currentLecture.title} as completed`);
                  }
                }}
                className="theme-button"
                style={{ backgroundColor: '#6f0fe0', borderColor: '#6f0fe0' }}
              >
                Mark as completed
              </Button>
              <Button 
                icon={<DownloadOutlined />} 
                className="theme-button"
                style={{ borderColor: '#d3c2fb', color: '#6f0fe0' }}
              >
                Resources
              </Button>
            </div>
            <div className="flex space-x-3 items-center">
              <Button 
                icon={<LeftOutlined />} 
                disabled={!currentLecture || currentLecture.id === courseContent[0].items[0].id}
                onClick={() => {
                  if (!currentLecture) return;
                  
                  // Find the previous lecture
                  let foundPrevious = false;
                  let previousSectionId = null;
                  let previousItemId = null;
                  
                  // Loop through sections in reverse to find the previous lecture
                  for (let i = courseContent.length - 1; i >= 0; i--) {
                    const section = courseContent[i];
                    for (let j = section.items.length - 1; j >= 0; j--) {
                      const item = section.items[j];
                      
                      if (foundPrevious) {
                        previousSectionId = section.id;
                        previousItemId = item.id;
                        break;
                      }
                      
                      if (item.id === currentLecture.id) {
                        // If this is not the first item in this section
                        if (j > 0) {
                          previousSectionId = section.id;
                          previousItemId = section.items[j - 1].id;
                          break;
                        }
                        // If this is the first item, we need to go to the previous section
                        foundPrevious = true;
                      }
                    }
                    
                    if (previousItemId) break;
                  }
                  
                  if (previousSectionId && previousItemId) {
                    handleChangeLecture(previousSectionId, previousItemId);
                  }
                }}
                className="theme-button"
                style={{ borderColor: '#d3c2fb', color: '#6f0fe0' }}
              >
                Previous
              </Button>
              <Button 
                type="primary" 
                className="theme-button flex items-center"
                onClick={() => {
                  if (!currentLecture) return;
                  
                  // Find the next lecture
                  let foundCurrent = false;
                  
                  // Loop through sections to find the next lecture
                  for (const section of courseContent) {
                    for (let j = 0; j < section.items.length; j++) {
                      const item = section.items[j];
                      
                      if (foundCurrent) {
                        handleChangeLecture(section.id, item.id);
                        return;
                      }
                      
                      if (item.id === currentLecture.id) {
                        // If this is not the last item in this section
                        if (j < section.items.length - 1) {
                          handleChangeLecture(section.id, section.items[j + 1].id);
                          return;
                        }
                        // If this is the last item, we need to go to the next section
                        foundCurrent = true;
                      }
                    }
                  }
                }}
                style={{ backgroundColor: '#6f0fe0', borderColor: '#6f0fe0' }}
              >
                <span>Next</span>
                <RightOutlined className="ml-1" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile lesson selector */}
        <div className="md:hidden px-4 pt-3">
          <div className="flex items-center mb-3">
            <Text strong className="mr-2">Current lecture:</Text>
            <Select
              className="flex-grow"
              placeholder="Select a lecture"
              value={currentLecture?.id}
              onChange={(value) => {
                const [sectionId, lectureId] = value.split('|');
                handleChangeLecture(sectionId, lectureId);
              }}
            >
              {courseContent.map(section => (
                <Select.OptGroup key={section.id} label={section.title}>
                  {section.items.map(item => (
                    <Select.Option key={item.id} value={`${section.id}|${item.id}`}>
                      {item.title} ({item.duration})
                    </Select.Option>
                  ))}
                </Select.OptGroup>
              ))}
            </Select>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 py-6">
          <Tabs 
            activeKey={activeTab} 
            onChange={setActiveTab}
            className="course-player-tabs"
            animated={{ inkBar: true, tabPane: true }}
          >
            <TabPane tab="Overview" key="overview">
              <Title level={2}>{currentLecture?.title}</Title>
              <Paragraph className="mt-4">
                This lecture provides an in-depth explanation of {currentLecture?.title}. You'll learn
                how to apply these concepts in real-world scenarios and gain practical skills that will
                help you in your AI journey.
              </Paragraph>

              <Divider />

              <Title level={4}>Lecture Description</Title>
              <Paragraph>
                In this lecture, we cover:
                <ul className="list-disc pl-5 mt-2">
                  <li>Introduction to key concepts and terminology</li>
                  <li>Practical applications and use cases</li>
                  <li>Step-by-step implementation guide</li>
                  <li>Best practices and common pitfalls to avoid</li>
                </ul>
              </Paragraph>

              <Divider />

              <Title level={4}>Additional Resources</Title>
              <div className="space-y-3">
                <div className="flex items-center p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                  <FileTextOutlined className="text-primary-500 text-xl mr-3" />
                  <div>
                    <Text strong className="block">Lecture Slides.pdf</Text>
                    <Text type="secondary" className="text-sm">PDF, 2.4 MB</Text>
                  </div>
                </div>
                <div className="flex items-center p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                  <FileTextOutlined className="text-primary-500 text-xl mr-3" />
                  <div>
                    <Text strong className="block">Code Examples.zip</Text>
                    <Text type="secondary" className="text-sm">ZIP, 1.8 MB</Text>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Notes" key="notes">
              <div className="flex justify-between items-start mb-4">
                <Title level={4} className="mb-0">Your Notes</Title>
                <Button 
                  type="primary"
                  className="theme-button"
                  style={{ backgroundColor: '#6f0fe0', borderColor: '#6f0fe0' }}
                >
                  Add Note
                </Button>
              </div>
              <Paragraph type="secondary" className="text-center my-6">
                You haven't taken any notes yet. Add a note to help remember key concepts from this lecture.
              </Paragraph>
            </TabPane>
            <TabPane tab="Q&A" key="qa">
              <div className="flex justify-between items-start mb-4">
                <Title level={4} className="mb-0">Questions & Answers</Title>
                <Button 
                  type="primary" 
                  icon={<QuestionCircleOutlined />}
                  className="theme-button"
                  style={{ backgroundColor: '#6f0fe0', borderColor: '#6f0fe0' }}
                >
                  Ask a Question
                </Button>
              </div>
              
              <Input.Search
                placeholder="Search questions"
                className="mb-4"
              />
              
              <Card className="mb-3">
                <div className="flex justify-between items-start">
                  <div className="flex">
                    <Avatar src="/public/mockups/mock1.jpg" className="mr-3" />
                    <div>
                      <Text strong>Student Name</Text>
                      <Text type="secondary" className="block text-sm">Posted 3 weeks ago</Text>
                      <Title level={5} className="mt-2">How do I implement this in PyTorch?</Title>
                      <Paragraph>
                        I'm trying to implement the neural network from this lecture in PyTorch but 
                        I'm running into issues with the backward pass. Can someone help?
                      </Paragraph>
                    </div>
                  </div>
                  <div>
                    <Badge count={2} className="mr-2" />
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="flex justify-between items-start">
                  <div className="flex">
                    <Avatar src="/public/mockups/mock2.jpg" className="mr-3" />
                    <div>
                      <Text strong>Another Student</Text>
                      <Text type="secondary" className="block text-sm">Posted 1 month ago</Text>
                      <Title level={5} className="mt-2">Error when running the example code</Title>
                      <Paragraph>
                        I keep getting a "module not found" error when trying to run the example code.
                        Has anyone else encountered this issue?
                      </Paragraph>
                    </div>
                  </div>
                  <div>
                    <Badge count={5} className="mr-2" />
                  </div>
                </div>
              </Card>
            </TabPane>
            <TabPane tab="Announcements" key="announcements">
              <Title level={4}>Course Announcements</Title>
              
              <Card className="mb-3">
                <div className="flex">
                  <Avatar src={course?.instructor?.avatar || "/public/mockups/mock4.jpg"} className="mr-3" />
                  <div>
                    <div className="flex justify-between items-center">
                      <Text strong>{course?.instructor?.name || "Instructor"}</Text>
                      <Text type="secondary">2 weeks ago</Text>
                    </div>
                    <Title level={5} className="mt-2">New Bonus Lecture Added!</Title>
                    <Paragraph>
                      Hi everyone! I've just added a new bonus lecture on the latest developments in 
                      transformer models. Make sure to check it out in Section 3.
                    </Paragraph>
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="flex">
                  <Avatar src={course?.instructor?.avatar || "/public/mockups/mock5.jpg"} className="mr-3" />
                  <div>
                    <div className="flex justify-between items-center">
                      <Text strong>{course?.instructor?.name || "Instructor"}</Text>
                      <Text type="secondary">1 month ago</Text>
                    </div>
                    <Title level={5} className="mt-2">Course Updated with New Content</Title>
                    <Paragraph>
                      I've updated Section 4 with the latest techniques and examples. The course now
                      includes content on the most recent AI developments.
                    </Paragraph>
                  </div>
                </div>
              </Card>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  };

  // If the course doesn't exist or is loading, show loading state
  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center" style={{ height: 'calc(100vh - 200px)' }}>
          <div className="text-center">
            <Title level={3}>Loading course...</Title>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!course) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center" style={{ height: 'calc(100vh - 200px)' }}>
          <div className="text-center">
            <Title level={3}>Course not found</Title>
            <Button 
              type="primary" 
              onClick={() => navigate('/courses')}
              className="theme-button mt-4"
              style={{ backgroundColor: '#6f0fe0', borderColor: '#6f0fe0' }}
            >
              Browse Courses
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Apply custom styles */}
      <style>{customStyles}</style>
      
      {/* Course Content */}
      <Layout className="course-player-layout">
        {/* Mobile drawer for course content */}
        <Drawer
          title="Course Content"
          placement="right"
          onClose={() => setMobileMenuVisible(false)}
          open={mobileMenuVisible}
          width={320}
          bodyStyle={{ padding: 0 }}
        >
          {renderLessonNavigator()}
        </Drawer>
        
        {/* Main content area with video and info */}
        <div className="flex flex-col md:flex-row w-full">
          {/* Main content area for video and tabs */}
          <Content className="bg-white overflow-auto flex-1" style={{ maxHeight: 'calc(100vh - 135px)' }}>
            {renderVideoPlayer()}
          </Content>

          {/* Right sidebar for lesson navigation (desktop and tablets) */}
          <Sider
            width={320}
            collapsible
            collapsed={!rightSidebarVisible}
            trigger={null}
            collapsedWidth={0}
            className="bg-white border-l border-gray-200 hidden md:block"
            style={{ height: 'calc(100vh - 135px)' }}
          >
            {renderLessonNavigator()}
          </Sider>
        </div>
        
        {/* Toggle sidebar button (visible on desktop) */}
        <Button 
          type="default"
          icon={!rightSidebarVisible ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setRightSidebarVisible(!rightSidebarVisible)}
          className="fixed right-5 bottom-5 z-50 theme-button hidden md:flex"
          style={{ 
            backgroundColor: '#6f0fe0', 
            color: 'white', 
            borderColor: '#6f0fe0',
            width: '48px', 
            height: '48px', 
            borderRadius: '50%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          title={rightSidebarVisible ? "Hide course content" : "Show course content"}
        />
        
        {/* Mobile menu button */}
        <Button 
          type="default"
          icon={<MenuOutlined />}
          onClick={() => setMobileMenuVisible(true)}
          className="fixed right-5 bottom-5 z-50 theme-button md:hidden flex"
          style={{ 
            backgroundColor: '#6f0fe0', 
            color: 'white', 
            borderColor: '#6f0fe0',
            width: '48px', 
            height: '48px', 
            borderRadius: '50%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        />
      </Layout>
    </MainLayout>
  );
};

export default CoursePlayer; 