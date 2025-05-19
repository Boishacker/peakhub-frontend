import React, { useState } from 'react';
import { Layout, Menu, Card, Row, Col, Typography, Statistic, Divider } from 'antd';
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
  SettingOutlined
} from '@ant-design/icons';
import { Bar, Pie } from 'react-chartjs-2';
import MainLayout from '../../components/layout/MainLayout';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title as ChartTitle, Tooltip, Legend, ArcElement } from 'chart.js';

const { Sider, Content } = Layout;
const { Title } = Typography;

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTitle, Tooltip, Legend, ArcElement);

const menuItems = [
  { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
  { key: 'users', icon: <UserOutlined />, label: 'Người dùng' },
  { key: 'instructors', icon: <TeamOutlined />, label: 'Giảng viên' },
  { key: 'courses', icon: <BookOutlined />, label: 'Khóa học' },
  { key: 'transactions', icon: <DollarOutlined />, label: 'Giao dịch' },
  { key: 'reviews', icon: <FileTextOutlined />, label: 'Đánh giá' },
  { key: 'reports', icon: <ExclamationCircleOutlined />, label: 'Báo cáo' },
  { key: 'categories', icon: <TagsOutlined />, label: 'Danh mục' },
  { key: 'pages', icon: <FileDoneOutlined />, label: 'Nội dung tĩnh' },
  { key: 'notifications', icon: <NotificationOutlined />, label: 'Thông báo' },
  { key: 'settings', icon: <SettingOutlined />, label: 'Cài đặt' },
];

const barData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Doanh thu ($)',
      data: [1200, 1900, 800, 1500, 2100, 1700],
      backgroundColor: '#6f0fe0',
      borderRadius: 8,
    },
  ],
};

const pieData = {
  labels: ['Học viên', 'Giảng viên', 'Admin'],
  datasets: [
    {
      label: 'Tỉ lệ user',
      data: [1200, 80, 5],
      backgroundColor: ['#6f0fe0', '#a084e8', '#ede9fe'],
      borderWidth: 1,
    },
  ],
};

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <Title level={2} style={{ color: '#6f0fe0', marginBottom: 24 }}>Admin Dashboard</Title>
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={12} md={6}>
                <Card hoverable style={{ borderRadius: 12, boxShadow: '0 2px 12px #6f0fe022', border: '1px solid #f4f0fe', textAlign: 'center' }}>
                  <Statistic title={<span style={{ color: '#6f0fe0' }}>Người dùng</span>} value={1285} prefix={<UserOutlined style={{ color: '#6f0fe0' }} />} />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card hoverable style={{ borderRadius: 12, boxShadow: '0 2px 12px #6f0fe022', border: '1px solid #f4f0fe', textAlign: 'center' }}>
                  <Statistic title={<span style={{ color: '#a084e8' }}>Giảng viên</span>} value={80} prefix={<TeamOutlined style={{ color: '#a084e8' }} />} />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card hoverable style={{ borderRadius: 12, boxShadow: '0 2px 12px #6f0fe022', border: '1px solid #f4f0fe', textAlign: 'center' }}>
                  <Statistic title={<span style={{ color: '#ede9fe' }}>Khóa học</span>} value={320} prefix={<BookOutlined style={{ color: '#ede9fe', background: '#6f0fe0', borderRadius: 8, padding: 2 }} />} />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card hoverable style={{ borderRadius: 12, boxShadow: '0 2px 12px #6f0fe022', border: '1px solid #f4f0fe', textAlign: 'center' }}>
                  <Statistic title={<span style={{ color: '#fbbf24' }}>Doanh thu</span>} value={"$12,500"} prefix={<DollarOutlined style={{ color: '#fbbf24' }} />} />
                </Card>
              </Col>
            </Row>
            <Divider style={{ margin: '32px 0' }} />
            <Row gutter={[32, 32]}>
              <Col xs={24} md={16}>
                <Card style={{ borderRadius: 12, boxShadow: '0 2px 12px #6f0fe022', border: '1px solid #f4f0fe', minHeight: 320 }}>
                  <Title level={4} style={{ color: '#6f0fe0' }}>Doanh thu 6 tháng gần nhất</Title>
                  <div style={{ height: 220 }}>
                    <Bar data={barData} options={{ plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } }, responsive: true, maintainAspectRatio: false }} />
                  </div>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card style={{ borderRadius: 12, boxShadow: '0 2px 12px #6f0fe022', border: '1px solid #f4f0fe', minHeight: 320 }}>
                  <Title level={4} style={{ color: '#6f0fe0' }}>Tỉ lệ user</Title>
                  <div style={{ height: 220 }}>
                    <Pie data={pieData} options={{ plugins: { legend: { position: 'bottom' } }, responsive: true, maintainAspectRatio: false }} />
                  </div>
                </Card>
              </Col>
            </Row>
          </>
        );
      case 'users':
        return <Title level={2} style={{ color: '#6f0fe0' }}>Quản lý người dùng</Title>;
      case 'instructors':
        return <Title level={2} style={{ color: '#6f0fe0' }}>Quản lý giảng viên</Title>;
      case 'courses':
        return <Title level={2} style={{ color: '#6f0fe0' }}>Quản lý khóa học</Title>;
      case 'transactions':
        return <Title level={2} style={{ color: '#6f0fe0' }}>Quản lý giao dịch</Title>;
      case 'reviews':
        return <Title level={2} style={{ color: '#6f0fe0' }}>Quản lý đánh giá</Title>;
      case 'reports':
        return <Title level={2} style={{ color: '#6f0fe0' }}>Quản lý báo cáo</Title>;
      case 'categories':
        return <Title level={2} style={{ color: '#6f0fe0' }}>Quản lý danh mục</Title>;
      case 'pages':
        return <Title level={2} style={{ color: '#6f0fe0' }}>Quản lý nội dung tĩnh</Title>;
      case 'notifications':
        return <Title level={2} style={{ color: '#6f0fe0' }}>Quản lý thông báo</Title>;
      case 'settings':
        return <Title level={2} style={{ color: '#6f0fe0' }}>Cài đặt hệ thống</Title>;
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
          style={{ background: '#f8f6ff', borderRadius: 16, margin: 24, boxShadow: '0 4px 24px 0 rgba(111, 15, 224, 0.07)', border: 'none', transition: 'all 0.3s' }}
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