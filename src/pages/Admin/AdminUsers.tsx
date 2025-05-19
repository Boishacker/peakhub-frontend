import React, { useState, useMemo } from 'react';
import { Typography, Table, Input, Tag, Button, Avatar, Space, Popconfirm, message, Tabs, Badge, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { User } from '../../types/auth';
import { LockOutlined, UnlockOutlined, EyeOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

// Mock user data with extra fields
const mockUsers = [
  {
    id: '1',
    email: 'student@peakhub.com',
    name: 'John Student',
    role: 'student',
    avatar: 'https://ui-avatars.com/api/?name=John+Student&background=random',
    courseCount: 5,
    createdAt: '2023-01-10',
    status: 'active',
  },
  {
    id: '2',
    email: 'instructor@peakhub.com',
    name: 'Jane Instructor',
    role: 'instructor',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Instructor&background=random',
    phone: '0912345678',
    courseCount: 12,
    rating: 4.8,
    revenue: 25000,
    createdAt: '2022-11-05',
    status: 'active',
  },
  {
    id: '3',
    email: 'admin@peakhub.com',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=random',
    courseCount: 0,
    createdAt: '2022-01-01',
    status: 'active',
  },
  {
    id: '4',
    email: 'moderator@peakhub.com',
    name: 'Mod User',
    role: 'moderator',
    avatar: 'https://ui-avatars.com/api/?name=Mod+User&background=random',
    courseCount: 0,
    createdAt: '2023-03-15',
    status: 'locked',
  },
  {
    id: '5',
    email: 'guest@peakhub.com',
    name: 'Guest User',
    role: 'guest',
    avatar: 'https://ui-avatars.com/api/?name=Guest+User&background=random',
    courseCount: 0,
    createdAt: '2023-04-20',
    status: 'active',
  },
  {
    id: '6',
    email: 'teacher2@peakhub.com',
    name: 'Alex Teacher',
    role: 'instructor',
    avatar: 'https://ui-avatars.com/api/?name=Alex+Teacher&background=random',
    phone: '0987654321',
    courseCount: 7,
    rating: 4.5,
    revenue: 15000,
    createdAt: '2023-02-18',
    status: 'locked',
  },
  {
    id: '7',
    email: 'student2@peakhub.com',
    name: 'Lisa Student',
    role: 'student',
    avatar: 'https://ui-avatars.com/api/?name=Lisa+Student&background=random',
    courseCount: 2,
    createdAt: '2023-05-01',
    status: 'active',
  },
];

const statusOptions = [
  { value: 'all', label: 'Tất cả' },
  { value: 'active', label: 'Hoạt động' },
  { value: 'locked', label: 'Đã khóa' },
];

const sortOptionsStudent = [
  { value: 'name', label: 'Tên' },
  { value: 'createdAt', label: 'Ngày tạo' },
  { value: 'courseCount', label: 'Số khóa học' },
];
const sortOptionsInstructor = [
  { value: 'name', label: 'Tên' },
  { value: 'courseCount', label: 'Số khóa học' },
  { value: 'rating', label: 'Đánh giá' },
  { value: 'revenue', label: 'Doanh thu' },
];

// Custom styles for user management tabs (reuse from MyLearning)
const customStyles = `
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
    border-radius: 16px 16px 0 0;
    background: transparent;
  }
  .learning-tabs .ant-tabs-content {
    transition: all 0.3s ease;
  }
`;

const AdminUsers = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortByStudent, setSortByStudent] = useState('name');
  const [sortByInstructor, setSortByInstructor] = useState('name');
  const [users, setUsers] = useState(mockUsers);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('adminActiveTab') || 'student');

  // Xóa user
  const handleDelete = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    message.success('Đã xóa tài khoản!');
  };

  // Khóa/mở tài khoản
  const handleToggleLock = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'locked' ? 'active' : 'locked' } : u));
    message.success('Đã cập nhật trạng thái tài khoản!');
  };

  // Filter, sort, search cho student
  const studentData = useMemo(() => {
    let data = users.filter(u => u.role === 'student');
    if (statusFilter !== 'all') data = data.filter(u => u.status === statusFilter);
    if (search) data = data.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));
    data = [...data].sort((a, b) => {
      if (sortByStudent === 'name') return a.name.localeCompare(b.name);
      if (sortByStudent === 'createdAt') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortByStudent === 'courseCount') return (b.courseCount || 0) - (a.courseCount || 0);
      return 0;
    });
    return data;
  }, [users, statusFilter, search, sortByStudent]);

  // Filter, sort, search cho instructor
  const instructorData = useMemo(() => {
    let data = users.filter(u => u.role === 'instructor');
    if (statusFilter !== 'all') data = data.filter(u => u.status === statusFilter);
    if (search) data = data.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));
    data = [...data].sort((a, b) => {
      if (sortByInstructor === 'name') return a.name.localeCompare(b.name);
      if (sortByInstructor === 'courseCount') return (b.courseCount || 0) - (a.courseCount || 0);
      if (sortByInstructor === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortByInstructor === 'revenue') return (b.revenue || 0) - (a.revenue || 0);
      return 0;
    });
    return data;
  }, [users, statusFilter, search, sortByInstructor]);

  // Cột cho student
  const studentColumns = [
    {
      title: 'STT',
      key: 'index',
      render: (_: any, __: any, index: number) => index + 1,
      align: 'center' as const,
      width: 60,
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <b style={{ color: '#6f0fe0' }}>{text}</b>,
      width: 180,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text: string) => <span style={{ color: '#888' }}>{text}</span>,
      width: 220,
    },
    {
      title: 'Số khóa học',
      dataIndex: 'courseCount',
      key: 'courseCount',
      render: (count: number) => <Badge count={count} style={{ background: 'linear-gradient(90deg,#a084e8,#6f0fe0)', color: '#fff', fontWeight: 600 }} />,
      align: 'center' as const,
      width: 120,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
      width: 120,
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_: any, record: any) => (
        record.status === 'locked' ? <Tag color="red" style={{ borderRadius: 8, fontWeight: 600 }}>Đã khóa</Tag> : <Tag color="#6f0fe0" style={{ borderRadius: 8, fontWeight: 600 }}>Hoạt động</Tag>
      ),
      align: 'center' as const,
      width: 120,
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            style={{ background: 'linear-gradient(90deg,#a084e8,#6f0fe0)', color: '#fff', border: 'none', borderRadius: 20, boxShadow: '0 2px 8px #a084e822' }}
            onClick={() => {
              if (record.role === 'instructor') {
                navigate(`/instructor/profile/${record.id}`);
              } else {
                navigate(`/profile/${record.id}`);
              }
            }}
            size="small"
          >
            Xem
          </Button>
          <Popconfirm
            title="Bạn chắc chắn muốn xóa tài khoản này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button
              icon={<DeleteOutlined />}
              danger
              style={{ border: 'none', borderRadius: 20, boxShadow: '0 2px 8px #f8717188' }}
              size="small"
            >
              Xóa
            </Button>
          </Popconfirm>
          <Button
            icon={record.status === 'locked' ? <UnlockOutlined /> : <LockOutlined />}
            style={{ border: 'none', borderRadius: 20, background: record.status === 'locked' ? '#a084e8' : '#ede9fe', color: record.status === 'locked' ? '#fff' : '#6f0fe0' }}
            onClick={() => handleToggleLock(record.id)}
            size="small"
          >
            {record.status === 'locked' ? 'Mở khóa' : 'Khóa'}
          </Button>
        </Space>
      ),
      align: 'center' as const,
      width: 220,
    },
  ];

  // Cột cho instructor
  const instructorColumns = [
    {
      title: 'STT',
      key: 'index',
      render: (_: any, __: any, index: number) => index + 1,
      align: 'center' as const,
      width: 60,
    },
    {
      title: 'Tên giảng viên',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <b style={{ color: '#6f0fe0' }}>{text}</b>,
      width: 180,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text: string) => <span style={{ color: '#888' }}>{text}</span>,
      width: 220,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      render: (text: string) => <span>{text || 'Chưa cập nhật'}</span>,
      width: 140,
    },
    {
      title: 'Số khóa học',
      dataIndex: 'courseCount',
      key: 'courseCount',
      render: (count: number) => <Badge count={count} style={{ background: 'linear-gradient(90deg,#a084e8,#6f0fe0)', color: '#fff', fontWeight: 600 }} />,
      align: 'center' as const,
      width: 120,
    },
    {
      title: 'Đánh giá TB',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => (
        <span style={{ color: '#fbbf24', fontWeight: 600 }}>
          {rating ? `${rating.toFixed(1)} ★` : 'Chưa có'}
        </span>
      ),
      align: 'center' as const,
      width: 120,
    },
    {
      title: 'Doanh thu',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (amount: number) => (
        <span style={{ color: '#10b981', fontWeight: 600 }}>
          {amount ? `$${amount.toLocaleString()}` : '$0'}
        </span>
      ),
      align: 'right' as const,
      width: 120,
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_: any, record: any) => (
        record.status === 'locked' ? 
          <Tag color="red" style={{ borderRadius: 8, fontWeight: 600 }}>Đã khóa</Tag> : 
          <Tag color="#6f0fe0" style={{ borderRadius: 8, fontWeight: 600 }}>Hoạt động</Tag>
      ),
      align: 'center' as const,
      width: 120,
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            style={{ background: 'linear-gradient(90deg,#a084e8,#6f0fe0)', color: '#fff', border: 'none', borderRadius: 20, boxShadow: '0 2px 8px #a084e822' }}
            onClick={() => navigate(`/instructor/profile/${record.id}`)}
            size="small"
          >
            Xem
          </Button>
          <Button
            icon={record.status === 'locked' ? <UnlockOutlined /> : <LockOutlined />}
            style={{ border: 'none', borderRadius: 20, background: record.status === 'locked' ? '#a084e8' : '#ede9fe', color: record.status === 'locked' ? '#fff' : '#6f0fe0' }}
            onClick={() => handleToggleLock(record.id)}
            size="small"
          >
            {record.status === 'locked' ? 'Mở khóa' : 'Khóa'}
          </Button>
        </Space>
      ),
      align: 'center' as const,
      width: 180,
    },
  ];

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    localStorage.setItem('adminActiveTab', key);
  };

  return (
    <>
      <style>{customStyles}</style>
      <div style={{ maxWidth: 1200, margin: '40px auto', padding: 0 }}>
        <Title level={2} style={{ color: '#6f0fe0', margin: '24px 0 16px 0' }}>Quản lý người dùng</Title>
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 32px rgba(111,15,224,0.08)', padding: 24 }}>
          <Tabs
            activeKey={activeTab}
            onChange={handleTabChange}
            className="learning-tabs"
            tabBarStyle={{ borderRadius: 16, padding: 4, width: 320 }}
            style={{ borderRadius: 16 }}
            tabBarGutter={8}
            moreIcon={null}
          >
            <TabPane
              tab={<span style={{ fontWeight: 600, color: '#6f0fe0', fontSize: 16 }}>Người học</span>}
              key="student"
            >
              <div style={{ marginBottom: 24, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                <Input
                  placeholder="Tìm kiếm tên hoặc email..."
                  prefix={<SearchOutlined />}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{ width: 260, borderRadius: 8 }}
                  allowClear
                />
                <Select
                  value={statusFilter}
                  onChange={setStatusFilter}
                  style={{ width: 140, borderRadius: 8 }}
                >
                  {statusOptions.map(opt => <Option key={opt.value} value={opt.value}>{opt.label}</Option>)}
                </Select>
                <Select
                  value={sortByStudent}
                  onChange={setSortByStudent}
                  style={{ width: 160, borderRadius: 8 }}
                  dropdownMatchSelectWidth={false}
                >
                  {sortOptionsStudent.map(opt => <Option key={opt.value} value={opt.value}>{'Sắp xếp theo ' + opt.label}</Option>)}
                </Select>
              </div>
              <Table
                columns={studentColumns}
                dataSource={studentData}
                rowKey="id"
                bordered
                pagination={{ pageSize: 8 }}
                style={{ borderRadius: 16 }}
              />
            </TabPane>
            <TabPane
              tab={<span style={{ fontWeight: 600, color: '#a084e8', fontSize: 16 }}>Giảng viên</span>}
              key="instructor"
            >
              <div style={{ marginBottom: 24, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                <Input
                  placeholder="Tìm kiếm tên hoặc email..."
                  prefix={<SearchOutlined />}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{ width: 260, borderRadius: 8 }}
                  allowClear
                />
                <Select
                  value={statusFilter}
                  onChange={setStatusFilter}
                  style={{ width: 140, borderRadius: 8 }}
                >
                  {statusOptions.map(opt => <Option key={opt.value} value={opt.value}>{opt.label}</Option>)}
                </Select>
                <Select
                  value={sortByInstructor}
                  onChange={setSortByInstructor}
                  style={{ width: 160, borderRadius: 8 }}
                  dropdownMatchSelectWidth={false}
                >
                  {sortOptionsInstructor.map(opt => <Option key={opt.value} value={opt.value}>{'Sắp xếp theo ' + opt.label}</Option>)}
                </Select>
              </div>
              <Table
                columns={instructorColumns}
                dataSource={instructorData}
                rowKey="id"
                bordered
                pagination={{ pageSize: 8 }}
                style={{ borderRadius: 16 }}
              />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default AdminUsers; 