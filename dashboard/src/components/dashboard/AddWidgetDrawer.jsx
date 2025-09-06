import React, { useState } from 'react';
import { X, LayoutDashboard, BarChart3, Shield, Cloud, Activity, Zap } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import '../AddWidgetDrawer.css';

function AddWidgetDrawer({ isOpen, onClose }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');
  const { addWidget, categories } = useDashboard();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!widgetName.trim() || !widgetText.trim()) {
      alert('Please fill in all fields');
      return;
    }

    const newWidget = {
      id: `widget-${Date.now()}`,
      name: widgetName.trim(),
      text: widgetText.trim(),
      category: selectedCategory.id
    };

    addWidget(selectedCategory.id, newWidget);
    setWidgetName('');
    setWidgetText('');
    setSelectedCategory(null);
    onClose();
  };

  const handleClose = () => {
    setWidgetName('');
    setWidgetText('');
    setSelectedCategory(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="drawer-overlay">
      <div className="drawer">
        <div className="drawer-header dark-blue-header">
          <h2>Add Widget</h2>
          <button className="close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="drawer-content">
          <h3 className="subtitle">Personalise your dashboard by adding the following widget</h3>
          
          {!selectedCategory ? (
            <div className="categories-grid">
              {categories.map((category) => {
                let icon;
                let iconBgColor = '#f0f9ff';
                let iconColor = '#0369a1';
                
                switch(category.id) {
                  case 'cspm':
                    icon = <LayoutDashboard size={24} color={iconColor} />;
                    break;
                  case 'cost':
                    icon = <BarChart3 size={24} color="#166534" />;
                    iconBgColor = '#f0fdf4';
                    iconColor = '#166534';
                    break;
                  case 'security':
                    icon = <Shield size={24} color="#991b1b" />;
                    iconBgColor = '#fef2f2';
                    iconColor = '#991b1b';
                    break;
                  default:
                    icon = <LayoutDashboard size={24} color={iconColor} />;
                }
                
                return (
                  <div 
                    key={category.id}
                    className="category-card"
                    onClick={() => handleCategorySelect(category)}
                  >
                    <div className="card-content">
                      <div 
                        className="icon-container"
                        style={{ backgroundColor: iconBgColor }}
                      >
                        {icon}
                      </div>
                      <div className="category-info">
                        <h3 className="category-name">{category.name}</h3>
                        <p className="category-description">
                          {category.id === 'cspm' && 'Cloud Security Posture Management'}
                          {category.id === 'cost' && 'Cloud Cost Optimization'}
                          {category.id === 'security' && 'Security & Compliance'}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="widget-form">
              <h3>Add {selectedCategory.name} Widget</h3>
              <div className="form-group">
                <label htmlFor="widgetName">Widget Name:</label>
                <input
                  type="text"
                  id="widgetName"
                  value={widgetName}
                  onChange={(e) => setWidgetName(e.target.value)}
                  placeholder="Enter widget name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="widgetText">Widget Content:</label>
                <textarea
                  id="widgetText"
                  value={widgetText}
                  onChange={(e) => setWidgetText(e.target.value)}
                  placeholder={`Enter ${selectedCategory.name} widget content`}
                  rows="4"
                  required
                />
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  onClick={() => setSelectedCategory(null)} 
                  className="back-btn"
                >
                  Back
                </button>
                <button type="submit" className="submit-btn">
                  Add Widget
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddWidgetDrawer;