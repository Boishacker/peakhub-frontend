import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button as AntButton } from 'antd';
import Button from '../atoms/Button';

// In a real app, this would come from a cart context/store
interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
}

// Mock cart items
const mockCartItems: CartItem[] = [
  {
    id: '1',
    title: 'Introduction to React',
    price: 29.99,
    image: '/public/mockups/mock1.jpg',
  },
  {
    id: '2',
    title: 'Advanced TypeScript',
    price: 49.99,
    image: '/public/mockups/mock2.jpg',
  },
];

interface CartButtonProps {
  className?: string;
}

const CartButton = ({ className = '' }: CartButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isIconHovered, setIsIconHovered] = useState(false);
  const cartRef = useRef(null);
  const navigate = useNavigate();

  // In a real app, these would come from a cart context
  const cartItems = mockCartItems;
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckout = () => {
    setIsOpen(false);
    navigate('/checkout');
  };

  const handleCartPage = () => {
    setIsOpen(false);
    navigate('/cart');
  };

  useEffect(() => {
    // Function to handle clicks outside the dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Add event listener when dropdown is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Clean up event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const buttonIconStyle = {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
    transition: 'transform 0.2s ease, color 0.2s ease',
    transform: isIconHovered ? 'scale(1.15)' : 'scale(1)',
    padding: '8px',
    borderRadius: '50%',
    position: 'relative' as const
  };

  return (
    <div className={`relative ${className}`} ref={cartRef} style={{ marginRight: '4px' }}>
      <button
        onClick={toggleCart}
        onMouseEnter={() => setIsIconHovered(true)}
        onMouseLeave={() => setIsIconHovered(false)}
        style={buttonIconStyle}
        aria-label="Shopping cart"
      >
        <ShoppingCartOutlined style={{ 
          fontSize: '24px', 
          color: isIconHovered ? '#6f0fe0' : '#475569' 
        }} />
        {cartItems.length > 0 && (
          <span style={{
            position: 'absolute',
            top: '0',
            right: '0',
            background: '#ef4444',
            color: 'white',
            fontSize: '10px',
            fontWeight: 'bold',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: isIconHovered ? 'scale(1.2)' : 'scale(1)',
            transition: 'transform 0.2s ease',
            border: '1.5px solid white'
          }}>
            {cartItems.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          right: 0,
          marginTop: '10px',
          width: '320px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          zIndex: 50,
          overflow: 'hidden',
          animation: 'cartDropdown 0.25s ease'
        }}>
          <style>
            {`
              @keyframes cartDropdown {
                from {
                  opacity: 0;
                  transform: translateY(-10px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}
          </style>
          <div style={{
            padding: '16px',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#1e293b',
              margin: 0
            }}>
              Shopping Cart
            </h3>
            <span style={{ color: '#94a3b8', fontSize: '14px' }}>
              {cartItems.length} items
            </span>
          </div>
          
          {cartItems.length > 0 ? (
            <>
              <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
                {cartItems.map((item) => (
                  <div key={item.id} style={{
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'start', 
                    borderBottom: '1px solid #f1f5f9',
                    transition: 'background-color 0.2s ease',
                    cursor: 'pointer',
                  }}
                  className="cart-item"
                  >
                    <style>
                      {`
                        .cart-item:hover {
                          background-color: #f8fafc;
                        }
                      `}
                    </style>
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '6px',
                        objectFit: 'cover',
                        marginRight: '12px'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#1e293b',
                        marginBottom: '4px',
                        marginTop: '0px'
                      }}>
                        {item.title}
                      </h4>
                      <p style={{
                        fontSize: '15px',
                        fontWeight: 600,
                        color: '#6f0fe0',
                        margin: 0
                      }}>
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <button 
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#94a3b8',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        padding: '4px',
                        borderRadius: '50%',
                      }}
                      className="remove-button"
                      aria-label="Remove item"
                    >
                      <style>
                        {`
                          .remove-button:hover {
                            background-color: #fee2e2;
                            color: #ef4444;
                            transform: scale(1.1);
                          }
                          .remove-button:active {
                            transform: scale(0.95);
                          }
                        `}
                      </style>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16"
                        height="16"
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M6 18L18 6M6 6l12 12" 
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              
              <div style={{
                padding: '16px',
                borderBottom: '1px solid #e2e8f0',
                borderTop: '1px solid #e2e8f0',
                backgroundColor: '#f8fafc'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '15px', color: '#475569' }}>Total:</span>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b' }}>
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>
              
              <div style={{ padding: '16px' }}>
                <AntButton 
                  type="primary"
                  style={{
                    width: '100%',
                    height: '40px',
                    fontSize: '14px',
                    borderRadius: '8px',
                    background: '#6f0fe0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    outline: 'none',
                    border: 'none',
                    boxShadow: '0 2px 6px rgba(111, 15, 224, 0.3)',
                    transition: 'all 0.2s ease',
                  }}
                  className="checkout-button"
                  onClick={handleCheckout}
                >
                  <style>
                    {`
                      .checkout-button:hover {
                        background-color: #5d0ebb !important;
                        transform: translateY(-2px);
                        box-shadow: 0 4px 8px rgba(111, 15, 224, 0.4) !important;
                      }
                      .checkout-button:active {
                        transform: translateY(0);
                        box-shadow: 0 1px 3px rgba(111, 15, 224, 0.3) !important;
                      }
                    `}
                  </style>
                  Go to Checkout
                </AntButton>
                <AntButton 
                  style={{
                    width: '100%',
                    marginTop: '12px',
                    height: '40px',
                    fontSize: '14px',
                    borderRadius: '8px',
                    background: 'transparent',
                    border: '1px solid #e2e8f0',
                    color: '#475569',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  className="viewcart-button"
                  onClick={handleCartPage}
                >
                  <style>
                    {`
                      .viewcart-button:hover {
                        border-color: #6f0fe0 !important;
                        color: #6f0fe0 !important;
                        background-color: #f4f0fe !important;
                      }
                      .viewcart-button:active {
                        transform: scale(0.98);
                      }
                    `}
                  </style>
                  View Cart
                </AntButton>
              </div>
            </>
          ) : (
            <div style={{
              padding: '24px 16px',
              textAlign: 'center'
            }}>
              <ShoppingCartOutlined style={{ fontSize: '48px', color: '#c2c9d6', marginBottom: '12px' }} />
              <p style={{
                fontSize: '14px',
                color: '#64748b',
                margin: '0 0 16px 0'
              }}>
                Your cart is empty
              </p>
              <AntButton 
                type="primary"
                style={{
                  padding: '0 16px',
                  height: '40px',
                  fontSize: '14px',
                  color: 'white',
                  backgroundColor: '#6f0fe0',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  outline: 'none',
                  boxShadow: '0 2px 6px rgba(111, 15, 224, 0.3)',
                  transition: 'all 0.2s ease'
                }}
                className="browse-button"
                onClick={() => {
                  setIsOpen(false);
                  navigate('/courses');
                }}
              >
                <style>
                  {`
                    .browse-button:hover {
                      background-color: #5d0ebb !important;
                      transform: translateY(-2px);
                      box-shadow: 0 4px 8px rgba(111, 15, 224, 0.4) !important;
                    }
                    .browse-button:active {
                      transform: translateY(0);
                    }
                  `}
                </style>
                Browse courses
              </AntButton>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartButton; 