"use client"
import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import Button from 'antd/es/button';
import Menu from 'antd/es/menu';
import Layout from 'antd/es/layout';
import ConfigProvider from 'antd/es/config-provider';

// For newer versions, import theme directly
import theme from 'antd/es/theme';
import Dashboard from '../Dashboard/page';
import CreateClientForm from '../Client/page';
import TrainerClientsPage from '../ClientsForTrainer/page';
import FoodList from '../GetFoodItems/page';
import { AddFoodForm } from '../FoodItems/page';

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeComponent, setActiveComponent] = useState<string>('1');
  
  // Use theme.useToken() if available
  const token = theme?.useToken?.() || {};
  const colorBgContainer = token.token?.colorBgContainer || '#fff';
  const borderRadiusLG = token.token?.borderRadiusLG || 8;

  // Function to render the active component
  const renderContent = () => {
    switch (activeComponent) {
      case '1':
        return <Dashboard />;
      case '2':
        return <CreateClientForm />;
      case '3':
        return <TrainerClientsPage />;
      case '4':
        return <FoodList />;
      case '5':
        return <AddFoodForm />;
      default:
        return <Dashboard />;
    }
  };

  

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          selectedKeys={[activeComponent]}
          onClick={({ key }) => setActiveComponent(key)}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Dashboard',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'Create Client',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'Registered Client ',
            },
            {
              key: '4',
              icon: <UploadOutlined />,
              label: 'Food Items',
            },
            {
              key: '5',
              icon: <UploadOutlined />,
              label: 'create food',
            }
          ]}
        />


      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;