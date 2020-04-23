import React from 'react';
import './App.css';
import Customers from './components/customers';
import Trainings from './components/trainings';

function App() {
  return (
    <div className="App">
      <Customers />
      <Trainings />
    </div>
  );
}

export default App;
