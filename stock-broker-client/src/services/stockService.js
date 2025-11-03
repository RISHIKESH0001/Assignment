const SUPPORTED_STOCKS = ['GOOG', 'TSLA', 'AMZN', 'META', 'NVDA'];

const initialPrices = {
  'GOOG': 145.67,
  'TSLA': 245.89,
  'AMZN': 178.34,
  'META': 485.12,
  'NVDA': 890.45
};

const userSubscriptions = new Map();

class StockService {
  constructor() {
    this.subscribers = new Map();
    this.currentPrices = { ...initialPrices };
    this.startPriceUpdates();
  }

  subscribe(userId, stockSymbol, callback) {
    if (!userSubscriptions.has(userId)) {
      userSubscriptions.set(userId, new Set());
    }
    
    userSubscriptions.get(userId).add(stockSymbol);
    
    if (!this.subscribers.has(stockSymbol)) {
      this.subscribers.set(stockSymbol, new Set());
    }
    
    this.subscribers.get(stockSymbol).add({ userId, callback });
    
    callback({
      symbol: stockSymbol,
      price: this.currentPrices[stockSymbol],
      change: 0,
      timestamp: new Date()
    });
  }

  unsubscribe(userId, stockSymbol) {
    if (userSubscriptions.has(userId)) {
      userSubscriptions.get(userId).delete(stockSymbol);
    }
    
    if (this.subscribers.has(stockSymbol)) {
      const stockSubscribers = this.subscribers.get(stockSymbol);
      for (let subscriber of stockSubscribers) {
        if (subscriber.userId === userId) {
          stockSubscribers.delete(subscriber);
          break;
        }
      }
    }
  }

  getUserSubscriptions(userId) {
    return userSubscriptions.has(userId) 
      ? Array.from(userSubscriptions.get(userId)) 
      : [];
  }

  getSupportedStocks() {
    return SUPPORTED_STOCKS;
  }

  subscribeToStock(userId, stockSymbol) {
    if (!SUPPORTED_STOCKS.includes(stockSymbol)) {
      throw new Error(`Stock ${stockSymbol} is not supported`);
    }

    if (!userSubscriptions.has(userId)) {
      userSubscriptions.set(userId, new Set());
    }

    userSubscriptions.get(userId).add(stockSymbol);
    return true;
  }

  unsubscribeFromStock(userId, stockSymbol) {
    if (userSubscriptions.has(userId)) {
      userSubscriptions.get(userId).delete(stockSymbol);
    }
    this.unsubscribe(userId, stockSymbol);
  }

  startPriceUpdates() {
    setInterval(() => {
      SUPPORTED_STOCKS.forEach(symbol => {
        const currentPrice = this.currentPrices[symbol];
        const changePercent = (Math.random() - 0.5) * 4; 
        const newPrice = Math.max(0.01, currentPrice * (1 + changePercent / 100));
        const change = newPrice - currentPrice;
        
        this.currentPrices[symbol] = newPrice;

        if (this.subscribers.has(symbol)) {
          const update = {
            symbol,
            price: parseFloat(newPrice.toFixed(2)),
            change: parseFloat(change.toFixed(2)),
            changePercent: parseFloat((changePercent).toFixed(2)),
            timestamp: new Date()
          };

          this.subscribers.get(symbol).forEach(({ callback }) => {
            callback(update);
          });
        }
      });
    }, 2000);
  }

  getCurrentPrice(stockSymbol) {
    return this.currentPrices[stockSymbol] || null;
  }
}

export const stockService = new StockService();