import { useState, useEffect } from 'react';
import axios from 'axios';

export const useBalanceTracker = () => {
  const [balance, setBalance] = useState<number>(7703111.63);

  const fetchBalance = async () => {
    try {
      const response = await axios.get('https://tron-balance-tracker-2nd.netlify.app/api/balance');
      setBalance(response.data.balance || 7703111.63);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setBalance(7703111.63);
    }
  };

  useEffect(() => {
    fetchBalance();
    const interval = setInterval(fetchBalance, 10000);
    return () => clearInterval(interval);
  }, []);

  return balance;
};