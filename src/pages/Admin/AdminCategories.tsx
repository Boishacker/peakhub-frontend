import React, { useState, useMemo } from 'react';
import { Typography, Table, Input, Tag, Button, Space, Card, Row, Col, Statistic, Modal, Form, Upload, Tree, Tooltip, message, Select } from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FolderOutlined,
  FileOutlined,
  UploadOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  AppstoreOutlined,
  BookOutlined,
  StarOutlined,
  ArrowUpOutlined
} from '@ant-design/icons';
import type { DataNode, TreeProps } from 'antd/es/tree';

const { Title, Text } = Typography;
const { TextArea } = Input;

// Mock data for categories
const mockCategories = [
  {
    id: 'CAT001',
    name: 'Trí tuệ nhân tạo cơ bản',
    description: 'Các khóa học nền tảng về AI, machine learning và deep learning',
    slug: 'ai-basics',
    icon: 'https://example.com/icons/ai-basics.png',
    status: 'active',
    courseCount: 180,
    parentId: null,
    order: 1,
    createdAt: '2024-01-01T00:00:00',
    children: [
      {
        id: 'CAT001-1',
        name: 'Machine Learning',
        description: 'Học máy và các thuật toán cơ bản',
        slug: 'machine-learning',
        icon: 'https://example.com/icons/ml.png',
        status: 'active',
        courseCount: 85,
        parentId: 'CAT001',
        order: 1,
        createdAt: '2024-01-01T00:00:00',
      },
      {
        id: 'CAT001-2',
        name: 'Deep Learning',
        description: 'Neural Networks và các mô hình học sâu',
        slug: 'deep-learning',
        icon: 'https://example.com/icons/dl.png',
        status: 'active',
        courseCount: 65,
        parentId: 'CAT001',
        order: 2,
        createdAt: '2024-01-01T00:00:00',
      },
      {
        id: 'CAT001-3',
        name: 'Xử lý ngôn ngữ tự nhiên',
        description: 'NLP và các ứng dụng xử lý ngôn ngữ',
        slug: 'nlp',
        icon: 'https://example.com/icons/nlp.png',
        status: 'active',
        courseCount: 30,
        parentId: 'CAT001',
        order: 3,
        createdAt: '2024-01-01T00:00:00',
      }
    ]
  },
  {
    id: 'CAT002',
    name: 'AI trong doanh nghiệp',
    description: 'Ứng dụng AI vào các lĩnh vực kinh doanh và quản lý',
    slug: 'ai-business',
    icon: 'https://example.com/icons/ai-business.png',
    status: 'active',
    courseCount: 150,
    parentId: null,
    order: 2,
    createdAt: '2024-01-02T00:00:00',
    children: [
      {
        id: 'CAT002-1',
        name: 'AI trong Marketing',
        description: 'Ứng dụng AI trong phân tích và tối ưu marketing',
        slug: 'ai-marketing',
        icon: 'https://example.com/icons/ai-marketing.png',
        status: 'active',
        courseCount: 45,
        parentId: 'CAT002',
        order: 1,
        createdAt: '2024-01-02T00:00:00',
      },
      {
        id: 'CAT002-2',
        name: 'AI trong tài chính',
        description: 'AI trong phân tích tài chính và dự đoán thị trường',
        slug: 'ai-finance',
        icon: 'https://example.com/icons/ai-finance.png',
        status: 'active',
        courseCount: 55,
        parentId: 'CAT002',
        order: 2,
        createdAt: '2024-01-02T00:00:00',
      },
      {
        id: 'CAT002-3',
        name: 'AI trong quản lý vận hành',
        description: 'Tối ưu hóa quy trình và tự động hóa với AI',
        slug: 'ai-operations',
        icon: 'https://example.com/icons/ai-operations.png',
        status: 'active',
        courseCount: 50,
        parentId: 'CAT002',
        order: 3,
        createdAt: '2024-01-02T00:00:00',
      }
    ]
  },
  {
    id: 'CAT003',
    name: 'AI trong sáng tạo',
    description: 'Ứng dụng AI trong nghệ thuật và sáng tạo nội dung',
    slug: 'ai-creative',
    icon: 'https://example.com/icons/ai-creative.png',
    status: 'active',
    courseCount: 120,
    parentId: null,
    order: 3,
    createdAt: '2024-01-03T00:00:00',
    children: [
      {
        id: 'CAT003-1',
        name: 'Generative AI',
        description: 'Các mô hình AI tạo sinh như DALL-E, Stable Diffusion',
        slug: 'generative-ai',
        icon: 'https://example.com/icons/generative-ai.png',
        status: 'active',
        courseCount: 40,
        parentId: 'CAT003',
        order: 1,
        createdAt: '2024-01-03T00:00:00',
      },
      {
        id: 'CAT003-2',
        name: 'AI trong thiết kế',
        description: 'Ứng dụng AI trong thiết kế và UX/UI',
        slug: 'ai-design',
        icon: 'https://example.com/icons/ai-design.png',
        status: 'active',
        courseCount: 35,
        parentId: 'CAT003',
        order: 2,
        createdAt: '2024-01-03T00:00:00',
      },
      {
        id: 'CAT003-3',
        name: 'AI trong sáng tạo nội dung',
        description: 'Tạo và biên tập nội dung với AI',
        slug: 'ai-content',
        icon: 'https://example.com/icons/ai-content.png',
        status: 'active',
        courseCount: 45,
        parentId: 'CAT003',
        order: 3,
        createdAt: '2024-01-03T00:00:00',
      }
    ]
  },
  {
    id: 'CAT004',
    name: 'AI trong công nghiệp',
    description: 'Ứng dụng AI trong sản xuất và công nghiệp',
    slug: 'ai-industry',
    icon: 'https://example.com/icons/ai-industry.png',
    status: 'active',
    courseCount: 90,
    parentId: null,
    order: 4,
    createdAt: '2024-01-04T00:00:00',
    children: [
      {
        id: 'CAT004-1',
        name: 'Computer Vision',
        description: 'Thị giác máy tính và ứng dụng trong công nghiệp',
        slug: 'computer-vision',
        icon: 'https://example.com/icons/computer-vision.png',
        status: 'active',
        courseCount: 35,
        parentId: 'CAT004',
        order: 1,
        createdAt: '2024-01-04T00:00:00',
      },
      {
        id: 'CAT004-2',
        name: 'Robotics và AI',
        description: 'AI trong robot và tự động hóa công nghiệp',
        slug: 'robotics-ai',
        icon: 'https://example.com/icons/robotics.png',
        status: 'active',
        courseCount: 30,
        parentId: 'CAT004',
        order: 2,
        createdAt: '2024-01-04T00:00:00',
      },
      {
        id: 'CAT004-3',
        name: 'IoT và AI',
        description: 'Kết hợp IoT và AI trong công nghiệp',
        slug: 'iot-ai',
        icon: 'https://example.com/icons/iot-ai.png',
        status: 'active',
        courseCount: 25,
        parentId: 'CAT004',
        order: 3,
        createdAt: '2024-01-04T00:00:00',
      }
    ]
  }
];

