import React from 'react';
import './StockCard.css';

const StockCard = ({ stock, onUnsubscribe }) => {
  const isPositive = stock.change >= 0;
  
  return (
    <div className={`stock-card ${isPositive ? 'positive' : 'negative'}`}>
      <div className="stock-header">
        <h3 className="stock-symbol">{stock.symbol}</h3>
        <button 
          className="unsubscribe-button"
          onClick={() => onUnsubscribe(stock.symbol)}
          title="Unsubscribe"
        >
          ×
        </button>
      </div>
      
      <div className="stock-price">${stock.price}</div>
      
      <div className="stock-change">
        <span className={`change-amount ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? '+' : ''}{stock.change.toFixed(2)} 
          ({isPositive ? '+' : ''}{stock.changePercent?.toFixed(2)}%)
        </span>
      </div>
      
      <div className="stock-timestamp">
        Last update: {stock.timestamp?.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default StockCard;