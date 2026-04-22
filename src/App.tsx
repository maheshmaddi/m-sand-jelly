import { BrowserRouter, Routes, Route } from 'react-router';
import AppContent from './AppContent';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </BrowserRouter>
  );
}
