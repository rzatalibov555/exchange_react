// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {




  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [convertedValue, setConvertedValue] = useState(null);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);

  };

  const handleFromCurrencyChange = (e) => {
    setFrom(e.target.value);

  };

  const handleToCurrencyChange = (e) => {
    setTo(e.target.value);

  };

  useEffect(() => {
    convertCurrency();
  }, [amount, from, to]);


  const convertCurrency = async () => {

    if( amount <= 0){
      return ;
    }

    if(from == to){
      return ;
    }

    try {
      const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data`);
      }

      const data = await response.json();
      const rate = data.rates[to];

      setConvertedValue(rate);

    } catch (error) {
      console.error('Error fetching data:', error);
      setConvertedValue('Error');
    }
  };
  

  return (
    <>
      <div className="container">

        <input type="number" value={amount} onChange={handleAmountChange} />
        
        <select value={from} onChange={handleFromCurrencyChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>

        <select value={to} onChange={handleToCurrencyChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>

       

        {convertedValue !== null && (
          <p>{convertedValue} {to}</p>
        )}
      </div>
    </>
  );
}

export default App;
