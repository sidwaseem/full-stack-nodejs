import React, { useState, useEffect } from 'react';

import AddCard from './components/addcard';
import List from './components/list';

import './App.css';

/**
 * App component
 * @function App
 */
const App = () => {
  const [data, setData] = useState([]);
    /**
     * Hooks for fetching all card details details
     */
    useEffect(() => {
        const fetchData = async () => {
            const rawdata = await fetch('/api/list');
            const response = await rawdata.json();

            setData(response.list);
        };
        fetchData();
    }, []);

    /**
     * Handle new card addition
     * @function on AddCard
     * @param {Array} updatedList array of data
     */
    const onAddCard = (updatedList) => {
      setData(updatedList);
    }
  
    /**
     * Render markup
     * @returns {HTMLObject|JSX}
     */
    return (
      <div className="container bg-light App">
        <header className="row">
            <div className="col-12 py-5">
              <h1 className="my-3">Credit Card System</h1>
            </div>
        </header>
        <main className="container text-left">
            <AddCard onAddCard={onAddCard} />
            <List cards={data} />
        </main>
      </div>
    );
}

export default App;
