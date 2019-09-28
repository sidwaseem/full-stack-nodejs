import React from 'react';
import AddCard from './components/addcard';
import List from './components/list';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Credit Card System</h1>
      </header>
      <main className="main-wrapper">
          <AddCard />
          <List />
      </main>
    </div>
  );
}

export default App;
