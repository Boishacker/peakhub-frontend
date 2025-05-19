import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { Typography } from 'antd';

const { Title } = Typography;

const AdminCategories = () => (
  <MainLayout>
    <div style={{ maxWidth: 1200, margin: '40px auto', padding: 32, background: '#fff', borderRadius: 16, boxShadow: '0 4px 32px rgba(111,15,224,0.08)' }}>
      <Title level={2} style={{ color: '#6f0fe0' }}>Quản lý danh mục</Title>
      <p>Thêm/sửa/xóa các category, tag cho khóa học...</p>
    </div>
  </MainLayout>
);

export default AdminCategories; 