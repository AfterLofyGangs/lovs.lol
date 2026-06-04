import React from 'react';
import '../styles/Header.css';

const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <div className="header_logo">
          {/* Logo will be added here if needed */}
        </div>
        <div className="header_links">
          <ul className="nav_links">
            {/* Navigation links can be added here */}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
