import React, { useState, useMemo } from 'react';
import { Typography, Table, Input, Tag, Button, Space, Select, Card, Row, Col, Statistic, Badge, Tooltip, Modal, Rate, Divider } from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
  EditOutlined,
  StopOutlined,
  CheckCircleOutlined,
  DollarOutlined,
  UserOutlined,
  BookOutlined,
  StarOutlined,
  BarChartOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

// Mock data for courses
const mockCourses = [
  {
    id: '1',
    title: 'Complete React Developer Course',
    instructor: 'Jane Instructor',
    category: 'Web Development',
    price: 89.99,
    rating: 4.8,
    totalStudents: 1250,
    totalRevenue: 112437.5,
    status: 'published',
    lastUpdated: '2024-03-15',
    thumbnail: '/public/mockups/mock1.jpg',
    completionRate: 85,
    totalLessons: 125,
    totalHours: 32.5,
  },
  {
    id: '2',
    title: 'Machine Learning A-Z',
    instructor: 'Alex Teacher',
    category: 'Data Science',
    price: 129.99,
    rating: 4.9,
    totalStudents: 980,
    totalRevenue: 127390.2,
    status: 'published',
    lastUpdated: '2024-03-10',
    thumbnail: '/public/mockups/mock2.jpg',
    completionRate: 78,
    totalLessons: 185,
    totalHours: 45.5,
  },
  {
    id: '3',
    title: 'Digital Marketing Masterclass',
    instructor: 'Sarah Expert',
    category: 'Marketing',
    price: 69.99,
    rating: 4.7,
    totalStudents: 750,
    totalRevenue: 52492.5,
    status: 'draft',
    lastUpdated: '2024-03-08',
    thumbnail: '/public/mockups/mock3.jpg',
    completionRate: 0,
    totalLessons: 98,
    totalHours: 28,
  },
  {
    id: '4',
    title: 'Advanced Python Programming',
    instructor: 'Mike Python',
    category: 'Programming',
    price: 94.99,
    rating: 4.6,
    totalStudents: 620,
    totalRevenue: 58893.8,
    status: 'review',
    lastUpdated: '2024-03-12',
    thumbnail: '/public/mockups/mock4.jpg',
    completionRate: 92,
    totalLessons: 145,
    totalHours: 38,
  },
];

const categoryOptions = [
  { value: 'all', label: 'Tất cả danh mục' },
  { value: 'Web Development', label: 'Phát triển Web' },
  { value: 'Data Science', label: 'Khoa học dữ liệu' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Programming', label: 'Lập trình' },
];

const statusOptions = [
  { value: 'all', label: 'Tất cả trạng thái' },
  { value: 'published', label: 'Đã xuất bản' },
  { value: 'draft', label: 'Bản nháp' },
  { value: 'review', label: 'Đang xét duyệt' },
  { value: 'rejected', label: 'Đã từ chối' },
];

const sortOptions = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'rating', label: 'Đánh giá cao nhất' },
  { value: 'students', label: 'Học viên nhiều nhất' },
  { value: 'revenue', label: 'Doanh thu cao nhất' },
];

