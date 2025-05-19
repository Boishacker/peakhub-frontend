import React, { useState } from 'react';
import { Layout, Menu, Button, Modal, Input, Dropdown } from 'antd';
import {
  DashboardOutlined,
  BookOutlined,
  TeamOutlined,
  StarOutlined,
  BarChartOutlined,
  MessageOutlined,
  UserOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
  FilterOutlined,
  SortAscendingOutlined
} from '@ant-design/icons';
import MainLayout from '../../components/layout/MainLayout';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTitle, Tooltip, Legend, ArcElement, PointElement, LineElement);

const { Sider, Content } = Layout;

const menuItems = [
  { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
  { key: 'courses', icon: <BookOutlined />, label: 'Courses' },
  { key: 'reviews', icon: <StarOutlined />, label: 'Reviews' },
  { key: 'messages', icon: <MessageOutlined />, label: 'Messages' },
];

const InstructorPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [modalChart, setModalChart] = useState(null as null | 'revenue' | 'students' | 'courses');
  const navigate = useNavigate();

  // Chart data demo
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [400, 600, 800, 1200, 900, 1340],
        backgroundColor: '#6f0fe0',
        borderRadius: 8,
      },
    ],
  };
  const studentsData = {
    labels: ['Course 1', 'Course 2', 'Course 3', 'Course 4', 'Course 5'],
    datasets: [
      {
        label: 'Students',
        data: [30, 45, 20, 18, 15],
        backgroundColor: [
          '#6f0fe0',
          '#a084e8',
          '#c3b1e1',
          '#ede9fe',
          '#b39ddb',
        ],
      },
    ],
  };
  const coursesData = {
    labels: ['Active', 'Draft', 'Archived'],
    datasets: [
      {
        label: 'Courses',
        data: [5, 2, 1],
        backgroundColor: ['#6f0fe0', '#ede9fe', '#b39ddb'],
      },
    ],
  };

  return (
    <MainLayout>
      <Layout style={{ minHeight: '80vh', background: 'transparent' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          width={220}
          style={{ background: '#f8f6ff', borderRadius: 16, margin: 24, boxShadow: '0 4px 24px 0 rgba(111, 15, 224, 0.07)', border: 'none', transition: 'all 0.3s' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between', padding: 16 }}>
            {!collapsed && <span style={{ fontWeight: 700, color: '#6f0fe0', fontSize: 18 }}>Instructor</span>}
            <Button 
              type="text" 
              onClick={() => setCollapsed(!collapsed)} 
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} 
              style={{ border: 'none', boxShadow: 'none', outline: 'none', background: 'transparent' }}
            />
          </div>
          <Menu
            mode="inline"
            selectedKeys={[activeTab]}
            onClick={({ key }) => setActiveTab(key)}
            style={{ border: 'none', fontWeight: 500, fontSize: 16, background: 'transparent' }}
            items={menuItems.map(item => ({
              ...item,
              className: 'instructor-menu-item',
            }))}
          />
          <style>{`
            .instructor-menu-item {
              border: none !important;
              outline: none !important;
              background: transparent !important;
              transition: background 0.2s, color 0.2s;
            }
            .ant-menu-item-selected.instructor-menu-item {
              background: #e9e0fd !important;
              color: #6f0fe0 !important;
              font-weight: 700;
              border-radius: 8px;
            }
            .ant-menu-item.instructor-menu-item:hover {
              background: #ede9fe !important;
              color: #6f0fe0 !important;
            }
            .ant-menu-item:active {
              border: none !important;
              outline: none !important;
            }
          `}</style>
        </Sider>
        <Layout style={{ background: 'transparent' }}>
          <Content style={{ margin: 24, padding: 24, background: '#fff', borderRadius: 16, minHeight: 360, boxShadow: '0 4px 24px 0 rgba(111, 15, 224, 0.07)' }}>
            {activeTab === 'dashboard' && (
              <div>
                <h2 style={{ color: '#6f0fe0', fontWeight: 700, fontSize: 28 }}>Instructor Dashboard</h2>
                <p style={{ color: '#555', fontSize: 18 }}>Welcome! Here you can manage your courses, track your revenue, and interact with students.</p>
                <div style={{ display: 'flex', gap: 24, marginTop: 32, flexWrap: 'wrap' }}>
                  <div style={{ background: '#f8f6ff', borderRadius: 12, padding: 24, minWidth: 220, flex: 1, cursor: 'pointer' }} onClick={() => setModalChart('revenue')}>
                    <h3 style={{ color: '#6f0fe0', margin: 0 }}>Total Revenue</h3>
                    <div style={{ fontSize: 28, fontWeight: 700, margin: '12px 0' }}>$2,340</div>
                    <div style={{ width: 220, height: 120 }}>
                      <Bar data={revenueData} options={{ plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } }, responsive: true, maintainAspectRatio: false }} />
                    </div>
                  </div>
                  <div style={{ background: '#f8f6ff', borderRadius: 12, padding: 24, minWidth: 220, flex: 1, cursor: 'pointer' }} onClick={() => setModalChart('students')}>
                    <h3 style={{ color: '#6f0fe0', margin: 0 }}>Total Students</h3>
                    <div style={{ fontSize: 28, fontWeight: 700, margin: '12px 0' }}>128</div>
                    <div style={{ width: 220, height: 120 }}>
                      <Pie data={studentsData} options={{ plugins: { legend: { position: 'bottom' } }, responsive: true, maintainAspectRatio: false }} />
                    </div>
                  </div>
                  <div style={{ background: '#f8f6ff', borderRadius: 12, padding: 24, minWidth: 220, flex: 1, cursor: 'pointer' }} onClick={() => setModalChart('courses')}>
                    <h3 style={{ color: '#6f0fe0', margin: 0 }}>Active Courses</h3>
                    <div style={{ fontSize: 28, fontWeight: 700, margin: '12px 0' }}>5</div>
                    <div style={{ width: 220, height: 120 }}>
                      <Bar data={coursesData} options={{ plugins: { legend: { display: false } }, indexAxis: 'y', responsive: true, maintainAspectRatio: false }} />
                    </div>
                  </div>
                </div>
                <Modal open={modalChart === 'revenue'} onCancel={() => setModalChart(null)} footer={null} width={600} title="Revenue Details">
                  <div style={{ maxWidth: 550, maxHeight: 350 }}>
                    <Bar data={revenueData} options={{ plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } }, responsive: true, maintainAspectRatio: false }} />
                  </div>
                </Modal>
                <Modal open={modalChart === 'students'} onCancel={() => setModalChart(null)} footer={null} width={600} title="Students Details">
                  <div style={{ maxWidth: 550, maxHeight: 350 }}>
                    <Pie data={studentsData} options={{ plugins: { legend: { position: 'bottom' } }, responsive: true, maintainAspectRatio: false }} />
                  </div>
                </Modal>
                <Modal open={modalChart === 'courses'} onCancel={() => setModalChart(null)} footer={null} width={600} title="Courses Details">
                  <div style={{ maxWidth: 550, maxHeight: 350 }}>
                    <Bar data={coursesData} options={{ plugins: { legend: { display: false } }, indexAxis: 'y', responsive: true, maintainAspectRatio: false }} />
                  </div>
                </Modal>
              </div>
            )}
            {activeTab === 'courses' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, gap: 16, flexWrap: 'wrap' }}>
                  <h2 style={{ color: '#6f0fe0', fontWeight: 700, fontSize: 24, margin: 0 }}>My Courses</h2>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <Input.Search placeholder="Search courses" style={{ width: 220, borderRadius: 8 }} />
                    <Dropdown overlay={<Menu items={[{label: 'All', key: 'all'}, {label: 'Published', key: 'published'}, {label: 'Draft', key: 'draft'}]} />}>
                      <Button icon={<FilterOutlined />} style={{ borderRadius: 8, background: '#ede9fe', color: '#6f0fe0', fontWeight: 600 }}>
                        Filter <DownOutlined />
                      </Button>
                    </Dropdown>
                    <Dropdown overlay={<Menu items={[{label: 'Newest', key: 'newest'}, {label: 'Most Students', key: 'students'}, {label: 'Highest Rated', key: 'rating'}]} />}>
                      <Button icon={<SortAscendingOutlined />} style={{ borderRadius: 8, background: '#ede9fe', color: '#6f0fe0', fontWeight: 600 }}>
                        Sort <DownOutlined />
                      </Button>
                    </Dropdown>
                    <Button type="primary" style={{ background: '#6f0fe0', borderColor: '#6f0fe0', borderRadius: 8, fontWeight: 600, boxShadow: '0 2px 8px rgba(111, 15, 224, 0.08)' }}>
                      + Create New Course
                    </Button>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {/* Demo horizontal course cards */}
                  {[1,2,3].map((i) => (
                    <div key={i} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px 0 rgba(111, 15, 224, 0.07)', padding: 20, display: 'flex', alignItems: 'center', gap: 24, border: '1px solid #ede9fe', transition: 'box-shadow 0.2s' }}>
                      <div style={{ width: 80, height: 80, background: '#f8f6ff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, color: '#6f0fe0', fontWeight: 700 }}>AI</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 20, color: '#3b256b' }}>Course Title {i}</div>
                        <div style={{ color: '#888', fontSize: 15, margin: '6px 0' }}>120 students • 4.8 ★</div>
                        <div style={{ color: '#555', fontSize: 15 }}>Short description of the course goes here. This is a demo for UI/UX.</div>
                      </div>
                      <div style={{ display: 'flex', gap: 12 }}>
                        <Button style={{ background: '#ede9fe', color: '#6f0fe0', border: 'none', borderRadius: 6, fontWeight: 600 }}>Edit</Button>
                        <Button style={{ background: '#fff0f6', color: '#d72660', border: 'none', borderRadius: 6, fontWeight: 600 }}>Delete</Button>
                        <Button style={{ background: '#f8f6ff', color: '#6f0fe0', border: 'none', borderRadius: 6, fontWeight: 600 }} onClick={() => navigate(`/course/${i}`)}>View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div>
                <h2 style={{ color: '#6f0fe0', fontWeight: 700, fontSize: 24, marginBottom: 24 }}>Course Reviews</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                  {/* Demo: reviews grouped by course */}
                  {[1,2].map((courseIdx) => (
                    <div key={courseIdx} style={{ background: '#f8f6ff', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px 0 rgba(111, 15, 224, 0.07)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 12 }}>
                        <div style={{ width: 64, height: 64, background: '#f8f6ff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: '#6f0fe0', fontWeight: 700 }}>AI</div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 18, color: '#6f0fe0' }}>Course Title {courseIdx}</div>
                          <div style={{ color: '#888', fontSize: 14 }}>120 students • 4.8 ★</div>
                          <div style={{ color: '#555', fontSize: 14 }}>Short description of the course goes here.</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                        {[1,2,3].map((r) => (
                          <div key={r} style={{ background: '#fff', borderRadius: 8, padding: 18, boxShadow: '0 1px 6px 0 rgba(111, 15, 224, 0.04)', display: 'flex', alignItems: 'flex-start', gap: 16, border: '1px solid #ede9fe', transition: 'box-shadow 0.2s' }}>
                            <div style={{ width: 48, height: 48, background: '#ede9fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#6f0fe0', fontSize: 20 }}>U</div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 600, color: '#3b256b', fontSize: 16 }}>User Name {r}</div>
                              <div style={{ color: '#888', fontSize: 14, margin: '2px 0 6px 0' }}>
                                "This course is amazing! Learned a lot."
                              </div>
                              <div style={{ color: '#6f0fe0', fontWeight: 600, fontSize: 15 }}>4.8 ★</div>
                            </div>
                            <div style={{ color: '#b39ddb', fontSize: 13 }}>2 days ago</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'messages' && (
              <div style={{ display: 'flex', height: 480, background: '#f8f6ff', borderRadius: 16, boxShadow: '0 2px 12px 0 rgba(111, 15, 224, 0.07)', overflow: 'hidden' }}>
                {/* Left: user list */}
                <div className="min-w-[260px] max-w-[340px] w-[320px] bg-[#ede9fe] border-r border-[#e0e0e0] flex flex-col" style={{ flex: '0 0 320px' }}>
                  <div style={{ fontWeight: 700, color: '#6f0fe0', fontSize: 18, padding: 20, borderBottom: '1px solid #e0e0e0' }}>Messages</div>
                  <div style={{ flex: 1, overflowY: 'auto' }}>
                    {[1,2,3].map((u) => (
                      <div key={u} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 14px', cursor: 'pointer', background: u === 1 ? '#f8f6ff' : 'transparent', transition: 'background 0.2s' }}>
                        <div style={{ width: 38, height: 38, background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#6f0fe0', fontSize: 16, boxShadow: '0 1px 4px 0 rgba(111, 15, 224, 0.06)' }}>U</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, color: '#3b256b', fontSize: 14, lineHeight: 1.2 }}>User {u}</div>
                          <div style={{ color: '#888', fontSize: 12, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Last message preview from user {u}...</div>
                        </div>
                        <div style={{ color: '#b39ddb', fontSize: 11 }}>2m</div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Right: chat box */}
                <div className="flex-1 flex flex-col bg-white" style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 700, color: '#6f0fe0', fontSize: 16, padding: 16, borderBottom: '1px solid #ede9fe' }}>User 1</div>
                  <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {/* Demo chat bubbles */}
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                      <div style={{ width: 32, height: 32, background: '#ede9fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#6f0fe0', fontSize: 13, marginBottom: 2 }}>U</div>
                      <div style={{ alignSelf: 'flex-start', background: '#ede9fe', color: '#3b256b', borderRadius: 16, padding: '8px 14px', maxWidth: '70%', fontSize: 14, boxShadow: '0 1px 4px 0 rgba(111, 15, 224, 0.04)' }}>
                        Hi Instructor, I have a question about the course.
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, justifyContent: 'flex-end' }}>
                      <div style={{ alignSelf: 'flex-end', background: '#6f0fe0', color: '#fff', borderRadius: 16, padding: '8px 14px', maxWidth: '70%', fontSize: 14, boxShadow: '0 1px 4px 0 rgba(111, 15, 224, 0.08)' }}>
                        Sure! How can I help you?
                      </div>
                      <div style={{ width: 32, height: 32, background: '#6f0fe0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff', fontSize: 13, marginBottom: 2 }}>I</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                      <div style={{ width: 32, height: 32, background: '#ede9fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#6f0fe0', fontSize: 13, marginBottom: 2 }}>U</div>
                      <div style={{ alignSelf: 'flex-start', background: '#ede9fe', color: '#3b256b', borderRadius: 16, padding: '8px 14px', maxWidth: '70%', fontSize: 14, boxShadow: '0 1px 4px 0 rgba(111, 15, 224, 0.04)' }}>
                        I want to know more about the assignments.
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: 16, borderTop: '1px solid #ede9fe', background: '#f8f6ff', display: 'flex', gap: 10 }}>
                    <Input placeholder="Type your message..." style={{ borderRadius: 8, background: '#fff' }} />
                    <Button type="primary" style={{ background: '#6f0fe0', borderColor: '#6f0fe0', borderRadius: 8, fontWeight: 600 }}>Send</Button>
                  </div>
                </div>
              </div>
            )}
          </Content>
        </Layout>
      </Layout>
      <style>{`
        .ant-layout-sider-trigger {
          display: none !important;
        }
      `}</style>
    </MainLayout>
  );
};

export default InstructorPage; 