import { BrowserRouter, Routes, Route } from 'react-router';
import AppContent from './AppContent';
import EstimatorPage from './pages/EstimatorPage';
import Navigation from './sections/Navigation';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AppContent />} />
        <Route path="/estimator/:type?" element={
          <div className="relative">
            <Navigation onNavigate={(id) => { if (id === 'estimator') return; window.location.href = '/#estimator'; }} />
            <EstimatorPage />
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}
