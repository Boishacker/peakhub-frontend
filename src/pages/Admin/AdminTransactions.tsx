import React, { useState, useMemo } from 'react';
import { Typography, Table, Input, Tag, Button, Space, Select, Card, Row, Col, Statistic, DatePicker, Tooltip } from 'antd';
import {
  SearchOutlined,
  DollarOutlined,
  UserOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
  EyeOutlined,
  CalendarOutlined,
  CreditCardOutlined,
  BankOutlined,
  WalletOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

// Mock data for transactions
const mockTransactions = [
  {
    id: 'TRX001',
    userId: 'USR001',
    userName: 'John Doe',
    courseId: 'CRS001',
    courseName: 'Complete React Developer Course',
    amount: 89.99,
    paymentMethod: 'credit_card',
    status: 'completed',
    createdAt: '2024-03-15T08:30:00',
    cardLast4: '4242',
    cardBrand: 'visa',
  },
  {
    id: 'TRX002',
    userId: 'USR002',
    userName: 'Jane Smith',
    courseId: 'CRS002',
    courseName: 'Machine Learning A-Z',
    amount: 129.99,
    paymentMethod: 'paypal',
    status: 'completed',
    createdAt: '2024-03-15T09:15:00',
    paypalEmail: 'jane@email.com',
  },
  {
    id: 'TRX003',
    userId: 'USR003',
    userName: 'Mike Johnson',
    courseId: 'CRS003',
    courseName: 'Digital Marketing Masterclass',
    amount: 69.99,
    paymentMethod: 'bank_transfer',
    status: 'pending',
    createdAt: '2024-03-15T10:00:00',
    bankAccount: '*****6789',
  },
  {
    id: 'TRX004',
    userId: 'USR004',
    userName: 'Sarah Wilson',
    courseId: 'CRS004',
    courseName: 'Advanced Python Programming',
    amount: 94.99,
    paymentMethod: 'credit_card',
    status: 'failed',
    createdAt: '2024-03-15T10:45:00',
    cardLast4: '1234',
    cardBrand: 'mastercard',
    failureReason: 'Insufficient funds',
  },
];

const statusOptions = [
  { value: 'all', label: 'Tất cả trạng thái' },
  { value: 'completed', label: 'Thành công' },
  { value: 'pending', label: 'Đang xử lý' },
  { value: 'failed', label: 'Thất bại' },
];

const paymentMethodOptions = [
  { value: 'all', label: 'Tất cả phương thức' },
  { value: 'credit_card', label: 'Thẻ tín dụng' },
  { value: 'paypal', label: 'PayPal' },
  { value: 'bank_transfer', label: 'Chuyển khoản' },
];

const AdminTransactions = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('all');
  const [dateRange, setDateRange] = useState(null);

  // Calculate statistics
  const statistics = useMemo(() => {
    const total = mockTransactions.reduce((sum, trx) => sum + trx.amount, 0);
    const completed = mockTransactions.filter(trx => trx.status === 'completed').length;
    const pending = mockTransactions.filter(trx => trx.status === 'pending').length;
    const failed = mockTransactions.filter(trx => trx.status === 'failed').length;

    return {
      totalRevenue: total,
      completedCount: completed,
      pendingCount: pending,
      failedCount: failed,
    };
  }, []);

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    let data = [...mockTransactions];
    
    // Apply search
    if (search) {
      data = data.filter(trx => 
        trx.id.toLowerCase().includes(search.toLowerCase()) ||
        trx.userName.toLowerCase().includes(search.toLowerCase()) ||
        trx.courseName.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      data = data.filter(trx => trx.status === statusFilter);
    }

    // Apply payment method filter
    if (paymentMethodFilter !== 'all') {
      data = data.filter(trx => trx.paymentMethod === paymentMethodFilter);
    }

    // Apply date range filter
    if (dateRange) {
      const [start, end] = dateRange;
      data = data.filter(trx => {
        const trxDate = dayjs(trx.createdAt);
        return trxDate.isAfter(start) && trxDate.isBefore(end.add(1, 'day'));
      });
    }

    return data;
  }, [search, statusFilter, paymentMethodFilter, dateRange]);

  const getStatusTag = (status: string) => {
    switch (status) {
      case 'completed':
        return <Tag icon={<CheckCircleOutlined />} color="success" style={{ borderRadius: 12, padding: '2px 12px' }}>Thành công</Tag>;
      case 'pending':
        return <Tag icon={<LoadingOutlined />} color="processing" style={{ borderRadius: 12, padding: '2px 12px' }}>Đang xử lý</Tag>;
      case 'failed':
        return <Tag icon={<CloseCircleOutlined />} color="error" style={{ borderRadius: 12, padding: '2px 12px' }}>Thất bại</Tag>;
      default:
        return null;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'credit_card':
        return <CreditCardOutlined style={{ color: '#6f0fe0' }} />;
      case 'paypal':
        return <WalletOutlined style={{ color: '#00457C' }} />;
      case 'bank_transfer':
        return <BankOutlined style={{ color: '#10b981' }} />;
      default:
        return null;
    }
  };

  const columns = [
    {
      title: 'Mã giao dịch',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => <Text strong style={{ color: '#6f0fe0' }}>{text}</Text>,
      width: 120,
    },
    {
      title: 'Thời gian',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => (
        <Tooltip title={dayjs(date).format('DD/MM/YYYY HH:mm:ss')}>
          {dayjs(date).format('DD/MM/YYYY HH:mm')}
        </Tooltip>
      ),
      width: 150,
    },
    {
      title: 'Người mua',
      key: 'user',
      render: (record: any) => (
        <Space>
          <UserOutlined style={{ color: '#6f0fe0' }} />
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
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => (
        <Text strong style={{ color: '#10b981' }}>${amount.toFixed(2)}</Text>
      ),
      width: 120,
    },
    {
      title: 'Phương thức',
      key: 'paymentMethod',
      render: (record: any) => (
        <Space>
          {getPaymentMethodIcon(record.paymentMethod)}
          <Text>
            {record.paymentMethod === 'credit_card' && `${record.cardBrand.toUpperCase()} *${record.cardLast4}`}
            {record.paymentMethod === 'paypal' && record.paypalEmail}
            {record.paymentMethod === 'bank_transfer' && record.bankAccount}
          </Text>
        </Space>
      ),
      width: 200,
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (record: any) => getStatusTag(record.status),
      width: 150,
    },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '40px auto', padding: 0 }}>
      <Title level={2} style={{ color: '#6f0fe0', margin: '24px 0 32px 0' }}>Quản lý giao dịch</Title>

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
              title={<Text style={{ color: '#6f0fe0' }}>Giao dịch thành công</Text>}
              value={statistics.completedCount}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#10b981' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(111,15,224,0.05)' }}>
            <Statistic
              title={<Text style={{ color: '#6f0fe0' }}>Đang xử lý</Text>}
              value={statistics.pendingCount}
              prefix={<LoadingOutlined />}
              valueStyle={{ color: '#1d4ed8' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(111,15,224,0.05)' }}>
            <Statistic
              title={<Text style={{ color: '#6f0fe0' }}>Thất bại</Text>}
              value={statistics.failedCount}
              prefix={<CloseCircleOutlined />}
              valueStyle={{ color: '#ef4444' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card style={{ borderRadius: 16, marginBottom: 24, boxShadow: '0 4px 24px rgba(111,15,224,0.05)' }}>
        <Space wrap style={{ width: '100%' }}>
          <Input
            placeholder="Tìm kiếm giao dịch..."
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
            value={paymentMethodFilter}
            onChange={setPaymentMethodFilter}
            style={{ width: 180, borderRadius: 8 }}
            placeholder="Phương thức"
          >
            {paymentMethodOptions.map(opt => (
              <Option key={opt.value} value={opt.value}>{opt.label}</Option>
            ))}
          </Select>
        </Space>
      </Card>

      {/* Transactions Table */}
      <Card style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(111,15,224,0.05)' }}>
        <Table
          columns={columns}
          dataSource={filteredTransactions}
          rowKey="id"
          pagination={{
            pageSize: 10,
            style: { marginTop: 24 },
            showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} giao dịch`,
          }}
          style={{ marginTop: 16 }}
        />
      </Card>
    </div>
  );
};

export default AdminTransactions; 