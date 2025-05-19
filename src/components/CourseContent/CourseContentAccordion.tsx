import React, { useState, useEffect } from 'react';
import { Collapse, Typography, Button, Tag, Space, Tooltip } from 'antd';
import { PlayCircleOutlined, LockOutlined, FileTextOutlined, FormOutlined, ProjectOutlined } from '@ant-design/icons';

const { Panel } = Collapse;
const { Text } = Typography;

// Custom style to remove outlines
const noOutlineStyle = {
  outline: 'none',
  boxShadow: 'none'
};

interface CourseContentItem {
  id: string;
  title: string;
  duration: string;
  isPreview: boolean;
  type: string;
}

interface CourseSection {
  id: string;
  title: string;
  duration: string;
  items: CourseContentItem[];
  totalLectures: number;
}

interface CourseContentAccordionProps {
  sections: CourseSection[];
  expandedSections?: string[];
}

const CourseContentAccordion = ({ 
  sections, 
  expandedSections = [] 
}: CourseContentAccordionProps) => {
  const [activeKeys, setActiveKeys] = useState(expandedSections);
  
  useEffect(() => {
    setActiveKeys(expandedSections);
  }, [expandedSections]);

  const getItemIcon = (item: CourseContentItem) => {
    switch (item.type) {
      case 'video':
        return <PlayCircleOutlined />;
      case 'quiz':
        return <FormOutlined />;
      case 'exercise':
        return <FileTextOutlined />;
      case 'assignment':
        return <FormOutlined />;
      case 'project':
        return <ProjectOutlined />;
      case 'article':
        return <FileTextOutlined />;
      default:
        return <PlayCircleOutlined />;
    }
  };

  const getItemTypeText = (type: string) => {
    switch (type) {
      case 'video':
        return 'Video';
      case 'quiz':
        return 'Quiz';
      case 'exercise':
        return 'Exercise';
      case 'assignment':
        return 'Assignment';
      case 'project':
        return 'Project';
      case 'article':
        return 'Article';
      default:
        return 'Lecture';
    }
  };

  return (
    <Collapse 
      activeKey={activeKeys} 
      onChange={(keys: string[] | string) => {
        const stringKeys = Array.isArray(keys) ? keys : [keys].filter(Boolean);
        setActiveKeys(stringKeys);
      }}
      className="course-content-accordion"
      expandIconPosition="end"
      ghost={false}
      bordered
    >
      {sections.map((section: CourseSection) => (
        <Panel 
          key={section.id} 
          header={
            <div>
              <Text strong>{section.title}</Text>
              <div className="flex text-gray-500 text-sm mt-1">
                <Text type="secondary">{section.totalLectures} lectures • {section.duration}</Text>
              </div>
            </div>
          }
        >
          <div className="space-y-2">
            {section.items.map((item: CourseContentItem) => (
              <div 
                key={item.id} 
                className="flex justify-between items-center py-3 px-4 hover:bg-gray-50 rounded-md transition-colors"
              >
                <div className="flex items-center">
                  <span className="text-gray-600 mr-3">
                    {getItemIcon(item)}
                  </span>
                  <div>
                    <div className="flex items-center">
                      <Text>{item.title}</Text>
                      {item.isPreview && (
                        <Tag color="blue" className="ml-2">Preview</Tag>
                      )}
                    </div>
                    <Text type="secondary" className="text-xs">
                      {getItemTypeText(item.type)}
                    </Text>
                  </div>
                </div>
                <div className="flex items-center">
                  <Text type="secondary" className="mr-3">{item.duration}</Text>
                  {item.isPreview ? (
                    <Button 
                      type="text" 
                      size="small" 
                      icon={<PlayCircleOutlined />}
                      className="text-blue-500"
                      style={noOutlineStyle}
                    >
                      Play
                    </Button>
                  ) : (
                    <Tooltip title="You need to purchase this course to access this content">
                      <LockOutlined className="text-gray-400" />
                    </Tooltip>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Panel>
      ))}
    </Collapse>
  );
};

export default CourseContentAccordion; 