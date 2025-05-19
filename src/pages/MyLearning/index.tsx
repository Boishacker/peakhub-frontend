import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Typography, 
  Tabs, 
  Empty, 
  Card, 
  Button, 
  Rate, 
  Progress, 
  Tag, 
  Row, 
  Col,
  Input,
  Select,
  Dropdown,
  Menu,
  Badge
} from 'antd';
import { 
  BookOutlined, 
  HeartOutlined, 
  UnorderedListOutlined, 
  SearchOutlined, 
  FilterOutlined,
  SortAscendingOutlined,
  EllipsisOutlined,
  PlayCircleOutlined,
  StarOutlined,
  StarFilled,
  HeartFilled,
  CheckCircleFilled
} from '@ant-design/icons';
import MainLayout from '../../components/layout/MainLayout';
import { useAuth } from '../../contexts/AuthContext';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { Search } = Input;

// Custom styles for UI elements
const customStyles = `
  /* Tab styling */
  .learning-tabs .ant-tabs-tab:hover .ant-tabs-tab-btn {
    color: #6f0fe0 !important;
    transform: translateY(-2px);
  }
  
  .learning-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #6f0fe0 !important;
    font-weight: 600 !important;
  }
  
  .learning-tabs .ant-tabs-ink-bar {
    background-color: #6f0fe0 !important;
    height: 3px !important;
    border-radius: 3px !important;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
  }
  
  .learning-tabs .ant-tabs-tab {
    transition: all 0.3s ease;
    padding: 12px 16px !important;
  }
  
  .learning-tabs .ant-tabs-content {
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
  
  /* Course card styling */
  .course-card {
    transition: all 0.3s ease;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #e2e8f0;
  }
  
  .course-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(111, 15, 224, 0.1);
  }
  
  /* Collection card styling */
  .collection-card {
    transition: all 0.3s ease;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .collection-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(111, 15, 224, 0.1);
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
  
  /* Theme progress bar */
  .theme-progress .ant-progress-bg {
    background-color: #6f0fe0 !important;
  }
`;

// Sample mock data for courses
const MOCK_COURSES = [
  {
    id: 1,
    title: 'Complete AI & Machine Learning Bootcamp 2023',
    instructor: 'Dr. Alex Johnson',
    thumbnail: 'mockups/mock1.jpg',
    progress: 35,
    lastAccessed: '2023-05-12T10:45:00Z',
    rating: 4.8,
    category: 'AI',
    completed: false
  },
  {
    id: 2,
    title: 'Advanced Deep Learning with TensorFlow 2.0',
    instructor: 'Sarah Williams, PhD',
    thumbnail: 'mockups/mock2.jpg',
    progress: 68,
    lastAccessed: '2023-05-15T08:30:00Z',
    rating: 4.7,
    category: 'Deep Learning',
    completed: false
  },
  {
    id: 3,
    title: 'Natural Language Processing from Scratch',
    instructor: 'Michael Chen',
    thumbnail: 'mockups/mock10.jpg',
    progress: 100,
    lastAccessed: '2023-05-01T14:20:00Z',
    rating: 4.9,
    category: 'NLP',
    completed: true
  },
];

// Sample wishlist courses
const WISHLIST_COURSES = [
  {
    id: 4,
    title: 'Computer Vision with OpenCV and Python',
    instructor: 'David Miller',
    thumbnail: 'mockups/mock8.jpg',
    rating: 4.6,
    price: 89.99,
    discountPrice: 14.99,
    category: 'Computer Vision'
  },
  {
    id: 5,
    title: 'Reinforcement Learning: The Complete Guide',
    instructor: 'Jennifer Adams',
    thumbnail: 'mockups/mock5.jpg',
    rating: 4.5,
    price: 94.99,
    discountPrice: 19.99,
    category: 'Reinforcement Learning'
  }
];

