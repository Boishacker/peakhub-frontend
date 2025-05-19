import React, { useState } from 'react';
import {
  Typography,
  Card,
  Table,
  Tag,
  Space,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Switch,
  Upload,
  Tabs,
  Tooltip,
  message,
  Collapse
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  EyeOutlined,
  UploadOutlined,
  LinkOutlined,
  HomeOutlined,
  BookOutlined,
  TeamOutlined,
  QuestionCircleOutlined,
  InfoCircleOutlined,
  RocketOutlined,
  BulbOutlined,
  TrophyOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import type { TabsProps } from 'antd';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Panel } = Collapse;

// Mock data for homepage sections
const homepageSections = [
  {
    key: 'hero',
    title: 'Hero Banner',
    status: true,
    lastModified: '2024-03-20',
    type: 'banner',
    content: {
      heading: 'Khám phá sức mạnh của AI cùng PeakHub',
      subheading: 'Nền tảng học tập AI hàng đầu Việt Nam',
      cta: 'Bắt đầu học ngay',
      backgroundImage: '/images/hero-banner.jpg'
    }
  },
  {
    key: 'features',
    title: 'Điểm nổi bật',
    status: true,
    lastModified: '2024-03-19',
    type: 'features',
    content: {
      heading: 'Tại sao chọn PeakHub?',
      features: [
        {
          icon: 'rocket',
          title: 'Học từ chuyên gia',
          description: 'Giảng viên là các chuyên gia AI hàng đầu'
        },
        {
          icon: 'bulb',
          title: 'Thực hành thực tế',
          description: 'Dự án thực tế, case study từ doanh nghiệp'
        },
        {
          icon: 'trophy',
          title: 'Chứng chỉ giá trị',
          description: 'Chứng chỉ được công nhận bởi doanh nghiệp'
        }
      ]
    }
  },
  {
    key: 'categories',
    title: 'Danh mục khóa học',
    status: true,
    lastModified: '2024-03-18',
    type: 'categories',
    content: {
      heading: 'Khám phá các lĩnh vực AI',
      categories: [
        {
          title: 'AI Cơ bản',
          description: 'Nền tảng về trí tuệ nhân tạo',
          image: '/images/basic-ai.jpg'
        },
        {
          title: 'AI trong Doanh nghiệp',
          description: 'Ứng dụng AI vào kinh doanh',
          image: '/images/business-ai.jpg'
        }
      ]
    }
  }
];

// Mock data for other pages
const staticPages = [
  {
    key: 'about',
    title: 'Về chúng tôi',
    status: true,
    lastModified: '2024-03-17',
    type: 'page',
    url: '/about'
  },
  {
    key: 'contact',
    title: 'Liên hệ',
    status: true,
    lastModified: '2024-03-16',
    type: 'page',
    url: '/contact'
  },
  {
    key: 'faq',
    title: 'Câu hỏi thường gặp',
    status: true,
    lastModified: '2024-03-15',
    type: 'page',
    url: '/faq'
  }
];

