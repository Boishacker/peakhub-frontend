import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Avatar, Rate, Skeleton, Row, Col, Typography, Tag } from 'antd';
import { UserOutlined, BookOutlined, TeamOutlined, StarFilled } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import MainLayout from '../../components/layout/MainLayout';

const { Title, Text, Paragraph } = Typography;

// Mock data for demonstration
const mockInstructor = {
  id: '1',
  name: 'Nguyen Van A',
  avatar: '',
  role: 'Instructor',
  bio: 'Giảng viên với hơn 10 năm kinh nghiệm trong lĩnh vực lập trình web và phát triển phần mềm.',
  students: 1200,
  courses: 8,
  rating: 4.8,
  reviews: [
    {
      id: 1,
      user: { name: 'Student 1', avatar: '', },
      rating: 5,
      comment: 'Khóa học rất tuyệt vời, giảng viên nhiệt tình!',
      course: 'React Mastery'
    },
    {
      id: 2,
      user: { name: 'Student 2', avatar: '', },
      rating: 4,
      comment: 'Nội dung chi tiết, dễ hiểu.',
      course: 'NodeJS Pro'
    }
  ],
  courseList: [
    {
      id: 1,
      title: 'React Mastery',
      thumbnail: '',
      rating: 4.9,
      students: 800
    },
    {
      id: 2,
      title: 'NodeJS Pro',
      thumbnail: '',
      rating: 4.7,
      students: 400
    }
  ]
};

const PublicProfile = () => {
  const { instructorId } = useParams();
  const { user } = useAuth();
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Fake API: if instructorId, fetch by id, else use current user
    setTimeout(() => {
      if (instructorId) {
        setInstructor({ ...mockInstructor, id: instructorId, name: `Giảng viên #${instructorId}` });
      } else if (user) {
        setInstructor({
          ...mockInstructor,
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          role: user.role,
          bio: user.bio || mockInstructor.bio
        });
      }
      setLoading(false);
    }, 500);
  }, [instructorId, user]);

  if (loading || !instructor) return <Skeleton active avatar paragraph={{ rows: 6 }} />;

  return (
    <MainLayout>
      <div style={{ maxWidth: 900, margin: '32px auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 32px rgba(111,15,224,0.08)', padding: 32 }}>
        <Row gutter={32} align="middle">
          <Col xs={24} md={6} style={{ textAlign: 'center' }}>
            <Avatar
              size={120}
              src={instructor.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(instructor.name)}&background=6f0fe0&color=fff`}
              style={{ border: '4px solid #6f0fe0', boxShadow: '0 2px 12px #6f0fe033' }}
              icon={<UserOutlined />}
            />
            <Tag color="#6f0fe0" style={{ marginTop: 16, fontWeight: 500 }}>{instructor.role}</Tag>
          </Col>
          <Col xs={24} md={18}>
            <Title level={2} style={{ color: '#6f0fe0', marginBottom: 0 }}>{instructor.name}</Title>
            <Paragraph style={{ color: '#64748b', fontSize: 16 }}>{instructor.bio}</Paragraph>
            <Row gutter={24} style={{ margin: '16px 0' }}>
              <Col><BookOutlined style={{ color: '#6f0fe0' }} /> <Text strong>{instructor.courses}</Text> Khóa học</Col>
              <Col><TeamOutlined style={{ color: '#6f0fe0' }} /> <Text strong>{instructor.students}</Text> Học viên</Col>
              <Col><StarFilled style={{ color: '#fbbf24' }} /> <Text strong>{instructor.rating}</Text> Đánh giá</Col>
            </Row>
          </Col>
        </Row>
        <div style={{ marginTop: 32 }}>
          <Title level={4} style={{ color: '#6f0fe0' }}>Các khóa học của giảng viên</Title>
          <Row gutter={[24, 24]}>
            {instructor.courseList.map((course: any) => (
              <Col xs={24} sm={12} md={8} key={course.id}>
                <Card
                  hoverable
                  style={{ borderRadius: 12, boxShadow: '0 2px 12px #6f0fe022', border: '1px solid #f4f0fe' }}
                  cover={<img alt={course.title} src={course.thumbnail || '/public/mockups/mock4.jpg'} style={{ borderRadius: '12px 12px 0 0', height: 160, objectFit: 'cover' }} />}
                >
                  <Title level={5} style={{ color: '#6f0fe0', marginBottom: 4 }}>{course.title}</Title>
                  <Rate disabled allowHalf value={course.rating} style={{ fontSize: 16 }} />
                  <div style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>{course.students} học viên</div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        <div style={{ marginTop: 40 }}>
          <Title level={4} style={{ color: '#6f0fe0' }}>Đánh giá nổi bật</Title>
          <Row gutter={[16, 16]}>
            {instructor.reviews.map((review: any) => (
              <Col xs={24} md={12} key={review.id}>
                <Card style={{ borderRadius: 10, border: '1px solid #f4f0fe', background: '#f9f7fd' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                    <Avatar size={36} src={review.user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.user.name)}&background=6f0fe0&color=fff`} />
                    <div style={{ marginLeft: 12 }}>
                      <Text strong>{review.user.name}</Text>
                      <div style={{ fontSize: 13, color: '#6f0fe0' }}>{review.course}</div>
                    </div>
                  </div>
                  <Rate disabled value={review.rating} style={{ fontSize: 15 }} />
                  <Paragraph style={{ margin: '8px 0 0 0', color: '#475569' }}>{review.comment}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </MainLayout>
  );
};

export default PublicProfile; 