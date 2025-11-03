import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import mockData from './data/mockData.json';
import './App.css';

const App = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeSidebarItem, setActiveSidebarItem] = useState('statements');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Initialize companies on component mount
  useEffect(() => {
    setCompanies(mockData.companies);
    setSelectedCompany(mockData.companies[0]?.id || '');
  }, []);

  // Update accounts when company changes
  useEffect(() => {
    if (selectedCompany) {
      const companyAccounts = mockData.accounts[selectedCompany] || [];
      setAccounts(companyAccounts);
      setSelectedAccount(companyAccounts[0]?.id || '');
    }
  }, [selectedCompany]);

  // Update account data when account changes
  useEffect(() => {
    if (selectedAccount) {
      fetchAccountData(selectedAccount);
    }
  }, [selectedAccount]);

  const fetchAccountData = async (accountId) => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const data = mockData.accountData[accountId] || null;
      setAccountData(data);
    } catch (error) {
      console.error('Error fetching account data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
    setSelectedAccount('');
    setAccountData(null);
  };

  const handleAccountChange = (event) => {
    setSelectedAccount(event.target.value);
  };

  const handleSidebarItemClick = (itemId) => {
    setActiveSidebarItem(itemId);
    setIsMobileSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const handleMenuToggle = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleMobileSidebarClose = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="app">
      <Sidebar 
        sidebarItems={mockData.sidebarItems}
        activeItem={activeSidebarItem}
        onItemClick={handleSidebarItemClick}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={handleMobileSidebarClose}
      />

      <div className="app-main">
        <Header
          companies={companies}
          accounts={accounts}
          selectedCompany={selectedCompany}
          selectedAccount={selectedAccount}
          onCompanyChange={handleCompanyChange}
          onAccountChange={handleAccountChange}
          loading={loading}
          onMenuToggle={handleMenuToggle}
        />

        <MainContent 
          accountData={accountData}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default App;