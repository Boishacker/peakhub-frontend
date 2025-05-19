import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button as AntButton, Dropdown, Menu, Avatar, Space } from 'antd';
import Button from '../atoms/Button';
import { useAuth } from '../../../contexts/AuthContext';
import type { User } from '../../../types/auth';
import { UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';

interface AuthButtonsProps {
  className?: string;
}

const AuthButtons = ({ className = '' }: AuthButtonsProps) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const menuItems = [
    {
      key: 'profile',
      label: 'Hồ sơ',
      icon: <UserOutlined />,
      onClick: () => navigate('/profile')
    },
    ...(user?.role === 'admin' ? [
      {
        key: 'settings',
        label: 'Cài đặt hệ thống',
        icon: <SettingOutlined />,
        onClick: () => navigate('/admin/settings')
      }
    ] : []),
    {
      key: 'logout',
      label: 'Đăng xuất',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
      danger: true
    }
  ];

  if (isAuthenticated && user) {
    return (
      <div className={`relative ${className}`} ref={dropdownRef} style={{ marginRight: '4px' }}>
        <Dropdown
          menu={{ items: menuItems }}
          trigger={['click']}
          onOpenChange={setIsDropdownOpen}
          placement="bottomRight"
          arrow={{ pointAtCenter: true }}
        >
          <Button
            type="text"
            style={{
              height: 40,
              width: 40,
              padding: 0,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: isDropdownOpen ? '#f4f0fe' : 'transparent'
            }}
          >
            <Avatar
              size={32}
              src={user.avatar}
              icon={<UserOutlined />}
              style={{ 
                backgroundColor: user.avatar ? 'transparent' : '#6f0fe0',
                cursor: 'pointer'
              }}
            />
          </Button>
        </Dropdown>
      </div>
    );
  }

  return (
    <div className={className}>
      <Link to="/login">
        <Button variant="primary" style={{ marginRight: 8 }}>
        Log in
        </Button>
      </Link>
      <Link to="/register">
        <Button variant="outline">
        Sign up
        </Button>
      </Link>
    </div>
  );
};

export default AuthButtons; 