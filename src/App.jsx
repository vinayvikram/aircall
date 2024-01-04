import React from 'react';
import Header from './components/Header';
import ActivityFeed from './components/ActivityFeed';
import "./App.css";

const App = () => {
  return (
    <div className='container'>
      <Header/>
      <div className="container-view">
        <ActivityFeed />
      </div>
    </div>
  );
};


export default App;