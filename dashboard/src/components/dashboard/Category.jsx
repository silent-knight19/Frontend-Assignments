import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Widget from './Widget';
import AddWidgetModal from './AddWidgetDrawer';

function Category({ category }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="category">
      <div className="category-header">
        <h2 style={{ fontWeight: 'bold' }}>{category.name}</h2>
      </div>
      
      <div className="widgets-grid">
        {category.widgets.map(widget => (
          <Widget key={widget.id} widget={widget} />
        ))}
        
        <div className="add-widget-card" onClick={() => setIsModalOpen(true)}>
          <div className="add-widget-content">
            <Plus size={24} />
            <span style={{ fontWeight: 'bold' }}>Add Widget</span>
          </div>
        </div>
      </div>

      <AddWidgetModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categoryId={category.id}
      />
    </div>
  );
}

export default Category;