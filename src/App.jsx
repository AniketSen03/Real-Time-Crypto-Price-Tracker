// App.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCryptoData } from './cryptoSlice';  // Import the fetchCryptoData action
import CryptoTable from './CryptoTable';  // Your table component

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initial fetch when the app loads
    dispatch(fetchCryptoData());

    // Set interval to fetch data every 2 seconds
    const interval = setInterval(() => {
      dispatch(fetchCryptoData());  // Dispatch action to fetch new data every 2 seconds
    }, 2000);  // Update every 2 seconds

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="App">
      <CryptoTable />
    </div>
  );
}

export default App;
