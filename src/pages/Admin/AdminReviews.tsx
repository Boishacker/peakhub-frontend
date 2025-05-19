import React, { useState, useMemo } from 'react';
import { Typography, Table, Input, Tag, Button, Space, Select, Card, Row, Col, Statistic, DatePicker, Rate, Avatar, Tooltip, Modal } from 'antd';
import {
  SearchOutlined,
  StarOutlined,
  UserOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  CalendarOutlined,
  FlagOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  MessageOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

// Mock data for reviews
const mockReviews = [
  {
    id: 'REV001',
    userId: 'USR001',
    userName: 'John Doe',
    userAvatar: null,
    courseId: 'CRS001',
    courseName: 'Complete React Developer Course',
    rating: 5,
    content: 'This course is absolutely amazing! The instructor explains everything clearly and the projects are very practical.',
    status: 'published',
    createdAt: '2024-03-15T08:30:00',
    helpful: 24,
    reported: false,
  },
  {
    id: 'REV002',
    userId: 'USR002',
    userName: 'Jane Smith',
    userAvatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    courseId: 'CRS002',
    courseName: 'Machine Learning A-Z',
    rating: 2,
    content: 'The content is outdated and some code examples do not work anymore. Needs urgent updates.',
    status: 'reported',
    createdAt: '2024-03-14T09:15:00',
    helpful: 5,
    reported: true,
    reportReason: 'Inappropriate content',
  },
  {
    id: 'REV003',
    userId: 'USR003',
    userName: 'Mike Johnson',
    userAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    courseId: 'CRS003',
    courseName: 'Digital Marketing Masterclass',
    rating: 4,
    content: 'Great course overall. Would be perfect with more real-world case studies.',
    status: 'published',
    createdAt: '2024-03-13T10:00:00',
    helpful: 12,
    reported: false,
  },
  {
    id: 'REV004',
    userId: 'USR004',
    userName: 'Sarah Wilson',
    userAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    courseId: 'CRS004',
    courseName: 'Advanced Python Programming',
    rating: 1,
    content: 'Very disappointed. The course description promised advanced topics but mostly covered basics.',
    status: 'hidden',
    createdAt: '2024-03-12T10:45:00',
    helpful: 3,
    reported: true,
    reportReason: 'Spam',
  },
];

const statusOptions = [
  { value: 'all', label: 'Tất cả trạng thái' },
  { value: 'published', label: 'Đã xuất bản' },
  { value: 'reported', label: 'Bị báo cáo' },
  { value: 'hidden', label: 'Đã ẩn' },
];

const ratingOptions = [
  { value: 'all', label: 'Tất cả đánh giá' },
  { value: '5', label: '5 sao' },
  { value: '4', label: '4 sao' },
  { value: '3', label: '3 sao' },
  { value: '2', label: '2 sao' },
  { value: '1', label: '1 sao' },
];

const AdminReviews = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [dateRange, setDateRange] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Calculate statistics
  const statistics = useMemo(() => {
    const totalReviews = mockReviews.length;
    const avgRating = (mockReviews.reduce((sum, rev) => sum + rev.rating, 0) / totalReviews).toFixed(1);
    const recentReviews = mockReviews.filter(rev => 
      dayjs(rev.createdAt).isAfter(dayjs().subtract(30, 'day'))
    ).length;
    const reportedReviews = mockReviews.filter(rev => rev.reported).length;

    return {
      totalReviews,
      avgRating,
      recentReviews,
      reportedReviews,
    };
  }, []);

  // Filter reviews
  const filteredReviews = useMemo(() => {
    let data = [...mockReviews];
    
    // Apply search
    if (search) {
      data = data.filter(rev => 
        rev.content.toLowerCase().includes(search.toLowerCase()) ||
        rev.userName.toLowerCase().includes(search.toLowerCase()) ||
        rev.courseName.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      data = data.filter(rev => rev.status === statusFilter);
    }

    // Apply rating filter
    if (ratingFilter !== 'all') {
      data = data.filter(rev => rev.rating === parseInt(ratingFilter));
    }

    // Apply date range filter
    if (dateRange) {
      const [start, end] = dateRange;
      data = data.filter(rev => {
        const revDate = dayjs(rev.createdAt);
        return revDate.isAfter(start) && revDate.isBefore(end.add(1, 'day'));
      });
    }

    return data;
  }, [search, statusFilter, ratingFilter, dateRange]);

  const getStatusTag = (status) => {
    switch (status) {
      case 'published':
        return <Tag icon={<CheckCircleOutlined />} color="success" style={{ borderRadius: 12, padding: '2px 12px' }}>Đã xuất bản</Tag>;
      case 'reported':
        return <Tag icon={<FlagOutlined />} color="error" style={{ borderRadius: 12, padding: '2px 12px' }}>Bị báo cáo</Tag>;
      case 'hidden':
        return <Tag icon={<EyeInvisibleOutlined />} color="default" style={{ borderRadius: 12, padding: '2px 12px' }}>Đã ẩn</Tag>;
      default:
        return null;
    }
  };

  const handleViewReview = (review) => {
    setSelectedReview(review);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: 'Người đánh giá',
      key: 'user',
      render: (record) => (
        <Space>
          <Avatar src={record.userAvatar} icon={<UserOutlined />} />
          <Text>{record.userName}</Text>
        </Space>
      ),
      width: 200,
    },
    {
      title: 'Khóa học',
      dataIndex: 'courseName',
      key: 'courseName',
      width: 300,
    },
    {
      title: 'Đánh giá',
      key: 'rating',
      render: (record) => (
        <Space>
          <Rate disabled defaultValue={record.rating} style={{ fontSize: 16 }} />
          <Text>({record.rating})</Text>
        </Space>
      ),
      width: 200,
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
      render: (text) => (
        <Paragraph ellipsis={{ rows: 2 }}>{text}</Paragraph>
      ),
      width: 300,
    },
    {
      title: 'Thời gian',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => (
        <Tooltip title={dayjs(date).format('DD/MM/YYYY HH:mm:ss')}>
          {dayjs(date).format('DD/MM/YYYY')}
        </Tooltip>
      ),
      width: 120,
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (record) => getStatusTag(record.status),
      width: 150,
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (record) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleViewReview(record)}
            style={{ color: '#6f0fe0' }}
          />
          <Button
            type="text"
            icon={record.status === 'hidden' ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            style={{ color: record.status === 'hidden' ? '#10b981' : '#f97316' }}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            style={{ color: '#ef4444' }}
          />
        </Space>
      ),
      width: 150,
      fixed: 'right',
    },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '40px auto', padding: 0 }}>
      <Title level={2} style={{ color: '#6f0fe0', margin: '24px 0 32px 0' }}>Quản lý đánh giá</Title>

      {/* Statistics Cards */}
      <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(111,15,224,0.05)' }}>
            <Statistic
              title={<Text style={{ color: '#6f0fe0' }}>Tổng đánh giá</Text>}
              value={statistics.totalReviews}
              prefix={<MessageOutlined />}
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
              valueStyle={{ color: '#fbbf24' }}
              suffix="/5"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(111,15,224,0.05)' }}>
            <Statistic
              title={<Text style={{ color: '#6f0fe0' }}>Đánh giá gần đây</Text>}
              value={statistics.recentReviews}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: '#10b981' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(111,15,224,0.05)' }}>
            <Statistic
              title={<Text style={{ color: '#6f0fe0' }}>Cần xử lý</Text>}
              value={statistics.reportedReviews}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: '#ef4444' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card style={{ borderRadius: 16, marginBottom: 24, boxShadow: '0 4px 24px rgba(111,15,224,0.05)' }}>
        <Space wrap style={{ width: '100%' }}>
          <Input
            placeholder="Tìm kiếm đánh giá..."
            prefix={<SearchOutlined />}
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: 250, borderRadius: 8 }}
            allowClear
          />
          <RangePicker
            onChange={(dates) => setDateRange(dates)}
            style={{ borderRadius: 8 }}
            format="DD/MM/YYYY"
          />
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 180, borderRadius: 8 }}
            placeholder="Trạng thái"
          >
            {statusOptions.map(opt => (
              <Option key={opt.value} value={opt.value}>{opt.label}</Option>
            ))}
          </Select>
          <Select
            value={ratingFilter}
            onChange={setRatingFilter}
            style={{ width: 180, borderRadius: 8 }}
            placeholder="Đánh giá"
          >
            {ratingOptions.map(opt => (
              <Option key={opt.value} value={opt.value}>{opt.label}</Option>
            ))}
          </Select>
        </Space>
      </Card>

      {/* Reviews Table */}
      <Card style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(111,15,224,0.05)' }}>
        <Table
          columns={columns}
          dataSource={filteredReviews}
          rowKey="id"
          pagination={{
            pageSize: 10,
            style: { marginTop: 24 },
            showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} đánh giá`,
          }}
          style={{ marginTop: 16 }}
          scroll={{ x: 1200 }}
        />
      </Card>

      {/* Review Detail Modal */}
      <Modal
        title={<Text strong>Chi tiết đánh giá</Text>}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={700}
      >
        {selectedReview && (
          <div>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Space align="start">
                <Avatar size={64} src={selectedReview.userAvatar} icon={<UserOutlined />} />
                <div>
                  <Text strong style={{ fontSize: 16 }}>{selectedReview.userName}</Text>
                  <br />
                  <Text type="secondary">{dayjs(selectedReview.createdAt).format('DD/MM/YYYY HH:mm:ss')}</Text>
                </div>
              </Space>
              
              <div>
                <Text strong>Khóa học:</Text>
                <br />
                <Text>{selectedReview.courseName}</Text>
              </div>

              <div>
                <Text strong>Đánh giá:</Text>
                <br />
                <Rate disabled defaultValue={selectedReview.rating} />
              </div>

              <div>
                <Text strong>Nội dung:</Text>
                <br />
                <Paragraph style={{ marginTop: 8 }}>{selectedReview.content}</Paragraph>
              </div>

              <Space>
                <Button type="primary" danger={selectedReview.status !== 'hidden'} icon={selectedReview.status === 'hidden' ? <EyeOutlined /> : <EyeInvisibleOutlined />}>
                  {selectedReview.status === 'hidden' ? 'Hiện đánh giá' : 'Ẩn đánh giá'}
                </Button>
                <Button type="primary" danger icon={<DeleteOutlined />}>
                  Xóa đánh giá
                </Button>
              </Space>
            </Space>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminReviews; 