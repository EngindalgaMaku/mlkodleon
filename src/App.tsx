import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import MLSimulation from './components/MLSimulation';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AlgorithmsPage from './pages/AlgorithmsPage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/algorithms" element={<AlgorithmsPage />} />
            <Route path="/" element={<MLSimulation />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;