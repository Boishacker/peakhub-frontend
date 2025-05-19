import React from 'react';
import { Layout, Row, Col, Typography, Space, Divider } from 'antd';
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
  GithubOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import { Link as RouterLink } from 'react-router-dom';

const { Footer: AntFooter } = Layout;
const { Title, Text, Link } = Typography;

const Footer = () => {
  return (
    <AntFooter className="w-full px-0 pb-0 pt-10" style={{ backgroundColor: '#1c1d1f', color: '#fff' }}>
      <div className="content-container">
        <Row gutter={[48, 32]}>
          <Col xs={24} sm={12} md={8}>
            <div className="mb-4">
              <Title level={4} style={{ color: 'white', fontWeight: '700', marginBottom: '16px' }}>PeakHub</Title>
              <Text style={{ color: '#d1d7dc', display: 'block', marginBottom: '16px', fontSize: '14px', lineHeight: '1.5' }}>
                Your journey to the peak of knowledge starts here. Discover courses taught by industry experts and expand your skillset.
              </Text>
            </div>
            <Space size={16}>
              <Link href="#" className="social-icon">
                <FacebookOutlined />
              </Link>
              <Link href="#" className="social-icon">
                <TwitterOutlined />
              </Link>
              <Link href="#" className="social-icon">
                <InstagramOutlined />
              </Link>
              <Link href="#" className="social-icon">
                <LinkedinOutlined />
              </Link>
              <Link href="#" className="social-icon">
                <YoutubeOutlined />
              </Link>
              <Link href="#" className="social-icon">
                <GithubOutlined />
              </Link>
            </Space>
          </Col>
          
          <Col xs={24} sm={12} md={8}>
            <Title level={5} style={{ color: 'white', fontWeight: '700', marginBottom: '16px', fontSize: '16px' }}>Company</Title>
            <ul className="footer-links">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/press">Press</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/affiliates">Affiliates</Link></li>
              <li><Link href="/investors">Investors</Link></li>
            </ul>
          </Col>
          
          <Col xs={24} sm={12} md={8}>
            <Title level={5} style={{ color: 'white', fontWeight: '700', marginBottom: '16px', fontSize: '16px' }}>Resources</Title>
            <ul className="footer-links">
              <li><Link href="/help">Help Center</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/accessibility">Accessibility</Link></li>
              <li><Link href="/sitemap">Sitemap</Link></li>
            </ul>
          </Col>
        </Row>
        
        <div className="language-selector" style={{ marginTop: '40px' }}>
          <Link href="#" style={{ color: '#fff', display: 'inline-flex', alignItems: 'center' }}>
            <GlobalOutlined style={{ marginRight: '8px' }} /> English
          </Link>
        </div>
        
        <Divider style={{ backgroundColor: '#3e4143', margin: '24px 0' }} />
        
        <div className="py-4 flex justify-between items-center flex-wrap" style={{ paddingBottom: '24px' }}>
          <Text style={{ color: '#6a6f73', fontSize: '12px' }}>
            &copy; {new Date().getFullYear()} PeakHub, Inc. All rights reserved.
          </Text>
          <RouterLink to="/">
            <img 
              src="/public/images/logo.png" 
              alt="PeakHub Logo" 
              style={{ height: '80px', width: 'auto' }}
              className="object-contain" 
            />
          </RouterLink>
        </div>
      </div>

      <style>
        {`
          .footer-links {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .footer-links li {
            margin-bottom: 8px;
          }
          .footer-links li a {
            color: #d1d7dc !important;
            font-size: 14px;
            transition: color 0.2s;
          }
          .footer-links li a:hover {
            color: #fff !important;
            text-decoration: underline;
          }
          .social-icon {
            color: #d1d7dc !important;
            font-size: 18px;
            transition: color 0.2s;
          }
          .social-icon:hover {
            color: #fff !important;
          }
        `}
      </style>
    </AntFooter>
  );
};

export default Footer; 