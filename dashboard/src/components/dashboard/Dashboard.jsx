import React, { useState, useEffect } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import Category from './Category';
import SearchBar from './SearchBar';
import HeaderActions from './HeaderActions';
import './Dashboard.css';

function Dashboard() {
  const { filteredCategories, searchTerm } = useDashboard();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 10;
      if (show !== isScrolled) {
        setIsScrolled(show);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);

  return (
    <div className="dashboard">
      <header className={`dashboard-header ${isScrolled ? 'scrolled' : ''}`}>
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