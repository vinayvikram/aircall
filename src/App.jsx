import React from 'react';
import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Detail from './components/Detail';

const App = () => {


  return (
        <BrowserRouter>
          <div className='container'>
            <div className="container-view">
                <Routes>
                <Route 
                  path="/" 
                  element={
                    <Home />
                  }
                />
                <Route 
                  path="/detail/:id" 
                  element={
                    <Detail />
                  }
                />
                </Routes>
            </div>
          </div>
        </BrowserRouter>
  );
};


export default App;