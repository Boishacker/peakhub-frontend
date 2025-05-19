import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button as AntButton } from 'antd';
import Button from '../atoms/Button';
import { useAuth } from '../../../contexts/AuthContext';
import type { User } from '../../../types/auth';

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

  if (isAuthenticated && user) {
    return (
      <div className={`relative ${className}`} ref={dropdownRef} style={{ marginRight: '4px' }}>
        <button
          onClick={toggleDropdown}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '5px',
            background: isDropdownOpen ? 'white' : 'transparent',
            boxShadow: isDropdownOpen ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
            border: isDropdownOpen ? '1px solid #e5e7eb' : '1px solid transparent',
            borderRadius: '50%',
            transition: 'all 0.2s ease',
            transform: isHovered && !isDropdownOpen ? 'scale(1.08)' : 'scale(1)',
            outline: 'none'
          }}
          aria-label="User menu"
        >
          <img
            src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
            alt={`${user.name}'s avatar`}
            style={{ 
              width: '32px', 
              height: '32px', 
              borderRadius: '50%',
              border: isHovered ? '2px solid #6f0fe0' : '2px solid transparent',
              transition: 'border 0.2s ease'
            }}
          />
        </button>

        {isDropdownOpen && (
          <div style={{
            position: 'absolute',
            right: 0,
            marginTop: '10px',
            width: '240px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            zIndex: 50,
            overflow: 'hidden',
            animation: 'dropdownAnimation 0.25s ease'
          }}>
            <style>
              {`
                @keyframes dropdownAnimation {
                  from {
                    opacity: 0;
                    transform: translateY(-10px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
                .menu-item {
                  display: block;
                  padding: 10px 16px;
                  font-size: 14px;
                  color: #475569;
                  transition: all 0.2s ease;
                  text-decoration: none;
                }
                .menu-item:hover {
                  background-color: #f4f0fe;
                  color: #6f0fe0;
                }
                .menu-item:active {
                  background-color: #e9e0fd;
                }
                .logout-button {
                  width: 100%;
                  text-align: left;
                  padding: 10px 16px;
                  font-size: 14px;
                  color: #ef4444;
                  transition: all 0.2s ease;
                  background: transparent;
                  border: none;
                  cursor: pointer;
                  outline: none;
                }
                .logout-button:hover {
                  background-color: #fee2e2;
                }
              `}
            </style>
            <div style={{
              padding: '16px',
              borderBottom: '1px solid #e2e8f0',
            }}>
              <p style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#1e293b',
                margin: '0 0 4px 0'
              }}>
                {user.name}
              </p>
              <p style={{
                fontSize: '13px',
                color: '#64748b',
                margin: '0 0 6px 0'
              }}>
                {user.email}
              </p>
              <p style={{
                fontSize: '12px',
                color: '#6f0fe0',
                fontWeight: 500,
                margin: 0,
                textTransform: 'capitalize'
              }}>
                {user.role} Account
              </p>
            </div>
            <Link
              to="/profile"
              className="menu-item"
              onClick={() => setIsDropdownOpen(false)}
            >
              Your Profile
            </Link>
            <Link
              to="/instructor/profile"
              className="menu-item"
              onClick={() => setIsDropdownOpen(false)}
            >
              Public Profile
            </Link>
            <button
              className="logout-button"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        )}
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