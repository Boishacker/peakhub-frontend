import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  AppstoreOutlined, 
  BookOutlined, 
  ShoppingCartOutlined, 
  GlobalOutlined,
  UserOutlined
} from '@ant-design/icons';
import Logo from '../atoms/Logo';
import SearchBar from '../molecules/SearchBar';
import AuthButtons from '../molecules/AuthButtons';
import CartButton from '../molecules/CartButton';
import NotificationsDropdown from '../molecules/NotificationsDropdown';
import { useAuth } from '../../../contexts/AuthContext';
import { Typography, Tabs } from 'antd';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

// Languages available
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' }
];

const Header = () => {
  const { user } = useAuth();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(languages[0]);
  const [isLangHovered, setIsLangHovered] = useState(false);
  const langDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };

    if (isLangDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLangDropdownOpen]);

  const toggleLangDropdown = () => {
    setIsLangDropdownOpen(!isLangDropdownOpen);
  };

  const changeLang = (lang: typeof languages[0]) => {
    setCurrentLang(lang);
    setIsLangDropdownOpen(false);
    // Here you would actually change the app's language
    // For example: i18n.changeLanguage(lang.code);
  };

  return (
    <header className="w-full border-b border-secondary-200 bg-white py-5 shadow-sm">
      <div className="content-container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Logo className="mr-4" />
            <Link to="/courses" className="hidden text-sm font-medium text-secondary-700 hover:text-primary-600 md:flex items-center">
              <BookOutlined className="mr-1" /> Explore
            </Link>
          </div>
          
          {/* Search Bar */}
          <div className={`relative mx-4 flex-grow ${isSearchFocused ? 'z-20' : ''}`}>
            <SearchBar 
              className="w-full"
              placeholder="Find expert-led courses to boost your career"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>
          
          {/* Navigation */}
          <div className="flex items-center space-x-5">
            {user && user.role === 'instructor' && (
              <Link 
                to="/instructor"
                className="text-sm font-medium text-secondary-700 hover:text-primary-600 flex items-center px-3 py-1 rounded transition-colors duration-200"
                style={{ background: '#f4f0fe', color: '#6f0fe0', fontWeight: 600 }}
              >
                <UserOutlined className="mr-1" /> Instructor
              </Link>
            )}
            {(!user || user.role !== 'admin') && <CartButton />}
            {user && <NotificationsDropdown />}
            <AuthButtons />
            
            {/* Language Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={toggleLangDropdown}
                onMouseEnter={() => setIsLangHovered(true)}
                onMouseLeave={() => setIsLangHovered(false)}
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: isLangDropdownOpen ? '#f4f0fe' : isLangHovered ? '#f8fafc' : 'transparent',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transform: isLangHovered && !isLangDropdownOpen ? 'scale(1.05)' : 'scale(1)',
                }}
                aria-label="Change language"
              >
                <span style={{ fontSize: '18px' }}>{currentLang.flag}</span>
              </button>

              {isLangDropdownOpen && (
                <div 
                  style={{
                    position: 'absolute',
                    right: 0,
                    marginTop: '10px',
                    width: '180px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    zIndex: 50,
                    overflow: 'hidden',
                    animation: 'langDropdown 0.25s ease'
                  }}
                >
                  <style>
                    {`
                      @keyframes langDropdown {
                        from {
                          opacity: 0;
                          transform: translateY(-10px);
                        }
                        to {
                          opacity: 1;
                          transform: translateY(0);
                        }
                      }
                      .lang-item {
                        display: flex;
                        align-items: center;
                        padding: 10px 16px;
                        font-size: 14px;
                        color: #475569;
                        transition: all 0.2s ease;
                        cursor: pointer;
                        border-left: 3px solid transparent;
                      }
                      .lang-item:hover {
                        background-color: #f4f0fe;
                        color: #6f0fe0;
                        border-left-color: #6f0fe0;
                      }
                      .lang-item:active {
                        background-color: #e9e0fd;
                      }
                      .lang-item.active {
                        background-color: #f4f0fe;
                        color: #6f0fe0;
                        border-left-color: #6f0fe0;
                        font-weight: 500;
                      }
                      .lang-flag {
                        margin-right: 10px;
                        font-size: 18px;
                      }
                    `}
                  </style>
                  <div style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #e2e8f0',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#64748b'
                  }}>
                    Select Language
                  </div>
                  {languages.map(lang => (
                    <div 
                      key={lang.code}
                      className={`lang-item ${currentLang.code === lang.code ? 'active' : ''}`}
                      onClick={() => changeLang(lang)}
                    >
                      <span className="lang-flag">{lang.flag}</span>
                      {lang.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 