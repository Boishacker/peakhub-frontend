import React from 'react';
import { Card, Typography, Rate, Tag, Tooltip, Button } from 'antd';
import { Link } from 'react-router-dom';
import { PlayCircleOutlined, HeartOutlined } from '@ant-design/icons';

const { Text } = Typography;

export interface CourseCardProps {
  id: string;
  title: string;
  instructor: {
    name: string;
    id: string;
  };
  image: string;
  rating: number;
  ratingCount: number;
  price: number;
  discountPrice?: number;
  level: 'beginner' | 'intermediate' | 'advanced' | 'all-levels';
  duration: string;
  tag?: string;
  isBestseller?: boolean;
}

const CourseCard = ({
  id,
  title,
  instructor,
  image,
  rating,
  ratingCount,
  price,
  discountPrice,
  level,
  duration,
  tag,
  isBestseller = false,
}: CourseCardProps) => {
  const levelColorMap = {
    'beginner': 'green',
    'intermediate': 'blue',
    'advanced': 'orange',
    'all-levels': 'purple',
  };

  return (
    <div className="course-card-wrapper">
    <Link to={`/course/${id}`}>
        <div className="course-card">
          <div className="course-image-container">
            <img 
              alt={title}
              src={image || `https://via.placeholder.com/300x200/7811f7/ffffff?text=${encodeURIComponent(title)}`}
              className="course-image"
            />
            <div className="course-overlay">
              <div className="preview-btn">
                <PlayCircleOutlined /> Preview
              </div>
            </div>
            {isBestseller && (
              <div className="bestseller-tag">
                Bestseller
              </div>
            )}
            {tag && (
              <div className="tag-label">
                {tag}
              </div>
            )}
          </div>
          <div className="course-content">
            <h3 className="course-title" title={title}>{title}</h3>
            <div className="instructor-name">By {instructor.name}</div>
            <div className="course-meta">
              <span className="course-level">{level.charAt(0).toUpperCase() + level.slice(1)}</span>
              <span className="course-duration">{duration}</span>
                </div>
            <div className="course-rating">
              <span className="rating-score">{rating.toFixed(1)}</span>
              <Rate allowHalf disabled defaultValue={rating} className="rating-stars" />
              <span className="rating-count">({ratingCount})</span>
                </div>
            <div className="course-price">
                {discountPrice ? (
                <>
                  <span className="discounted-price">${discountPrice.toFixed(2)}</span>
                  <span className="original-price">${price.toFixed(2)}</span>
                </>
                ) : (
                <span className="normal-price">${price.toFixed(2)}</span>
                )}
              </div>
            </div>
          <button className="wishlist-button" aria-label="Add to wishlist">
            <HeartOutlined />
          </button>
        </div>
    </Link>
      <style>{`
        .course-card-wrapper {
          position: relative;
          height: 100%;
        }
        .course-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          border: 1px solid #e8e9eb;
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
          background: white;
        }
        .course-card:hover {
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          transform: translateY(-4px);
        }
        .course-image-container {
          position: relative;
          height: 140px;
          overflow: hidden;
        }
        .course-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .course-card:hover .course-image {
          transform: scale(1.05);
        }
        .course-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .course-card:hover .course-overlay {
          opacity: 1;
        }
        .preview-btn {
          background: white;
          color: #333;
          padding: 8px 16px;
          border-radius: 4px;
          font-weight: 600;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .bestseller-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #f7c648;
          color: #3c3b37;
          font-size: 12px;
          font-weight: 700;
          padding: 4px 8px;
          text-transform: uppercase;
        }
        .tag-label {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #5624d0;
          color: white;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 4px;
        }
        .course-content {
          padding: 12px 16px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .course-title {
          font-size: 16px;
          font-weight: 700;
          margin: 0 0 6px 0;
          line-height: 1.4;
          color: #1c1d1f;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .instructor-name {
          font-size: 13px;
          color: #6a6f73;
          margin-bottom: 6px;
        }
        .course-meta {
          display: flex;
          gap: 12px;
          margin-bottom: 6px;
          font-size: 12px;
          color: #6a6f73;
        }
        .course-level {
          color: #6a6f73;
        }
        .course-duration {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .course-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 6px;
        }
        .rating-score {
          font-weight: 700;
          color: #b4690e;
          font-size: 14px;
        }
        .rating-stars {
          font-size: 12px;
          line-height: 1;
          color: #e59819;
        }
        .rating-count {
          font-size: 12px;
          color: #6a6f73;
        }
        .course-price {
          margin-top: auto;
          font-size: 16px;
          font-weight: 700;
          color: #1c1d1f;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .discounted-price {
          color: #6f0fe0;
        }
        .original-price {
          text-decoration: line-through;
          font-weight: 400;
          color: #6a6f73;
          font-size: 14px;
        }
        .normal-price {
          color: #6f0fe0;
        }
        .wishlist-button {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
          cursor: pointer;
          z-index: 2;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .course-card-wrapper:hover .wishlist-button {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default CourseCard; 