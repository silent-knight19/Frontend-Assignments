import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import Category from './Category';
import SearchBar from './SearchBar';
import HeaderActions from './HeaderActions';
import './Dashboard.css';

function Dashboard() {
  const { filteredCategories, searchTerm } = useDashboard();

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1 style={{ fontWeight: 'bold', margin: 0 }}>CNAPP Dashboard</h1>
        <div className="header-controls">
          <HeaderActions />
          <SearchBar />
        </div>
      </header>
      
      <main className="dashboard-content">
        {filteredCategories.length === 0 && searchTerm ? (
          <div className="no-results">
            <p>No widgets found matching "{searchTerm}"</p>
          </div>
        ) : (
          filteredCategories.map(category => (
            <Category key={category.id} category={category} />
          ))
        )}
      </main>
    </div>
  );
}

export default Dashboard;