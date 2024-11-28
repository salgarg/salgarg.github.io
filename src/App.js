import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AboutMe from './components/AboutMe';
import Photography from './components/Photography';
import DigitalArt from './components/DigitalArt';

const App = () => {
  return (
    <div>
      <nav style={{ padding: '1rem', backgroundColor: '#f5f5f5' }}>
        <Link to="/" style={{ margin: '0 1rem' }}>About Me</Link>
        <Link to="/photography" style={{ margin: '0 1rem' }}>Photography</Link>
        <Link to="/digital-art" style={{ margin: '0 1rem' }}>Digital Art</Link>
      </nav>

      <Routes>
        <Route path="/" element={<AboutMe />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/digital-art" element={<DigitalArt />} />
      </Routes>
    </div>
  );
};

export default App;