// Sample collections (playlists)
const COLLECTIONS = [
  {
    id: 1,
    name: 'AI Fundamentals',
    courses: [MOCK_COURSES[0], MOCK_COURSES[1]],
    courseCount: 2
  },
  {
    id: 2,
    name: 'Advanced Topics',
    courses: [MOCK_COURSES[2]],
    courseCount: 1
  }
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

const CourseCard = ({ course, inWishlist = false }: { course: any, inWishlist?: boolean }) => {
  // Fix for thumbnail path - ensure it has the correct path format
  const thumbnailSrc = course.thumbnail.startsWith('/') 
    ? course.thumbnail 
    : `/${course.thumbnail}`;
    
  // Fallback image in case the primary one fails to load
  const handleImageError = (e: any) => {
    e.currentTarget.src = '/mockups/mock1.jpg'; // Fallback to a known working image
    console.log(`Image load error for: ${thumbnailSrc}, falling back to default`);
  };

  return (
    <Card 
      hoverable 
      className="mb-4 course-card"
      bodyStyle={{ padding: 0 }}
      style={{ minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      <div className="flex flex-col md:flex-row h-full" style={{ minHeight: 180 }}>
        <div className="w-full md:w-60 md:min-w-60 relative flex items-center justify-center" style={{ minHeight: 180, maxHeight: 180 }}>
          <img 
            src={thumbnailSrc} 
            alt={course.title} 
            className="object-cover rounded-l-lg"
            style={{ width: '100%', height: '180px', objectFit: 'cover' }}
            onError={handleImageError}
          />
          {!inWishlist && (
            <div 
              className="absolute bottom-2 left-2 bg-gray-900 bg-opacity-80 text-white text-xs px-2 py-1 rounded"
              style={{ 
                backgroundColor: course.progress === 100 ? 'rgba(111, 15, 224, 0.8)' : 'rgba(0, 0, 0, 0.8)' 
              }}
            >
              {course.progress < 100 ? `${course.progress}% complete` : 'Completed'}
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col justify-between flex-1 h-full" style={{ minHeight: 180 }}>
          <div className="flex flex-col flex-1 justify-between h-full">
            <div>
              <Title level={5} className="mb-1">
                {course.title}
              </Title>
              <Text type="secondary" className="block mb-2">
                {course.instructor}
              </Text>
              {!inWishlist && (
                <>
                  <Text type="secondary" className="block mb-2 text-xs">
                    Last accessed: {formatDate(course.lastAccessed)}
                  </Text>
                  <Progress 
                    percent={course.progress} 
                    size="small" 
                    status={course.progress === 100 ? "success" : "active"} 
                    className="w-full max-w-md theme-progress"
                    strokeColor="#6f0fe0"
                  />
                </>
              )}
              {inWishlist && (
                <div className="mt-2">
                  <Rate disabled defaultValue={course.rating} className="text-sm text-primary-400" />
                  <div className="mt-2">
                    <Text delete className="text-gray-500 mr-2">${course.price}</Text>
                    <Text strong className="text-lg text-primary-600" style={{ color: '#6f0fe0' }}>${course.discountPrice}</Text>
                  </div>
                </div>
              )}
              <div className="mt-3">
                <Tag color="#6f0fe0" style={{ borderRadius: '12px' }}>{course.category}</Tag>
                {course.completed && (
                  <Tag color="success" style={{ borderRadius: '12px', backgroundColor: '#6f0fe0', color: 'white' }}>
                    <CheckCircleFilled /> Completed
                  </Tag>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div>
                <Dropdown overlay={
                  <Menu>
                    <Menu.Item key="1" icon={<PlayCircleOutlined />}>
                      <Link to={`/course/${course.id}`}>Go to Course</Link>
                    </Menu.Item>
                    {!inWishlist && (
                      <>
                        <Menu.Item key="2" icon={<StarOutlined />}>
                          Add Review
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UnorderedListOutlined />}>
                          Add to Collection
                        </Menu.Item>
                        <Menu.Item key="4" icon={<HeartOutlined />}>
                          Add to Wishlist
                        </Menu.Item>
                      </>
                    )}
                    {inWishlist && (
                      <>
                        <Menu.Item key="2" icon={<HeartFilled />}>
                          Remove from Wishlist
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UnorderedListOutlined />}>
                          Add to Collection
                        </Menu.Item>
                      </>
                    )}
                  </Menu>
                } trigger={['click']}>
                  <Button 
                    type="text" 
                    icon={<EllipsisOutlined />} 
                    className="hover:text-primary-500"
                  />
                </Dropdown>
              </div>
              <div>
                {inWishlist ? (
                  <Button 
                    type="primary" 
                    className="theme-button"
                    style={{ backgroundColor: '#6f0fe0', borderColor: '#6f0fe0', minWidth: 140 }}
                  >
                    Add to Cart
                  </Button>
                ) : (
                  <Button 
                    type="primary" 
                    icon={<PlayCircleOutlined />} 
                    className="theme-button"
                    style={{ backgroundColor: '#6f0fe0', borderColor: '#6f0fe0', minWidth: 140 }}
                  >
                    <Link to={`/course/${course.id}`} style={{ color: 'white' }}>Continue Learning</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const CollectionCard = ({ collection }: { collection: any }) => {
  // Fix for thumbnail paths in collections
  const getFixedThumbnailPath = (path: string) => {
    return path.startsWith('/') ? path : `/${path}`;
  };
  
  // Fallback image handler
  const handleImageError = (e: any) => {
    e.currentTarget.src = '/mockups/mock1.jpg';
  };

  // Always show 2x2 grid (4 slots)
  const gridCourses = [...collection.courses];
  while (gridCourses.length < 4) gridCourses.push(null);

  return (
    <Card
      hoverable
      className="mb-4 collection-card"
      style={{ aspectRatio: '1 / 1', minWidth: 220, maxWidth: 320, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', boxShadow: '0 2px 8px rgba(111,15,224,0.06)' }}
      bodyStyle={{ padding: 0, display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'flex-end' }}
      cover={
        <div className="grid grid-cols-2 grid-rows-2 gap-1 p-2" style={{ width: '100%', height: '180px', aspectRatio: '1 / 1', borderRadius: '12px 12px 0 0', overflow: 'hidden', background: '#f5f5fa' }}>
          {gridCourses.map((course: any, index: number) => (
            <div key={index} className="overflow-hidden flex items-center justify-center w-full h-full" style={{ background: '#eaeaea', borderRadius: 6 }}>
              {course ? (
                <img 
                  src={getFixedThumbnailPath(course.thumbnail)} 
                  alt={course.title} 
                  className="object-cover w-full h-full"
                  style={{ aspectRatio: '1 / 1', maxHeight: '100%', maxWidth: '100%', borderRadius: 6 }}
                  onError={handleImageError}
                />
              ) : null}
            </div>
          ))}
        </div>
      }
    >
      <div style={{ textAlign: 'center', padding: '16px 8px 8px 8px' }}>
        <Title level={5} style={{ marginBottom: 0 }}>{collection.name}</Title>
        <Text type="secondary">{collection.courseCount} courses</Text>
        <div className="mt-2">
          <Button 
            type="primary" 
            block 
            className="theme-button"
            style={{ backgroundColor: '#6f0fe0', borderColor: '#6f0fe0', marginTop: 8 }}
          >
            View Collection
          </Button>
        </div>
      </div>
    </Card>
  );
};

const MyLearningPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all-courses');
  const [courses, setCourses] = useState(MOCK_COURSES);
  const [wishlist, setWishlist] = useState(WISHLIST_COURSES);
  const [collections, setCollections] = useState(COLLECTIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortOption, setSortOption] = useState('recent');

  // Filter and sort courses
  const filteredCourses = courses.filter(course => {
    // Search filter
    if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    // Category filter
    if (filterCategory !== 'all' && course.category !== filterCategory) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    // Sort options
    switch (sortOption) {
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      case 'recent':
      default:
        return new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime();
    }
  });

  return (
    <MainLayout>
      {/* Apply custom styles */}
      <style>{customStyles}</style>
      
      <div className="bg-gray-50 py-8">
        <div className="content-container">
          <div className="mb-6">
            <Title level={2}>My Learning</Title>
            <Text type="secondary">Track your learning progress and access your courses</Text>
          </div>

          <Tabs 
            activeKey={activeTab} 
            onChange={setActiveTab} 
            className="learning-tabs"
            animated={{ inkBar: true, tabPane: true }}
          >
            <TabPane 
              tab={
                <span className="flex items-center">
                  <BookOutlined className="mr-2" />
                  All Courses
                </span>
              } 
              key="all-courses"
            >
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <Search
                    placeholder="Search my courses"
                    allowClear
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: 250 }}
                    className="search-input"
                  />
                  
                  <div className="flex items-center space-x-4">
                    <Select
                      placeholder="Filter by category"
                      style={{ width: 180 }}
                      onChange={(value) => setFilterCategory(value)}
                      defaultValue="all"
                      className="filter-select"
                    >
                      <Option value="all">All Categories</Option>
                      <Option value="AI">AI</Option>
                      <Option value="Deep Learning">Deep Learning</Option>
                      <Option value="NLP">NLP</Option>
                    </Select>
                    
                    <Select
                      placeholder="Sort by"
                      style={{ width: 180 }}
                      onChange={(value) => setSortOption(value)}
                      defaultValue="recent"
                      className="sort-select"
                    >
                      <Option value="recent">Most Recent</Option>
                      <Option value="title-asc">Title A-Z</Option>
                      <Option value="title-desc">Title Z-A</Option>
                    </Select>
                  </div>
                </div>

                {filteredCourses.length > 0 ? (
                  <div>
                    {filteredCourses.map(course => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                ) : (
                  <Empty 
                    description={
                      <span>
                        No courses found. Try adjusting your search or filters.
                      </span>
                    }
                  />
                )}
              </div>
            </TabPane>
            
            <TabPane 
              tab={
                <span className="flex items-center">
                  <UnorderedListOutlined className="mr-2" />
                  My Lists
                </span>
              } 
              key="collections"
            >
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <div className="flex items-center justify-between mb-6">
                  <Title level={4} className="m-0">Your Collections</Title>
                  <Button 
                    type="primary" 
                    className="theme-button"
                    style={{ backgroundColor: '#6f0fe0', borderColor: '#6f0fe0' }}
                  >
                    Create New Collection
                  </Button>
                </div>

                {collections.length > 0 ? (
                  <Row gutter={24}>
                    {collections.map(collection => (
                      <Col key={collection.id} xs={24} sm={12} md={8} lg={6}>
                        <CollectionCard collection={collection} />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <Empty
                    description={
                      <span>
                        You haven't created any collections yet. Collections help you organize your courses.
                      </span>
                    }
                  />
                )}
              </div>
            </TabPane>
            
            <TabPane 
              tab={
                <span className="flex items-center">
                  <HeartOutlined className="mr-2" />
                  Wishlist
                </span>
              } 
              key="wishlist"
            >
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <div className="flex items-center justify-between mb-6">
                  <Title level={4} className="m-0">Your Wishlist</Title>
                </div>

                {wishlist.length > 0 ? (
                  <div>
                    {wishlist.map(course => (
                      <CourseCard key={course.id} course={course} inWishlist={true} />
                    ))}
                  </div>
                ) : (
                  <Empty
                    description={
                      <span>
                        Your wishlist is empty. Add courses you're interested in purchasing later.
                      </span>
                    }
                  />
                )}
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default MyLearningPage; 