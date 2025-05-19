import React, { useState } from 'react';
import {
  Layout,
  Typography,
  Tabs,
  Form,
  Input,
  Select,
  Switch,
  Button,
  Card,
  Space,
  InputNumber,
  Upload,
  Divider,
  message,
  Tag,
  Row,
  Col
} from 'antd';
import {
  GlobalOutlined,
  SecurityScanOutlined,
  MailOutlined,
  DollarOutlined,
  CloudOutlined,
  TeamOutlined,
  BellOutlined,
  ApiOutlined,
  UploadOutlined,
  SettingOutlined
} from '@ant-design/icons';
import type { TabsProps } from 'antd';
import MainLayout from '../../components/layout/MainLayout';

const { Title, Text } = Typography;

const AdminSettings = () => {
  const [form] = Form.useForm();

  const handleSave = () => {
    message.success('Đã lưu cài đặt thành công');
  };

  const items: TabsProps['items'] = [
    {
      key: 'general',
      label: (
        <span>
          <GlobalOutlined /> Cài đặt chung
        </span>
      ),
      children: (
        <Card>
          <Form layout="vertical">
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="Tên nền tảng"
                  name="platformName"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="VD: PeakHub" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Timezone"
                  name="timezone"
                  rules={[{ required: true }]}
                >
                  <Select
                    options={[
                      { value: 'Asia/Ho_Chi_Minh', label: '(GMT+7) Hồ Chí Minh' },
                      { value: 'Asia/Bangkok', label: '(GMT+7) Bangkok' },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Logo"
                  name="logo"
                >
                  <Upload maxCount={1}>
                    <Button icon={<UploadOutlined />}>Tải lên logo</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Favicon"
                  name="favicon"
                >
                  <Upload maxCount={1}>
                    <Button icon={<UploadOutlined />}>Tải lên favicon</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      ),
    },
    {
      key: 'security',
      label: (
        <span>
          <SecurityScanOutlined /> Bảo mật
        </span>
      ),
      children: (
        <Card>
          <Form layout="vertical">
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="Độ dài mật khẩu tối thiểu"
                  name="minPasswordLength"
                >
                  <InputNumber min={6} max={32} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Thời gian session (giờ)"
                  name="sessionDuration"
                >
                  <InputNumber min={1} max={72} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Xác thực 2 lớp"
                  name="twoFactorAuth"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Giới hạn đăng nhập thất bại"
                  name="maxLoginAttempts"
                >
                  <InputNumber min={3} max={10} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      ),
    },
    {
      key: 'email',
      label: (
        <span>
          <MailOutlined /> Email
        </span>
      ),
      children: (
        <Card>
          <Form layout="vertical">
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="SMTP Host"
                  name="smtpHost"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="SMTP Port"
                  name="smtpPort"
                >
                  <InputNumber />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Email gửi"
                  name="senderEmail"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Tên người gửi"
                  name="senderName"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Mẫu email chào mừng"
                  name="welcomeTemplate"
                >
                  <Input.TextArea rows={4} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      ),
    },
    {
      key: 'payment',
      label: (
        <span>
          <DollarOutlined /> Thanh toán
        </span>
      ),
      children: (
        <Card>
          <Form layout="vertical">
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="Đơn vị tiền tệ"
                  name="currency"
                >
                  <Select
                    options={[
                      { value: 'VND', label: 'VND - Việt Nam Đồng' },
                      { value: 'USD', label: 'USD - US Dollar' },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Phương thức thanh toán"
                  name="paymentMethods"
                  rules={[{ required: true }]}
                >
                  <Select
                    mode="multiple"
                    options={[
                      { value: 'momo', label: 'Momo' },
                      { value: 'vnpay', label: 'VNPay' },
                      { value: 'stripe', label: 'Stripe' },
                      { value: 'paypal', label: 'PayPal' },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Phí nền tảng (%)"
                  name="platformFee"
                >
                  <InputNumber min={0} max={100} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      ),
    },
    {
      key: 'storage',
      label: (
        <span>
          <CloudOutlined /> Lưu trữ
        </span>
      ),
      children: (
        <Card>
          <Form layout="vertical">
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="Dịch vụ lưu trữ"
                  name="storageService"
                >
                  <Select
                    options={[
                      { value: 'local', label: 'Local Storage' },
                      { value: 's3', label: 'Amazon S3' },
                      { value: 'gcs', label: 'Google Cloud Storage' },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Giới hạn dung lượng file (MB)"
                  name="maxFileSize"
                >
                  <InputNumber min={1} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Định dạng file cho phép"
                  name="allowedFileTypes"
                >
                  <Select
                    mode="multiple"
                    options={[
                      { value: 'video', label: 'Video (.mp4, .webm)' },
                      { value: 'document', label: 'Document (.pdf, .doc)' },
                      { value: 'image', label: 'Image (.jpg, .png)' },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      ),
    },
    {
      key: 'users',
      label: (
        <span>
          <TeamOutlined /> Người dùng
        </span>
      ),
      children: (
        <Card>
          <Form layout="vertical">
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="Cho phép đăng ký"
                  name="allowRegistration"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Xác thực email"
                  name="requireEmailVerification"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Vai trò mặc định"
                  name="defaultRole"
                >
                  <Select
                    options={[
                      { value: 'student', label: 'Học viên' },
                      { value: 'instructor', label: 'Giảng viên' },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Điều khoản sử dụng"
                  name="termsOfService"
                >
                  <Input.TextArea rows={4} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      ),
    },
    {
      key: 'notifications',
      label: (
        <span>
          <BellOutlined /> Thông báo
        </span>
      ),
      children: (
        <Card>
          <Form layout="vertical">
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="Thông báo qua email"
                  name="emailNotifications"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Thông báo trong ứng dụng"
                  name="inAppNotifications"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Loại thông báo"
                  name="notificationTypes"
                >
                  <Select
                    mode="multiple"
                    options={[
                      { value: 'course_updates', label: 'Cập nhật khóa học' },
                      { value: 'new_reviews', label: 'Đánh giá mới' },
                      { value: 'promotions', label: 'Khuyến mãi' },
                      { value: 'system_updates', label: 'Cập nhật hệ thống' },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      ),
    },
    {
      key: 'integrations',
      label: (
        <span>
          <ApiOutlined /> Tích hợp
        </span>
      ),
      children: (
        <Card>
          <Form layout="vertical">
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  label="Google Analytics ID"
                  name="googleAnalyticsId"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Facebook Pixel ID"
                  name="facebookPixelId"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Tích hợp Chat"
                  name="chatIntegration"
                >
                  <Select
                    options={[
                      { value: 'none', label: 'Không sử dụng' },
                      { value: 'tawk', label: 'Tawk.to' },
                      { value: 'messenger', label: 'Facebook Messenger' },
                      { value: 'custom', label: 'Tùy chỉnh' },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      ),
    },
  ];

  return (
    <MainLayout>
      <Layout.Content style={{ padding: '24px', minHeight: '100vh', background: '#f0f2f5' }}>
        <Card>
          <Title level={2} style={{ marginBottom: 24 }}>Cài đặt hệ thống</Title>
          <Tabs
            defaultActiveKey="general"
            items={items}
            style={{ marginBottom: 24 }}
          />
          <div style={{ textAlign: 'right' }}>
            <Button type="primary" onClick={handleSave} style={{ background: '#6f0fe0' }}>
              Lưu cài đặt
            </Button>
          </div>
        </Card>
      </Layout.Content>
    </MainLayout>
  );
};

export default AdminSettings; 