import { useState, useEffect } from 'react';
import axios from 'axios';

interface PriceData {
  usdtPrice: number;
  trxPrice: number;
}

export const useCryptoPrice = () => {
  const [prices, setPrices] = useState<PriceData>({
    usdtPrice: 1,
    trxPrice: 0,
  });

  const fetchPrices = async () => {
    try {
      const [usdtResponse, trxResponse] = await Promise.all([
        axios.get('https://api.binance.com/api/v3/ticker/price?symbol=USDTUSDT'),
        axios.get('https://api.binance.com/api/v3/ticker/price?symbol=TRXUSDT')
      ]);

      setPrices({
        usdtPrice: parseFloat(usdtResponse.data.price),
        trxPrice: parseFloat(trxResponse.data.price)
      });
    } catch (error) {
      console.error('Error fetching prices:', error);
    }
  };

  useEffect(() => {
    // Initial fetch after 1.5 seconds
    const initialFetchTimeout = setTimeout(() => {
      fetchPrices();
    }, 1500);

    // Regular fetch every 10 seconds
    const interval = setInterval(fetchPrices, 10000);

    return () => {
      clearTimeout(initialFetchTimeout);
      clearInterval(interval);
    };
  }, []);

  return prices;
};