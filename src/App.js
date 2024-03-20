
import React from 'react';
import './App.css';
import BgImg from './Components/BgImg';
import Navbar from './Components/Navbar';
import Dashboard from './Pages/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Price from './Pages/price';
import News from './Components/News';
import Disease from './Pages/Disease';
import DiseasePredict from './Components/DiseasePredict';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <BgImg/>
        {/* Define routes for Dashboard and PricePage */}
        <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/price" element={<Price/>} />
        <Route path="/news" element={<News/>} />
        <Route path="/disease" element={<DiseasePredict/>} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
