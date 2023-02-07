import { Sidebar } from "./sidebar";
import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Avatar, Button, Layout, Space } from "antd";
import { defaultAppState, useAppState } from "../state/AppState";
const { Header, Content } = Layout;

export const PageLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {appState, setAppState} = useAppState()
  return (
      <Layout style={{minHeight: '100vh'}}>
        <Header style={{ padding: 0 }}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: 8}}>
                <Space>
          {collapsed ? (
            <MenuUnfoldOutlined onClick={() => setCollapsed(!collapsed)} style={{color: 'white'}}/>
          ) : (
            <MenuFoldOutlined onClick={() => setCollapsed(!collapsed)} style={{color: 'white'}}/>
          )}
          {
            <span style={{color: 'white'}}>{appState.name}</span>
          }
          </Space>
          <Button onClick={() => {
            setAppState({...defaultAppState})
            localStorage.setItem('erp-appState', JSON.stringify({...defaultAppState}))
          }}>Logout</Button>
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
  );
};
