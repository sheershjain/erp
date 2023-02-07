import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { UserOutlined, SnippetsOutlined, UploadOutlined,  } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAppState } from '../state/AppState';

const { Header, Sider, Content } = Layout;
export const Sidebar = () => {
    const {appState} = useAppState()
    const [collapsed, setCollapsed] = useState(false)

    

    return <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={[
          {
            key: '1',
            icon: <UserOutlined />,
            label: 'Users',
            children: [
                {
                    key: '11',
                    label:<Link to="/listUsers">List Users</Link>
                },
                {
                    key: '12',
                    label: <Link to="/createUser">Create User</Link>
                }
            ],
            onlyAdmin: true
          },
          {
            key: '2',
            icon: <SnippetsOutlined />,
            label: 'Leaves',
            onlyAdmin: false,
            children: [
                {
                    key: '111',
                    label:<Link to="/applyLeave">Leave Application</Link>,
                    onlyAdmin:false
                },
                {
                    key: '121',
                    label: <Link to="/leaveApprovalRequests">Approval Requests</Link>,
                    onlyAdmin:true
                },
                {
                    key: '122',
                    label: <Link to="/leaveHistory">History</Link>,
                    onlyAdmin:false
                }
            ].filter((obj) => appState.role !== 'ADMIN' ? !obj.onlyAdmin : true).map(obj => {delete obj.onlyAdmin; return obj})
          },
        ].filter((obj) => appState.role !== 'ADMIN' ? !obj.onlyAdmin : true).map(obj => {delete obj.onlyAdmin; return obj})
    
    }
      />
    </Sider>
    
}