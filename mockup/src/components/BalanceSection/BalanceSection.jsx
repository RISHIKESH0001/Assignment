import React from 'react';
import './BalanceSection.css';

const BalanceSection = ({ availableBalance }) => {
  return (
    <section className="balance-section">
      <h2>Available Balance</h2>
      <div className="balance-amount">{availableBalance}</div>
    </section>
  );
};

export default BalanceSection;