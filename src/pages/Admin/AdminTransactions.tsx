import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { Typography } from 'antd';

const { Title } = Typography;

const AdminTransactions = () => (
  <MainLayout>
    <div style={{ maxWidth: 1200, margin: '40px auto', padding: 32, background: '#fff', borderRadius: 16, boxShadow: '0 4px 32px rgba(111,15,224,0.08)' }}>
      <Title level={2} style={{ color: '#6f0fe0' }}>Quản lý giao dịch & doanh thu</Title>
      <p>Xem lịch sử giao dịch, doanh thu, xuất hóa đơn, xử lý hoàn tiền...</p>
    </div>
  </MainLayout>
);

export default AdminTransactions; 