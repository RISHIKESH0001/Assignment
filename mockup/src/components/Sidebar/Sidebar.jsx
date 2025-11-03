import React from 'react';
import './Sidebar.css';

const Sidebar = ({ sidebarItems, activeItem, onItemClick, isMobileOpen, onMobileClose }) => {
  return (
    <>
      {isMobileOpen && (
        <div className="sidebar-overlay" onClick={onMobileClose}></div>
      )}
      
      <aside className={`sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-logo">EazyPayouts</h2>
          <button className="sidebar-close" onClick={onMobileClose}>
            ×
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-section-header">
            <span className="nav-icon">📥</span>
            <h3>Loads</h3>
          </div>
          <ul className="sidebar-menu">
            {sidebarItems.map(item => (
              <li key={item.id} className="sidebar-item">
                <button 
                  className={`sidebar-link ${activeItem === item.id ? 'active' : ''}`}
                  onClick={() => onItemClick(item.id)}
                >
                  <span className="sidebar-icon">{item.icon}</span>
                  <span className="sidebar-label">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-button">
            <span className="logout-icon">🚪</span>
            <span className="logout-label">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;