import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { Typography } from 'antd';

const { Title } = Typography;

const AdminSettings = () => (
  <MainLayout>
    <div style={{ maxWidth: 1200, margin: '40px auto', padding: 32, background: '#fff', borderRadius: 16, boxShadow: '0 4px 32px rgba(111,15,224,0.08)' }}>
      <Title level={2} style={{ color: '#6f0fe0' }}>Cài đặt hệ thống</Title>
      <p>Cấu hình các thông số nền tảng, tích hợp thanh toán, email...</p>
    </div>
  </MainLayout>
);

export default AdminSettings; 