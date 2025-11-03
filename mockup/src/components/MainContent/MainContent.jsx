import React from 'react';
import BalanceSection from '../BalanceSection/BalanceSection';
import LoadsTable from '../LoadsTable/LoadsTable';
import './MainContent.css';

const MainContent = ({ accountData, loading }) => {
  return (
    <main className="main-content">
      {loading ? (
        <div className="loading">Loading...</div>
      ) : accountData ? (
        <>
          <BalanceSection availableBalance={accountData.availableBalance} />
          <LoadsTable loads={accountData.loads} />
        </>
      ) : (
        <div className="no-data">
          Please select a company and account to view data
        </div>
      )}
    </main>
  );
};

export default MainContent;