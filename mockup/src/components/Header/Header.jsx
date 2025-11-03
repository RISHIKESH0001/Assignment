import React from 'react';
import './Header.css';

const Header = ({ companies, accounts, selectedCompany, selectedAccount, onCompanyChange, onAccountChange, loading, onMenuToggle }) => {
  return (
    <header className="header">
      <div className="header-right">
        <button className="menu-toggle" onClick={onMenuToggle}>
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
        </button>
        <div className="header-dropdowns">
          <select 
            className="dropdown" 
            value={selectedCompany} 
            onChange={onCompanyChange}
            disabled={loading}
          >
            <option value="">Select Company</option>
            {companies.map(company => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
          
          <select 
            className="dropdown" 
            value={selectedAccount} 
            onChange={onAccountChange}
            disabled={!selectedCompany || loading}
          >
            <option value="">Select Account</option>
            {accounts.map(account => (
              <option key={account.id} value={account.id}>
                {account.name} ({account.number})
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;