const AdminCourses = () => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Calculate statistics
  const statistics = useMemo(() => {
    const totalRevenue = mockCourses.reduce((sum, course) => sum + course.totalRevenue, 0);
    const totalStudents = mockCourses.reduce((sum, course) => sum + course.totalStudents, 0);
    const publishedCourses = mockCourses.filter(c => c.status === 'published').length;
    const avgRating = mockCourses.reduce((sum, course) => sum + course.rating, 0) / mockCourses.length;

    return {
      totalRevenue,
      totalStudents,
      publishedCourses,
      avgRating
    };
  }, []);

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    let data = [...mockCourses];
    
    // Apply search
    if (search) {
      data = data.filter(course => 
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.instructor.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      data = data.filter(course => course.category === categoryFilter);
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      data = data.filter(course => course.status === statusFilter);
    }

    // Apply sorting
    data.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case 'rating':
          return b.rating - a.rating;
        case 'students':
          return b.totalStudents - a.totalStudents;
        case 'revenue':
          return b.totalRevenue - a.totalRevenue;
        default:
          return 0;
      }
    });

    return data;
  }, [search, categoryFilter, statusFilter, sortBy]);

  const getStatusTag = (status: string) => {
    switch (status) {
      case 'published':
        return <Tag color="success" style={{ borderRadius: 12, padding: '2px 12px' }}>Đã xuất bản</Tag>;
      case 'draft':
        return <Tag color="default" style={{ borderRadius: 12, padding: '2px 12px' }}>Bản nháp</Tag>;
      case 'review':
        return <Tag color="processing" style={{ borderRadius: 12, padding: '2px 12px' }}>Đang xét duyệt</Tag>;
      case 'rejected':
        return <Tag color="error" style={{ borderRadius: 12, padding: '2px 12px' }}>Đã từ chối</Tag>;
      default:
        return null;
    }
  };

  const columns = [
    {
      title: 'Khóa học',
      key: 'course',
      render: (record: any) => (
        <Space>
          <img 
            src={record.thumbnail} 
            alt={record.title}
            style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 8 }}
          />
          <div>
            <Text strong style={{ color: '#6f0fe0', display: 'block' }}>{record.title}</Text>
            <Text type="secondary">{record.instructor}</Text>
          </div>
        </Space>
      ),
      width: 400,
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      width: 150,
    },
    {
      title: 'Đánh giá',
      key: 'rating',
      render: (record: any) => (
        <Space>
          <Rate disabled defaultValue={record.rating} style={{ fontSize: 12 }} />
          <Text strong>{record.rating}</Text>
        </Space>
      ),
      width: 200,
    },
    {
      title: 'Học viên',
      dataIndex: 'totalStudents',
      key: 'totalStudents',
      render: (students: number) => (
        <Badge count={students} style={{ backgroundColor: '#6f0fe0' }} overflowCount={9999} />
      ),
      width: 100,
    },
    {
      title: 'Doanh thu',
      dataIndex: 'totalRevenue',
      key: 'totalRevenue',
      render: (revenue: number) => (
        <Text strong style={{ color: '#10b981' }}>${revenue.toLocaleString()}</Text>
      ),
      width: 120,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getStatusTag(status),
      width: 120,
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (record: any) => (
        <Space>
          <Tooltip title="Xem chi tiết">
            <Button 
              icon={<EyeOutlined />} 
              onClick={() => {
                setSelectedCourse(record);
                setIsModalVisible(true);
              }}
              style={{ 
                background: 'linear-gradient(90deg,#a084e8,#6f0fe0)', 
                border: 'none',
                borderRadius: 8,
              }}
              type="primary"
            />
          </Tooltip>
          {record.status === 'review' && (
            <>
              <Tooltip title="Phê duyệt">
                <Button 
                  icon={<CheckCircleOutlined />}
                  style={{ 
                    background: '#dcfce7',
                    border: 'none',
                    borderRadius: 8,
                    color: '#10b981'
                  }}
                />
              </Tooltip>
              <Tooltip title="Từ chối">
                <Button 
                  icon={<StopOutlined />}
                  style={{ 
                    background: '#fee2e2',
                    border: 'none',
                    borderRadius: 8,
                    color: '#ef4444'
                  }}
                />
              </Tooltip>
            </>
          )}
          {record.status === 'published' && (
            <Tooltip title="Gỡ xuống">
              <Button 
                icon={<StopOutlined />}
                style={{ 
                  background: '#fee2e2',
                  border: 'none',
                  borderRadius: 8,
                  color: '#ef4444'
                }}
              />
            </Tooltip>
          )}
        </Space>
      ),
      width: 150,
      align: 'left' as const,
    },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '40px auto', padding: 0 }}>
      <Title level={2} style={{ color: '#6f0fe0', margin: '24px 0 32px 0' }}>Quản lý khóa học</Title>

      {/* Statistics Cards */}
      <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(111,15,224,0.05)' }}>
            <Statistic
              title={<Text style={{ color: '#6f0fe0' }}>Tổng doanh thu</Text>}
              value={statistics.totalRevenue}
              prefix={<DollarOutlined />}
              precision={2}
              valueStyle={{ color: '#10b981' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(111,15,224,0.05)' }}>
            <Statistic
              title={<Text style={{ color: '#6f0fe0' }}>Tổng học viên</Text>}
              value={statistics.totalStudents}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#6f0fe0' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(111,15,224,0.05)' }}>
            <Statistic
              title={<Text style={{ color: '#6f0fe0' }}>Khóa học đã xuất bản</Text>}
              value={statistics.publishedCourses}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#6f0fe0' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(111,15,224,0.05)' }}>
            <Statistic
              title={<Text style={{ color: '#6f0fe0' }}>Đánh giá trung bình</Text>}
              value={statistics.avgRating}
              prefix={<StarOutlined />}
              precision={1}
              valueStyle={{ color: '#fbbf24' }}
              suffix="★"
            />
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card style={{ borderRadius: 16, marginBottom: 24, boxShadow: '0 4px 24px rgba(111,15,224,0.05)' }}>
        <Space wrap style={{ width: '100%' }}>
          <Input
            placeholder="Tìm kiếm khóa học..."
            prefix={<SearchOutlined />}
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: 250, borderRadius: 8 }}
            allowClear
          />
          <Select
            value={categoryFilter}
            onChange={setCategoryFilter}
            style={{ width: 180, borderRadius: 8 }}
            placeholder="Chọn danh mục"
          >
            {categoryOptions.map(opt => (
              <Option key={opt.value} value={opt.value}>{opt.label}</Option>
            ))}
          </Select>
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 180, borderRadius: 8 }}
            placeholder="Chọn trạng thái"
          >
            {statusOptions.map(opt => (
              <Option key={opt.value} value={opt.value}>{opt.label}</Option>
            ))}
          </Select>
          <Select
            value={sortBy}
            onChange={setSortBy}
            style={{ width: 180, borderRadius: 8 }}
            placeholder="Sắp xếp theo"
          >
            {sortOptions.map(opt => (
              <Option key={opt.value} value={opt.value}>{opt.label}</Option>
            ))}
          </Select>
        </Space>
      </Card>

      {/* Course Table */}
      <Card style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(111,15,224,0.05)' }}>
        <Table
          columns={columns}
          dataSource={filteredCourses}
          rowKey="id"
          pagination={{
            pageSize: 10,
            style: { marginTop: 24 },
            showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} khóa học`,
          }}
          style={{ marginTop: 16 }}
        />
      </Card>

      {/* Course Detail Modal */}
      <Modal
        title={<Text strong style={{ color: '#6f0fe0', fontSize: 20 }}>Chi tiết khóa học</Text>}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedCourse && (
          <div>
            <img
              src={selectedCourse.thumbnail}
              alt={selectedCourse.title}
              style={{ width: '100%', height: 300, objectFit: 'cover', borderRadius: 12, marginBottom: 24 }}
            />
            <Title level={3} style={{ color: '#6f0fe0', marginTop: 0 }}>{selectedCourse.title}</Title>
            <Space split={<Divider type="vertical" />} wrap>
              <Text type="secondary">Giảng viên: <Text strong>{selectedCourse.instructor}</Text></Text>
              <Text type="secondary">Danh mục: <Text strong>{selectedCourse.category}</Text></Text>
              <Text type="secondary">Giá: <Text strong style={{ color: '#10b981' }}>${selectedCourse.price}</Text></Text>
            </Space>
            
            <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
              <Col span={8}>
                <Statistic
                  title="Tổng số học viên"
                  value={selectedCourse.totalStudents}
                  prefix={<UserOutlined />}
                  valueStyle={{ color: '#6f0fe0' }}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Tổng doanh thu"
                  value={selectedCourse.totalRevenue}
                  prefix={<DollarOutlined />}
                  precision={2}
                  valueStyle={{ color: '#10b981' }}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Tỷ lệ hoàn thành"
                  value={selectedCourse.completionRate}
                  suffix="%"
                  prefix={<BarChartOutlined />}
                  valueStyle={{ color: '#6f0fe0' }}
                />
              </Col>
            </Row>

            <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
              <Col span={12}>
                <Card size="small" title="Thông tin khóa học">
                  <p><Text type="secondary">Số bài học:</Text> <Text strong>{selectedCourse.totalLessons}</Text></p>
                  <p><Text type="secondary">Tổng thời lượng:</Text> <Text strong>{selectedCourse.totalHours} giờ</Text></p>
                  <p><Text type="secondary">Cập nhật lần cuối:</Text> <Text strong>{new Date(selectedCourse.lastUpdated).toLocaleDateString('vi-VN')}</Text></p>
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small" title="Đánh giá">
                  <div style={{ textAlign: 'center' }}>
                    <Rate disabled defaultValue={selectedCourse.rating} style={{ fontSize: 24 }} />
                    <Title level={3} style={{ margin: '8px 0', color: '#fbbf24' }}>{selectedCourse.rating}</Title>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminCourses; 