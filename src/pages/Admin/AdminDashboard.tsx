import React, { useState } from 'react';
import { Layout, Menu, Card, Row, Col, Typography, Statistic, Space, DatePicker, Select, Button, Table, Tag, Tooltip } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  BookOutlined,
  DollarOutlined,
  FileTextOutlined,
  ExclamationCircleOutlined,
  TagsOutlined,
  FileDoneOutlined,
  NotificationOutlined,
  SettingOutlined,
  StarOutlined,
  BarChartOutlined,
  AppstoreOutlined,
  RiseOutlined,
  FallOutlined,
  DownloadOutlined,
  FilterOutlined
} from '@ant-design/icons';
import { Bar, Line, Pie } from 'react-chartjs-2';
import MainLayout from '../../components/layout/MainLayout';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title as ChartTitle, Tooltip as ChartTooltip, Legend, ArcElement, Filler } from 'chart.js';
import AdminUsers from './AdminUsers';
import AdminCourses from './AdminCourses';
import AdminTransactions from './AdminTransactions';
import AdminReviews from './AdminReviews';
import AdminCategories from './AdminCategories';
import AdminPages from './AdminPages';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  ChartTitle,
  ChartTooltip,
  Legend,
  Filler
);

const menuItems = [
  { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
  { key: 'users', icon: <UserOutlined />, label: 'Người dùng' },
  { key: 'courses', icon: <BookOutlined />, label: 'Khóa học' },
  { key: 'transactions', icon: <DollarOutlined />, label: 'Giao dịch' },
  { key: 'reviews', icon: <StarOutlined />, label: 'Đánh giá' },
  { key: 'categories', icon: <AppstoreOutlined />, label: 'Danh mục' },
  { key: 'pages', icon: <FileDoneOutlined />, label: 'Nội dung tĩnh' },
];

// Revenue data for line chart
const revenueData = {
  labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
  datasets: [
    {
      label: 'Doanh thu (triệu VNĐ)',
      data: [150, 180, 220, 280, 350, 400, 380, 420, 450, 500, 550, 600],
      borderColor: '#6f0fe0',
      backgroundColor: 'rgba(111, 15, 224, 0.1)',
      fill: true,
      tension: 0.4,
    }
  ]
};

// Category distribution data for pie chart
const categoryDistributionData = {
  labels: ['AI Cơ bản', 'AI trong Doanh nghiệp', 'AI trong Sáng tạo', 'AI trong Công nghiệp'],
  datasets: [
    {
      data: [35, 25, 20, 20],
      backgroundColor: ['#6f0fe0', '#a084e8', '#ede9fe', '#f4f0fe'],
      borderWidth: 0,
    }
  ]
};

// Enrollment data for bar chart
const enrollmentData = {
  labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
  datasets: [
    {
      label: 'Số lượng đăng ký',
      data: [80, 120, 160, 200, 250, 300, 280, 320, 350, 400, 450, 500],
      backgroundColor: '#6f0fe0',
      borderRadius: 8,
    }
  ]
};

// Top courses data
const topCoursesData = [
  {
    key: '1',
    name: 'Machine Learning Cơ bản',
    category: 'AI Cơ bản',
    students: 1250,
    revenue: 125000000,
    rating: 4.8,
    growth: 25,
  },
  {
    key: '2',
    name: 'Deep Learning với PyTorch',
    category: 'AI Cơ bản',
    students: 980,
    revenue: 98000000,
    rating: 4.7,
    growth: 18,
  },
  {
    key: '3',
    name: 'AI trong Digital Marketing',
    category: 'AI trong Doanh nghiệp',
    students: 850,
    revenue: 85000000,
    rating: 4.6,
    growth: 22,
  },
  {
    key: '4',
    name: 'Generative AI Masterclass',
    category: 'AI trong Sáng tạo',
    students: 780,
    revenue: 78000000,
    rating: 4.9,
    growth: 35,
  },
  {
    key: '5',
    name: 'Computer Vision trong Công nghiệp',
    category: 'AI trong Công nghiệp',
    students: 650,
    revenue: 65000000,
    rating: 4.7,
    growth: 20,
  },
];

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dateRange, setDateRange] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('all');

  const topCoursesColumns = [
    {
      title: 'Khóa học',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Text strong style={{ color: '#6f0fe0' }}>{text}</Text>,
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      render: (text) => <Tag color="#6f0fe0">{text}</Tag>,
    },
    {
      title: 'Học viên',
      dataIndex: 'students',
      key: 'students',
      render: (value) => (
        <Text strong>{value.toLocaleString()}</Text>
      ),
    },
    {
      title: 'Doanh thu',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (value) => (
        <Text strong style={{ color: '#10b981' }}>
          {value.toLocaleString()} VNĐ
        </Text>
      ),
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      render: (value) => (
        <Space>
          <StarOutlined style={{ color: '#fbbf24' }} />
          <Text strong>{value}</Text>
        </Space>
      ),
    },
    {
      title: 'Tăng trưởng',
      dataIndex: 'growth',
      key: 'growth',
      render: (value) => (
        <Text strong style={{ color: '#10b981' }}>
          <RiseOutlined /> {value}%
        </Text>
      ),
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <Title level={2} style={{ color: '#6f0fe0', marginBottom: 24 }}>Admin Dashboard</Title>
            
            {/* Filters */}
            <Card style={{ marginBottom: 24, borderRadius: 16, boxShadow: '0 4px 24px rgba(111,15,224,0.05)' }}>
              <Space wrap>
                <RangePicker
                  onChange={(dates) => setDateRange(dates)}
                  style={{ borderRadius: 8 }}
                  format="DD/MM/YYYY"
                />
                <Select
                  defaultValue="all"
                  style={{ width: 200, borderRadius: 8 }}
                  onChange={(value) => setCategoryFilter(value)}
                >
                  <Select.Option value="all">Tất cả danh mục</Select.Option>
                  <Select.Option value="basic">AI Cơ bản</Select.Option>
                  <Select.Option value="business">AI trong Doanh nghiệp</Select.Option>
                  <Select.Option value="creative">AI trong Sáng tạo</Select.Option>
                  <Select.Option value="industry">AI trong Công nghiệp</Select.Option>
                </Select>
                <Button
                  icon={<DownloadOutlined />}
                  style={{ borderRadius: 8, background: '#6f0fe0', color: '#fff' }}
                >
                  Xuất báo cáo
                </Button>
              </Space>
            </Card>

            {/* Statistics Cards */}
            <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
              <Col xs={24} sm={12} md={6}>
                <Card hoverable style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(111,15,224,0.05)' }}>
                  <Statistic
                    title={<Text style={{ color: '#6f0fe0' }}>Tổng doanh thu</Text>}
                    value={4500000000}
                    prefix={<DollarOutlined />}
                    valueStyle={{ color: '#6f0fe0' }}
                    suffix="VNĐ"
                  />
                  <Text type="success" style={{ fontSize: 14 }}>
                    <RiseOutlined /> Tăng 25% so với tháng trước
                  </Text>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card hoverable style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(111,15,224,0.05)' }}>
                  <Statistic
                    title={<Text style={{ color: '#6f0fe0' }}>Tổng học viên</Text>}
                    value={12500}
                    prefix={<UserOutlined />}
                    valueStyle={{ color: '#10b981' }}
                  />
                  <Text type="success" style={{ fontSize: 14 }}>
                    <RiseOutlined /> Tăng 18% so với tháng trước
                  </Text>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card hoverable style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(111,15,224,0.05)' }}>
                  <Statistic
                    title={<Text style={{ color: '#6f0fe0' }}>Khóa học mới</Text>}
                    value={45}
                    prefix={<BookOutlined />}
                    valueStyle={{ color: '#f97316' }}
                  />
                  <Text type="success" style={{ fontSize: 14 }}>
                    <RiseOutlined /> Tăng 15% so với tháng trước
                  </Text>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card hoverable style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(111,15,224,0.05)' }}>
                  <Statistic
                    title={<Text style={{ color: '#6f0fe0' }}>Đánh giá trung bình</Text>}
                    value={4.7}
                    prefix={<StarOutlined />}
                    valueStyle={{ color: '#fbbf24' }}
                    suffix="/5"
                  />
                  <Text type="success" style={{ fontSize: 14 }}>
                    <RiseOutlined /> Tăng 0.2 so với tháng trước
                  </Text>
                </Card>
              </Col>
            </Row>

            {/* Charts */}
            <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
              <Col xs={24} lg={16}>
                <Card
                  title={<Text strong>Doanh thu theo tháng</Text>}
                  style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(111,15,224,0.05)' }}
                >
                  <div style={{ height: 400 }}>
                    <Line
                      data={revenueData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                          },
                        },
                      }}
                    />
                  </div>
                </Card>
              </Col>
              <Col xs={24} lg={8}>
                <Card
                  title={<Text strong>Phân bố khóa học theo danh mục</Text>}
                  style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(111,15,224,0.05)' }}
                >
                  <div style={{ height: 400 }}>
                    <Pie
                      data={categoryDistributionData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'bottom',
                          },
                        },
                      }}
                    />
                  </div>
                </Card>
              </Col>
            </Row>

            <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
              <Col xs={24}>
                <Card
                  title={<Text strong>Số lượng đăng ký theo tháng</Text>}
                  style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(111,15,224,0.05)' }}
                >
                  <div style={{ height: 400 }}>
                    <Bar
                      data={enrollmentData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                          },
                        },
                      }}
                    />
                  </div>
                </Card>
              </Col>
            </Row>

            {/* Top Courses Table */}
            <Card
              title={<Text strong>Top khóa học hiệu quả nhất</Text>}
              style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(111,15,224,0.05)' }}
            >
              <Table
                columns={topCoursesColumns}
                dataSource={topCoursesData}
                pagination={false}
                style={{ marginTop: 16 }}
              />
            </Card>
          </>
        );
      case 'users':
        return <AdminUsers />;
      case 'courses':
        return <AdminCourses />;
      case 'transactions':
        return <AdminTransactions />;
      case 'reviews':
        return <AdminReviews />;
      case 'categories':
        return <AdminCategories />;
      case 'pages':
        return <AdminPages />;
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <Layout style={{ minHeight: '80vh', background: 'transparent' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          width={220}
          style={{ background: '#f8f6ff', borderRadius: 16, margin: 24, marginRight: 0, boxShadow: '0 4px 24px 0 rgba(111, 15, 224, 0.07)', border: 'none', transition: 'all 0.3s' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between', padding: 16 }}>
            {!collapsed && <span style={{ fontWeight: 700, color: '#6f0fe0', fontSize: 18 }}>Admin</span>}
            <span style={{ fontWeight: 700, color: '#6f0fe0', fontSize: 18, display: collapsed ? 'block' : 'none' }}>A</span>
          </div>
          <Menu
            mode="inline"
            selectedKeys={[activeTab]}
            onClick={({ key }) => setActiveTab(key)}
            style={{ border: 'none', fontWeight: 500, fontSize: 16, background: 'transparent' }}
            items={menuItems.map(item => ({
              ...item,
              className: 'admin-menu-item',
            }))}
          />
        </Sider>
        <Layout style={{ background: 'transparent' }}>
          <Content style={{ margin: 24, padding: 24, background: '#fff', borderRadius: 16, minHeight: 360, boxShadow: '0 4px 24px 0 rgba(111, 15, 224, 0.07)' }}>
            {renderTabContent()}
          </Content>
        </Layout>
      </Layout>
      <style>{`
        .ant-layout-sider-trigger {
          display: none !important;
        }
        .admin-menu-item {
          border-radius: 8px !important;
          margin-bottom: 6px !important;
          transition: background 0.2s, color 0.2s;
        }
        .ant-menu-item-selected.admin-menu-item {
          background: #f4f0fe !important;
          color: #6f0fe0 !important;
          font-weight: 600;
        }
        .ant-menu-item.admin-menu-item:hover {
          background: #ede9fe !important;
          color: #6f0fe0 !important;
        }
      `}</style>
    </MainLayout>
  );
};

export default AdminDashboard; 