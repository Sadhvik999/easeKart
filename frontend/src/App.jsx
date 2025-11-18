import React from 'react';
import { BrowserRouter , Route , Routes } from 'react-router-dom';
import LandingPage from '../src/components/LandingPage.jsx'
import Auth from '../src/components/auth.jsx';
import './App.css'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<LandingPage/>} />
        <Route path = "/auth" element = {<Auth/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App