// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartScreen from './assets/components/StartScreen';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartScreen />} />
      </Routes>
    </Router>
  );
};



export default App
