import React from 'react';
import { Layout } from 'antd';
import Header from '../common/organisms/Header';
import Footer from '../common/organisms/Footer';

const { Content } = Layout;

interface MainLayoutProps {
  children: any;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Layout className="min-h-screen w-full" style={{ padding: 0 }}>
      <Header />
      <Content className="w-full">
        {children}
      </Content>
      <Footer />
    </Layout>
  );
};

export default MainLayout; 