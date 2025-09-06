import React, { useState } from 'react';
import { FiRefreshCw, FiPlus, FiSearch, FiMoreVertical } from 'react-icons/fi';
import { useDashboard } from '../../context/DashboardContext';
import AddWidgetDrawer from './AddWidgetDrawer';

function HeaderActions() {
  const [showAddWidgetDrawer, setShowAddWidgetDrawer] = useState(false);
  const [showSearchWidget, setShowSearchWidget] = useState(false);

  const handleAddWidgetClick = () => {
    setShowAddWidgetDrawer(true);
  };

  const handleCloseDrawer = () => {
    setShowAddWidgetDrawer(false);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="header-actions" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      marginLeft: '20px'
    }}>
      <button 
        className="icon-button add-widget-button"
        onClick={handleAddWidgetClick}
        style={{
          ...buttonStyle,
          padding: '8px 16px',
        }}
        title="Add a new widget to the dashboard"
      >
        <FiPlus size={16} />
        <span>Add Widget</span>
      </button>
      
      <button 
        className="icon-button"
        onClick={handleRefresh}
        style={buttonStyle}
        title="Refresh"
      >
        <FiRefreshCw size={18} />
      </button>

      <div style={{ position: 'relative' }}>
        <button 
          className="icon-button"
          onClick={() => setShowSearchWidget(!showSearchWidget)}
          style={buttonStyle}
          title="Widget options"
        >
          <FiMoreVertical size={20} />
        </button>
        
        {showSearchWidget && (
          <div style={{
            position: 'absolute',
            right: 0,
            top: '100%',
            backgroundColor: 'white',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            borderRadius: '4px',
            padding: '10px',
            zIndex: 1000,
            minWidth: '200px'
          }}>
            <button 
              onClick={() => {
                // Implement search widget functionality
                setShowSearchWidget(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '100%',
                padding: '8px 12px',
                border: 'none',
                background: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                borderRadius: '4px',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <FiSearch size={16} />
              <span>Search Widgets</span>
            </button>
          </div>
        )}
      </div>
      <AddWidgetDrawer 
        isOpen={showAddWidgetDrawer} 
        onClose={handleCloseDrawer} 
      />
    </div>
  );
}

const buttonStyle = {
  background: 'none',
  cursor: 'pointer',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s',
  border: '1px solid #e0e0e0',
  padding: '8px 12px',
  color: '#555',
  fontSize: '14px',
  fontWeight: 500,
};

export default HeaderActions;
