import './styles/App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SecondOption from './pages/SecondOption';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/secondoption" element={<SecondOption />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
