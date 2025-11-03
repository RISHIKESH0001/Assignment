import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { stockService } from '../../services/stockService';
import Header from '../Header/Header';
import StockCard from '../StockCard/StockCard';
import SubscriptionModal from '../SubscriptionModal/SubscriptionModal';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [stocks, setStocks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSubscriptions, setCurrentSubscriptions] = useState([]);

  useEffect(() => {
    if (user) {
      const subscriptions = stockService.getUserSubscriptions(user.id);
      setCurrentSubscriptions(subscriptions);

      subscriptions.forEach(symbol => {
        stockService.subscribe(user.id, symbol, handleStockUpdate);
      });

      return () => {
        subscriptions.forEach(symbol => {
          stockService.unsubscribe(user.id, symbol);
        });
      };
    }
  }, [user]);

  const handleStockUpdate = (update) => {
    setStocks(prevStocks => {
      const existingStockIndex = prevStocks.findIndex(s => s.symbol === update.symbol);
      
      if (existingStockIndex >= 0) {
        const newStocks = [...prevStocks];
        newStocks[existingStockIndex] = update;
        return newStocks;
      } else {
        return [...prevStocks, update];
      }
    });
  };

  const handleSubscribe = (stockSymbol) => {
    stockService.subscribeToStock(user.id, stockSymbol);
    stockService.subscribe(user.id, stockSymbol, handleStockUpdate);
    
    setCurrentSubscriptions(prev => [...prev, stockSymbol]);
  };

  const handleUnsubscribe = (stockSymbol) => {
    stockService.unsubscribeFromStock(user.id, stockSymbol);
    setStocks(prev => prev.filter(stock => stock.symbol !== stockSymbol));
    setCurrentSubscriptions(prev => prev.filter(symbol => symbol !== stockSymbol));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="dashboard">
      <Header onSubscribeClick={openModal} />
      
      <main className="dashboard-main">
        <div className="dashboard-header">
          <h2>Your Stock Portfolio</h2>
          <p>Real-time stock prices and updates</p>
        </div>

        {stocks.length === 0 ? (
          <div className="empty-state">
            <h3>No stocks subscribed</h3>
            <p>Click "Subscribe to Stock" to start tracking stocks</p>
            <button className="subscribe-empty-btn" onClick={openModal}>
              Subscribe to Your First Stock
            </button>
          </div>
        ) : (
          <div className="stocks-grid">
            {stocks.map(stock => (
              <StockCard
                key={stock.symbol}
                stock={stock}
                onUnsubscribe={handleUnsubscribe}
              />
            ))}
          </div>
        )}
      </main>

      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubscribe={handleSubscribe}
        currentSubscriptions={currentSubscriptions}
      />
    </div>
  );
};

export default Dashboard;