import React, { useState } from 'react';
import { stockService } from '../../services/stockService';
import './SubscriptionModal.css';

const SubscriptionModal = ({ isOpen, onClose, onSubscribe, currentSubscriptions }) => {
  const [selectedStock, setSelectedStock] = useState('');

  if (!isOpen) return null;

  const supportedStocks = stockService.getSupportedStocks();
  const availableStocks = supportedStocks.filter(
    stock => !currentSubscriptions.includes(stock)
  );

  const handleSubscribe = () => {
    if (selectedStock) {
      onSubscribe(selectedStock);
      setSelectedStock('');
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Subscribe to Stock</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <p>Choose a stock to subscribe to:</p>
          
          <select 
            value={selectedStock}
            onChange={(e) => setSelectedStock(e.target.value)}
            className="stock-select"
          >
            <option value="">Select a stock</option>
            {availableStocks.map(stock => (
              <option key={stock} value={stock}>
                {stock}
              </option>
            ))}
          </select>

          {availableStocks.length === 0 && (
            <p className="no-stocks-message">
              You are already subscribed to all available stocks.
            </p>
          )}
        </div>
        
        <div className="modal-footer">
          <button 
            className="subscribe-button"
            onClick={handleSubscribe}
            disabled={!selectedStock}
          >
            Subscribe
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;