// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartScreen from './assets/components/StartScreen'; 
import LogIn from './assets/components/LogIn';  
import Categorias from './assets/components/Categorias';


const App = () => {
  return (
    <Router>
      <Routes> 
      <Route path="/" element={<StartScreen />} />
      <Route path="/login" element={<LogIn />} /> 
      <Route path ="/categorias" element = {<Categorias />} />

      </Routes>
    </Router>
  );
};



export default App
