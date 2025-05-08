// CryptoTable.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Chart7D from './Chart7D';

const formatPercent = (value) => {
  if (value === null || value === undefined) return 'N/A';
  const parsed = parseFloat(value);
  return (
    <span className={parsed >= 0 ? 'text-green-500' : 'text-red-500'}>
      {parsed >= 0 ? '▲' : '▼'} {Math.abs(parsed).toFixed(2)}%
    </span>
  );
};

const CryptoTable = () => {
  const coins = useSelector((state) => state.crypto.data);
  const [updatedCoins, setUpdatedCoins] = useState(coins);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates by modifying the coin data
      setUpdatedCoins((prevCoins) =>
        prevCoins.map((coin) => ({
          ...coin,
          current_price: coin.current_price + (Math.random() * 2 - 1), // Simulate price change
          price_change_percentage_1h_in_currency: coin.price_change_percentage_1h_in_currency + (Math.random() * 0.2 - 0.1), // Simulate percentage change
          price_change_percentage_24h_in_currency: coin.price_change_percentage_24h_in_currency + (Math.random() * 0.5 - 0.25),
          price_change_percentage_7d_in_currency: coin.price_change_percentage_7d_in_currency + (Math.random() * 1 - 0.5),
        }))
      );
    }, 1000 + Math.random() * 1000); // Update every 1-2 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // Limit the number of coins to 5
  const limitedCoins = updatedCoins.slice(0, 5);

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white rounded shadow-md">
        <thead>
          <tr className="text-left text-gray-600 text-sm border-b">
            <th className="p-3">#</th>
            <th className="p-3">Name</th>
            <th className="p-3">Price</th>
            <th className="p-3">1h %</th>
            <th className="p-3">24h %</th>
            <th className="p-3">7d %</th>
            <th className="p-3">Market Cap</th>
            <th className="p-3">Volume(24h)</th>
            <th className="p-3">Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {limitedCoins.map((coin, index) => (
            <tr key={coin.id} className="border-b hover:bg-gray-50 text-sm">
              <td className="p-3">{index + 1}</td>
              <td className="p-3 flex items-center gap-2">
                <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                <span>{coin.name}</span>
                <span className="text-gray-500 uppercase">{coin.symbol}</span>
              </td>
              <td className="p-3">${coin.current_price.toFixed(2)}</td>
              <td className="p-3">{formatPercent(coin.price_change_percentage_1h_in_currency)}</td>
              <td className="p-3">{formatPercent(coin.price_change_percentage_24h_in_currency)}</td>
              <td className="p-3">{formatPercent(coin.price_change_percentage_7d_in_currency)}</td>
              <td className="p-3">${coin.market_cap.toLocaleString()}</td>
              <td className="p-3">${coin.total_volume.toLocaleString()}</td>
              <td className="p-3">
                <Chart7D data={[...Array(7)].map((_, i) => ({
                  time: `Day ${i + 1}`,
                  price: coin.current_price + Math.random() * 20 - 10 // mock trend
                }))} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
