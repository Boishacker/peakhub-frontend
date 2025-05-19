import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Typography, 
  Breadcrumb, 
  Row, 
  Col, 
  Card, 
  Select, 
  Input, 
  Checkbox, 
  Rate, 
  Slider, 
  Tag, 
  Pagination,
  Divider,
  Space,
  Button
} from 'antd';
import { 
  SearchOutlined, 
  FilterOutlined, 
  SortAscendingOutlined, 
  BulbOutlined, 
  PictureOutlined, 
  SoundOutlined, 
  CodeOutlined, 
  ShopOutlined, 
  BookOutlined,
  FieldTimeOutlined,
  StarOutlined,
  FireOutlined,
  UserOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';

import MainLayout from '../../components/layout/MainLayout';
import CourseCard from '../../components/common/molecules/CourseCard';
import { aiCategories } from '../../data/courses';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { Search } = Input;

const CourseList = () => {
  const { category } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [sortOption, setSortOption] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  // Get the category label based on the key
  const getCategoryLabel = (key: string) => {
    const foundCategory = aiCategories.find(cat => cat.key === key);
    return foundCategory ? foundCategory.label : 'All Courses';
  };

  // Get the icon for the category
  const getCategoryIcon = (key: string) => {
    switch (key) {
      case 'generative-ai':
        return <BulbOutlined />;
      case 'ai-images':
        return <PictureOutlined />;
      case 'ai-music':
        return <SoundOutlined />;
      case 'ai-code':
        return <CodeOutlined />;
      case 'ai-business':
        return <ShopOutlined />;
      case 'ai-research':
        return <BookOutlined />;
      default:
        return <BulbOutlined />;
    }
  };

  // Load courses based on the category
  useEffect(() => {
    if (category && category !== 'all') {
      const foundCategory = aiCategories.find(cat => cat.key === category);
      if (foundCategory) {
        setCourses(foundCategory.courses);
        setFilteredCourses(foundCategory.courses);
        setSelectedCategory(category);
      }
    } else {
      // Load all courses when no category is selected or 'all' is selected
      const allCourses = aiCategories.flatMap(category => category.courses);
      setCourses(allCourses);
      setFilteredCourses(allCourses);
      setSelectedCategory('all');
    }
  }, [category]);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...courses];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply price range filter
    filtered = filtered.filter(course => {
      const coursePrice = course.discountPrice || course.price;
      return coursePrice >= priceRange[0] && coursePrice <= priceRange[1];
    });

    // Apply rating filter
    if (selectedRating) {
      filtered = filtered.filter(course => course.rating >= selectedRating);
    }

    // Apply level filter
    if (selectedLevels.length > 0) {
      filtered = filtered.filter(course => selectedLevels.includes(course.level));
    }

    // Apply sorting
    switch (sortOption) {
      case 'price-low':
        filtered.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // For demo purposes, we'll just shuffle
        filtered.sort(() => Math.random() - 0.5);
        break;
      case 'popular':
      default:
        // For demo purposes, sort by rating and review count
        filtered.sort((a, b) => (b.rating * b.ratingCount) - (a.rating * a.ratingCount));
        break;
    }

    setFilteredCourses(filtered);
    setCurrentPage(1);
  }, [courses, searchQuery, priceRange, selectedRating, selectedLevels, sortOption]);

  // Handle level checkbox changes
  const handleLevelChange = (level: string) => {
    setSelectedLevels(prevLevels => {
      if (prevLevels.includes(level)) {
        return prevLevels.filter(l => l !== level);
      } else {
        return [...prevLevels, level];
      }
    });
  };

  // Handle rating filter change
  const handleRatingChange = (rating: number) => {
    setSelectedRating(prevRating => (prevRating === rating ? null : rating));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Get current courses for pagination
  const getCurrentCourses = () => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredCourses.slice(startIndex, startIndex + pageSize);
  };

  return (
    <MainLayout>
      {/* Breadcrumb navigation */}
      <div className="bg-gray-50 py-4">
        <div className="content-container">
          <Breadcrumb 
            items={[
              { title: <Link to="/">Home</Link> },
              { title: <Link to="/courses">Courses</Link> },
              { title: getCategoryLabel(selectedCategory) }
            ]}
          />
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="content-container py-8">
          <div className="flex items-center mb-2">
            <span className="mr-3 text-2xl text-primary-500">
              {getCategoryIcon(selectedCategory)}
            </span>
            <Title level={2} className="!mb-0">
              {getCategoryLabel(selectedCategory)} Courses
            </Title>
          </div>
          <Paragraph className="text-gray-600 text-lg max-w-3xl">
            {selectedCategory === 'all' 
              ? 'Explore our comprehensive library of AI courses to enhance your skills and advance your career.' 
              : `Master the latest ${getCategoryLabel(selectedCategory)} skills with our expert-led courses.`
            }
          </Paragraph>
          <div className="mt-4 flex items-center">
            <Text className="font-semibold mr-2">{filteredCourses.length} courses available</Text>
            <Tag color="purple" className="ml-2">
              <FireOutlined className="mr-1" /> Hot & In-Demand
            </Tag>
          </div>
        </div>
      </div>

      <div className="content-container py-8">
        <Row gutter={[24, 16]}>
          {/* Filters Sidebar */}
          <Col xs={24} md={6} className="mb-6">
            <Card 
              className="sticky top-4 filter-sidebar-card"
              style={{
                background: 'linear-gradient(135deg, #f8f6ff 0%, #f3f4fa 100%)',
                borderRadius: 18,
                boxShadow: '0 4px 24px 0 rgba(111, 15, 224, 0.07)',
                border: 'none',
                padding: 0,
                minHeight: 420
              }}
            >
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <Title level={4} className="!mb-0">Filters</Title>
                  <Button type="link" onClick={() => {
                    setSearchQuery('');
                    setPriceRange([0, 200]);
                    setSelectedRating(null);
                    setSelectedLevels([]);
                  }}>
                    Clear All
                  </Button>
                </div>
                <Search
                  placeholder="Search in courses"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mb-4 filter-search-input"
                />
              </div>

              <Divider className="my-4" />

              {/* Price Range Filter */}
              <div className="mb-5 filter-section">
                <Title level={5} className="filter-section-title">Price Range</Title>
                <Slider
                  range
                  min={0}
                  max={200}
                  value={priceRange}
                  onChange={(value: [number, number]) => setPriceRange(value)}
                  tipFormatter={(value) => `$${value}`}
                  className="mb-2 filter-slider"
                />
                <div className="flex justify-between">
                  <Text>${priceRange[0]}</Text>
                  <Text>${priceRange[1]}</Text>
                </div>
              </div>

              <Divider className="my-4" />

              {/* Rating Filter */}
              <div className="mb-5 filter-section">
                <Title level={5} className="filter-section-title">Rating</Title>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map(rating => (
                    <div 
                      key={rating} 
                      className={`p-2 rounded-lg cursor-pointer flex items-center filter-rating-item ${selectedRating === rating ? 'bg-[#ede9fe] border border-[#6f0fe0]' : 'hover:bg-[#f3f0fa]'}`}
                      onClick={() => handleRatingChange(rating)}
                      style={{ transition: 'all 0.2s' }}
                    >
                      <Rate disabled defaultValue={rating} className="text-sm mr-2" />
                      <Text className="ml-2">& up</Text>
                    </div>
                  ))}
                </div>
              </div>

              <Divider className="my-4" />

              {/* Level Filter */}
              <div className="mb-5 filter-section">
                <Title level={5} className="filter-section-title">Course Level</Title>
                <div className="space-y-2">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="filter-level-item">
                    <Checkbox
                      checked={selectedLevels.includes('beginner')}
                      onChange={() => handleLevelChange('beginner')}
                    />
                    <span>Beginner</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="filter-level-item">
                    <Checkbox
                      checked={selectedLevels.includes('intermediate')}
                      onChange={() => handleLevelChange('intermediate')}
                    />
                    <span>Intermediate</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="filter-level-item">
                    <Checkbox
                      checked={selectedLevels.includes('advanced')}
                      onChange={() => handleLevelChange('advanced')}
                    />
                    <span>Advanced</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="filter-level-item">
                    <Checkbox
                      checked={selectedLevels.includes('all-levels')}
                      onChange={() => handleLevelChange('all-levels')}
                    />
                    <span>All Levels</span>
                  </div>
                </div>
              </div>
            </Card>
          </Col>

          {/* Course List */}
          <Col xs={24} md={18}>
            {/* Sorting and View Options */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <Text className="mr-2">Sort By:</Text>
                <Select 
                  value={sortOption} 
                  onChange={setSortOption}
                  style={{ width: 160 }}
                >
                  <Option value="popular">Most Popular</Option>
                  <Option value="rating">Highest Rated</Option>
                  <Option value="newest">Newest</Option>
                  <Option value="price-low">Price: Low to High</Option>
                  <Option value="price-high">Price: High to Low</Option>
                </Select>
              </div>
              <Text>
                Showing {(currentPage - 1) * pageSize + 1}-
                {Math.min(currentPage * pageSize, filteredCourses.length)} of {filteredCourses.length} courses
              </Text>
            </div>

            {/* Course Grid */}
            {filteredCourses.length > 0 ? (
              <>
                <Row gutter={[16, 24]}>
                  {getCurrentCourses().map((course) => (
                    <Col key={course.id} xs={24} sm={12} lg={8} xl={8}>
                      <CourseCard {...course} />
                    </Col>
                  ))}
                </Row>

                {/* Pagination */}
                <div className="mt-10 flex justify-center">
                  <Pagination
                    current={currentPage}
                    total={filteredCourses.length}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    itemRender={(page, type, originalElement) => {
                      if (type === 'prev') {
                        return <Button type="default" icon={<LeftOutlined />} />;
                      }
                      if (type === 'next') {
                        return <Button type="default" icon={<RightOutlined />} />;
                      }
                      return originalElement;
                    }}
                  />
                </div>
              </>
            ) : (
              <div className="bg-gray-50 p-8 text-center rounded-lg">
                <Title level={4}>No courses found</Title>
                <Paragraph>
                  Try adjusting your search filters or browse our <Link to="/courses">full catalog</Link>.
                </Paragraph>
              </div>
            )}
          </Col>
        </Row>
      </div>

      {/* Custom styles for filter sidebar */}
      <style>{`
        .filter-sidebar-card {
          transition: box-shadow 0.3s;
        }
        .filter-sidebar-card:hover, .filter-sidebar-card:focus-within {
          box-shadow: 0 8px 32px 0 rgba(111, 15, 224, 0.13);
        }
        .filter-section-title {
          color: #6f0fe0 !important;
          font-weight: 600;
        }
        .filter-rating-item {
          transition: background 0.2s, border 0.2s;
        }
        .filter-rating-item:hover {
          background: #ede9fe !important;
        }
        .filter-level-item span {
          font-weight: 500;
          color: #3b256b;
        }
        .filter-search-input input {
          border-radius: 8px !important;
          background: #f3f0fa !important;
        }
        .filter-slider .ant-slider-track {
          background: #6f0fe0 !important;
        }
        .filter-slider .ant-slider-handle {
          border-color: #6f0fe0 !important;
        }
      `}</style>
    </MainLayout>
  );
};

export default CourseList; 