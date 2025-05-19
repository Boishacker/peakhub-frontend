import React from 'react';
import { Badge, Dropdown, List, Typography, Space, Button, Empty, Tabs } from 'antd';
import { BellOutlined, CheckOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

// Mock data for notifications
const mockNotifications = {
  unread: [
    {
      id: 1,
      title: 'Khóa học mới',
      message: 'Khóa học "Machine Learning Cơ bản" vừa được phát hành',
      time: '5 phút trước',
      type: 'course'
    },
    {
      id: 2,
      title: 'Đánh giá mới',
      message: 'Bạn có một đánh giá mới cần duyệt',
      time: '10 phút trước',
      type: 'review'
    }
  ],
  read: [
    {
      id: 3,
      title: 'Giao dịch thành công',
      message: 'Đã xác nhận thanh toán khóa học AI cho doanh nghiệp',
      time: '1 giờ trước',
      type: 'transaction'
    },
    {
      id: 4,
      title: 'Người dùng mới',
      message: '5 học viên mới đã đăng ký tham gia',
      time: '2 giờ trước',
      type: 'user'
    }
  ]
};

interface NotificationType {
  id: number;
  title: string;
  message: string;
  time: string;
  type: string;
}

const NotificationsDropdown = () => {
  const [open, setOpen] = React.useState(false);

  const items = [
    {
      key: 'unread',
      label: `Chưa đọc (${mockNotifications.unread.length})`,
      children: (
        <List
          itemLayout="horizontal"
          dataSource={mockNotifications.unread}
          renderItem={(item: NotificationType) => (
            <List.Item
              actions={[
                <Button
                  type="text"
                  icon={<CheckOutlined />}
                  size="small"
                  style={{ color: '#6f0fe0' }}
                >
                  Đánh dấu đã đọc
                </Button>
              ]}
              style={{ padding: '12px 0' }}
            >
              <List.Item.Meta
                title={<Text strong>{item.title}</Text>}
                description={
                  <Space direction="vertical" size={4}>
                    <Text>{item.message}</Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>{item.time}</Text>
                  </Space>
                }
              />
            </List.Item>
          )}
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Không có thông báo mới"
              />
            )
          }}
        />
      ),
    },
    {
      key: 'read',
      label: 'Đã đọc',
      children: (
        <List
          itemLayout="horizontal"
          dataSource={mockNotifications.read}
          renderItem={(item: NotificationType) => (
            <List.Item style={{ padding: '12px 0' }}>
              <List.Item.Meta
                title={<Text>{item.title}</Text>}
                description={
                  <Space direction="vertical" size={4}>
                    <Text type="secondary">{item.message}</Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>{item.time}</Text>
                  </Space>
                }
              />
            </List.Item>
          )}
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Không có thông báo"
              />
            )
          }}
        />
      ),
    },
  ];

  const dropdownContent = (
    <div style={{ width: 400, maxHeight: 500, overflow: 'auto', padding: '0 16px' }}>
      <div style={{ padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
        <Space align="center" style={{ width: '100%', justifyContent: 'space-between' }}>
          <Title level={5} style={{ margin: 0 }}>Thông báo</Title>
          <Button type="link" size="small" style={{ color: '#6f0fe0', padding: 0 }}>
            Đánh dấu tất cả đã đọc
          </Button>
        </Space>
      </div>
      <Tabs
        items={items}
        style={{ marginTop: 8 }}
      />
      <div style={{ padding: '8px 0', borderTop: '1px solid #f0f0f0', textAlign: 'center' }}>
        <Button type="link" style={{ color: '#6f0fe0' }}>
          Xem tất cả thông báo
        </Button>
      </div>
    </div>
  );

  return (
    <Dropdown
      overlay={dropdownContent}
      trigger={['click']}
      open={open}
      onOpenChange={setOpen}
      placement="bottomRight"
      arrow={{ pointAtCenter: true }}
      dropdownRender={(menu) => (
        <div style={{ 
          backgroundColor: '#fff',
          borderRadius: 8,
          boxShadow: '0 6px 16px 0 rgba(0, 0, 0, 0.08)',
          border: '1px solid #f0f0f0'
        }}>
          {menu}
        </div>
      )}
    >
      <Badge count={mockNotifications.unread.length} offset={[-2, 2]}>
        <Button
          type="text"
          icon={<BellOutlined style={{ fontSize: 20 }} />}
          style={{ height: 40, width: 40 }}
        />
      </Badge>
    </Dropdown>
  );
};

export default NotificationsDropdown; 