const AdminCategories = () => {
  const [search, setSearch] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form] = Form.useForm();

  // Calculate statistics
  const statistics = useMemo(() => {
    const totalCategories = mockCategories.reduce(
      (acc, cat) => acc + 1 + (cat.children?.length || 0),
      0
    );
    const activeCategories = mockCategories.reduce(
      (acc, cat) => acc + (cat.status === 'active' ? 1 : 0) + (cat.children?.filter(c => c.status === 'active').length || 0),
      0
    );
    const totalCourses = mockCategories.reduce(
      (acc, cat) => acc + cat.courseCount + (cat.children?.reduce((sum, c) => sum + c.courseCount, 0) || 0),
      0
    );
    const mostPopular = mockCategories.reduce((max, cat) => 
      cat.courseCount > (max?.courseCount || 0) ? cat : max
    , null);

    return {
      totalCategories,
      activeCategories,
      totalCourses,
      mostPopular,
    };
  }, []);

  // Convert categories to tree data
  const treeData = useMemo(() => {
    const convertToTreeData = (categories) => {
      return categories.map(cat => ({
        key: cat.id,
        title: (
          <Space>
            <Text>{cat.name}</Text>
            <Tag color={cat.status === 'active' ? 'success' : 'default'}>
              {cat.status === 'active' ? 'Hoạt động' : 'Ẩn'}
            </Tag>
            <Tag color="blue">{cat.courseCount} khóa học</Tag>
          </Space>
        ),
        icon: <FolderOutlined />,
        children: cat.children ? convertToTreeData(cat.children) : undefined,
      }));
    };

    return convertToTreeData(mockCategories);
  }, [mockCategories]);

  const handleAddCategory = () => {
    setEditingCategory(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    form.setFieldsValue({
      name: category.name,
      description: category.description,
      parentId: category.parentId,
      status: category.status,
      order: category.order,
    });
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      console.log('Form values:', values);
      message.success(`${editingCategory ? 'Cập nhật' : 'Thêm'} danh mục thành công!`);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div style={{ padding: '24px 0' }}>
      <Title level={2} style={{ color: '#6f0fe0', marginBottom: 32 }}>Quản lý danh mục</Title>

      {/* Statistics Cards */}
      <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(111,15,224,0.05)' }}>
            <Statistic
              title={<Text style={{ color: '#6f0fe0' }}>Tổng danh mục</Text>}
              value={statistics.totalCategories}
              prefix={<AppstoreOutlined />}
              valueStyle={{ color: '#6f0fe0' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(111,15,224,0.05)' }}>
            <Statistic
              title={<Text style={{ color: '#6f0fe0' }}>Danh mục hoạt động</Text>}
              value={statistics.activeCategories}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#10b981' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(111,15,224,0.05)' }}>
            <Statistic
              title={<Text style={{ color: '#6f0fe0' }}>Tổng khóa học</Text>}
              value={statistics.totalCourses}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#f97316' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(111,15,224,0.05)' }}>
            <Statistic
              title={<Text style={{ color: '#6f0fe0' }}>Danh mục phổ biến</Text>}
              value={statistics.mostPopular?.courseCount}
              prefix={<StarOutlined />}
              suffix={`khóa học - ${statistics.mostPopular?.name}`}
              valueStyle={{ color: '#fbbf24', fontSize: 16 }}
            />
          </Card>
        </Col>
      </Row>

      {/* Category Management */}
      <Card style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(111,15,224,0.05)' }}>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          {/* Header */}
          <Space style={{ justifyContent: 'space-between', width: '100%' }}>
            <Input
              placeholder="Tìm kiếm danh mục..."
              prefix={<SearchOutlined />}
              style={{ width: 300, borderRadius: 8 }}
              value={search}
              onChange={e => setSearch(e.target.value)}
              allowClear
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddCategory}
              style={{ background: '#6f0fe0', borderRadius: 8 }}
            >
              Thêm danh mục
            </Button>
          </Space>

          {/* Category Tree */}
          <Tree
            showIcon
            defaultExpandAll
            treeData={treeData}
            style={{ backgroundColor: '#fff', padding: '16px 0' }}
          />
        </Space>
      </Card>

      {/* Add/Edit Category Modal */}
      <Modal
        title={<Text strong>{editingCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}</Text>}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          style={{ marginTop: 24 }}
        >
          <Form.Item
            name="name"
            label="Tên danh mục"
            rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}
          >
            <Input placeholder="Nhập tên danh mục" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
          >
            <TextArea rows={4} placeholder="Nhập mô tả danh mục" />
          </Form.Item>

          <Form.Item
            name="parentId"
            label="Danh mục cha"
          >
            <Select placeholder="Chọn danh mục cha (nếu có)">
              <Select.Option value={null}>Không có</Select.Option>
              {mockCategories.map(cat => (
                <Select.Option key={cat.id} value={cat.id}>{cat.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="icon"
            label="Icon"
          >
            <Upload
              listType="picture-card"
              maxCount={1}
              beforeUpload={() => false}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Tải lên</div>
              </div>
            </Upload>
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Trạng thái"
                initialValue="active"
              >
                <Select>
                  <Select.Option value="active">Hoạt động</Select.Option>
                  <Select.Option value="inactive">Ẩn</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="order"
                label="Thứ tự hiển thị"
                initialValue={1}
              >
                <Input type="number" min={1} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminCategories; 