const AdminPages = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [form] = Form.useForm();

  // Columns for homepage sections table
  const homepageColumns = [
    {
      title: 'Section',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Space>
          {text}
          <Tooltip title="Xem thông tin chi tiết">
            <InfoCircleOutlined style={{ color: '#6f0fe0' }} />
          </Tooltip>
        </Space>
      ),
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        const colors = {
          banner: 'purple',
          features: 'blue',
          categories: 'green',
          testimonials: 'orange'
        };
        return <Tag color={colors[type]}>{type.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status ? 'success' : 'default'}>
          {status ? 'Đang hiển thị' : 'Ẩn'}
        </Tag>
      ),
    },
    {
      title: 'Cập nhật',
      dataIndex: 'lastModified',
      key: 'lastModified',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ color: '#6f0fe0' }}
          />
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handlePreview(record)}
            style={{ color: '#6f0fe0' }}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            danger
          />
        </Space>
      ),
    },
  ];

  // Columns for static pages table
  const pagesColumns = [
    {
      title: 'Trang',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      render: (url) => (
        <Space>
          <LinkOutlined />
          <Text copyable>{url}</Text>
        </Space>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status ? 'success' : 'default'}>
          {status ? 'Đang hiển thị' : 'Ẩn'}
        </Tag>
      ),
    },
    {
      title: 'Cập nhật',
      dataIndex: 'lastModified',
      key: 'lastModified',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ color: '#6f0fe0' }}
          />
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handlePreview(record)}
            style={{ color: '#6f0fe0' }}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            danger
          />
        </Space>
      ),
    },
  ];

  const handleEdit = (record) => {
    setEditingSection(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handlePreview = (record) => {
    message.info('Tính năng xem trước đang được phát triển');
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: `Bạn có chắc chắn muốn xóa ${record.title}?`,
      okText: 'Xóa',
      cancelText: 'Hủy',
      okButtonProps: { danger: true },
      onOk: () => {
        message.success('Đã xóa thành công');
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      message.success('Đã lưu thay đổi thành công');
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const items = [
    {
      key: 'homepage',
      label: (
        <span>
          <HomeOutlined /> Trang chủ
        </span>
      ),
      children: (
        <>
          <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={4} style={{ margin: 0 }}>Quản lý sections trang chủ</Title>
            <Button type="primary" icon={<PlusOutlined />} style={{ background: '#6f0fe0' }}>
              Thêm section mới
            </Button>
          </div>
          <Table
            columns={homepageColumns}
            dataSource={homepageSections}
            rowKey="key"
            style={{ marginTop: 16 }}
          />
        </>
      ),
    },
    {
      key: 'static',
      label: (
        <span>
          <BookOutlined /> Trang tĩnh
        </span>
      ),
      children: (
        <>
          <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={4} style={{ margin: 0 }}>Quản lý trang tĩnh</Title>
            <Button type="primary" icon={<PlusOutlined />} style={{ background: '#6f0fe0' }}>
              Thêm trang mới
            </Button>
          </div>
          <Table
            columns={pagesColumns}
            dataSource={staticPages}
            rowKey="key"
            style={{ marginTop: 16 }}
          />
        </>
      ),
    },
    {
      key: 'recommended',
      label: (
        <span>
          <BulbOutlined /> Gợi ý cấu trúc
        </span>
      ),
      children: (
        <Card style={{ marginTop: 16 }}>
          <Collapse defaultActiveKey={['1']} style={{ background: 'white' }}>
            <Panel header="Cấu trúc trang chủ được đề xuất" key="1">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Card size="small" title="1. Hero Banner" extra={<CheckCircleOutlined style={{ color: '#6f0fe0' }} />}>
                  <Text>Banner chính với thông điệp về AI và học tập, CTA rõ ràng</Text>
                </Card>
                <Card size="small" title="2. Điểm nổi bật" extra={<CheckCircleOutlined style={{ color: '#6f0fe0' }} />}>
                  <Text>3-4 điểm mạnh của nền tảng: Chuyên gia, Thực hành, Chứng chỉ, Cộng đồng</Text>
                </Card>
                <Card size="small" title="3. Danh mục khóa học" extra={<CheckCircleOutlined style={{ color: '#6f0fe0' }} />}>
                  <Text>4 danh mục AI chính với hình ảnh và mô tả ngắn gọn</Text>
                </Card>
                <Card size="small" title="4. Khóa học nổi bật" extra={<CheckCircleOutlined style={{ color: '#6f0fe0' }} />}>
                  <Text>Top 6-8 khóa học được đánh giá cao nhất</Text>
                </Card>
                <Card size="small" title="5. Testimonials" extra={<CheckCircleOutlined style={{ color: '#6f0fe0' }} />}>
                  <Text>Phản hồi từ học viên tiêu biểu và con số thống kê</Text>
                </Card>
                <Card size="small" title="6. Blog & Resources" extra={<CheckCircleOutlined style={{ color: '#6f0fe0' }} />}>
                  <Text>Bài viết mới nhất về AI và tài nguyên học tập</Text>
                </Card>
                <Card size="small" title="7. CTA cuối trang" extra={<CheckCircleOutlined style={{ color: '#6f0fe0' }} />}>
                  <Text>Kêu gọi đăng ký học với ưu đãi đặc biệt</Text>
                </Card>
              </Space>
            </Panel>
            <Panel header="Các trang tĩnh cần thiết" key="2">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Card size="small" title="1. Về chúng tôi" extra={<CheckCircleOutlined style={{ color: '#6f0fe0' }} />}>
                  <Text>Giới thiệu về PeakHub, tầm nhìn, sứ mệnh và đội ngũ</Text>
                </Card>
                <Card size="small" title="2. Liên hệ" extra={<CheckCircleOutlined style={{ color: '#6f0fe0' }} />}>
                  <Text>Form liên hệ, thông tin liên lạc và bản đồ</Text>
                </Card>
                <Card size="small" title="3. FAQ" extra={<CheckCircleOutlined style={{ color: '#6f0fe0' }} />}>
                  <Text>Câu hỏi thường gặp về khóa học và nền tảng</Text>
                </Card>
                <Card size="small" title="4. Điều khoản dịch vụ" extra={<CheckCircleOutlined style={{ color: '#6f0fe0' }} />}>
                  <Text>Điều khoản sử dụng và chính sách</Text>
                </Card>
                <Card size="small" title="5. Chính sách bảo mật" extra={<CheckCircleOutlined style={{ color: '#6f0fe0' }} />}>
                  <Text>Chính sách về dữ liệu và quyền riêng tư</Text>
                </Card>
                <Card size="small" title="6. Blog" extra={<CheckCircleOutlined style={{ color: '#6f0fe0' }} />}>
                  <Text>Trang blog với các bài viết về AI và công nghệ</Text>
                </Card>
              </Space>
            </Panel>
          </Collapse>
        </Card>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px 0' }}>
      <Title level={2} style={{ color: '#6f0fe0', marginBottom: 32 }}>Quản lý nội dung tĩnh</Title>
      
      <Tabs
        defaultActiveKey="homepage"
        items={items}
        style={{ marginTop: 16 }}
      />

      <Modal
        title={editingSection ? `Chỉnh sửa ${editingSection.title}` : 'Thêm mới'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          style={{ marginTop: 24 }}
        >
          <Form.Item
            name="title"
            label="Tiêu đề"
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="type"
            label="Loại"
            rules={[{ required: true, message: 'Vui lòng chọn loại' }]}
          >
            <Select>
              <Select.Option value="banner">Banner</Select.Option>
              <Select.Option value="features">Tính năng</Select.Option>
              <Select.Option value="categories">Danh mục</Select.Option>
              <Select.Option value="testimonials">Đánh giá</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="content"
            label="Nội dung"
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="status"
            label="Trạng thái"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name="image"
            label="Hình ảnh"
          >
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture"
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Tải lên hình ảnh</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminPages; 