import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import Brands from './Components/Brands';
import ProtectedRoute from './Components/ProtectedRoute';
import IsAuthenticate from './Components/IsAuthenticate';
import Dashboard from './Components/DashboardPage';
import PIPage from './Components/PIPage';
import CIPage from './Components/CIPage';
import CNPage from './Components/CNPage';
import RemittancePage from './Components/RemittancePage';
import useAutoLogout from "./Components/AutoLogout";
import MarketPage from "./Components/MarketingPage";

function App() {
  return (
    <Router> {/* ✅ Wrap the whole app inside <Router> */}
        <MainComponent />
    </Router>
  );
  }

function MainComponent() {
  useAutoLogout(); // ✅ Call useAutoLogout() inside a component wrapped in <Router>

  return (
      <Routes>
          <Route path="/login" element={<IsAuthenticate><LoginPage /></IsAuthenticate>} />
          <Route path="/" element={<ProtectedRoute><Brands /></ProtectedRoute>} />
          <Route path="/dashboard/:name" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/pi/:name" element={<ProtectedRoute><PIPage /></ProtectedRoute>} />
          <Route path="/ci/:name" element={<ProtectedRoute><CIPage /></ProtectedRoute>} />
          <Route path="/cn/:name" element={<ProtectedRoute><CNPage /></ProtectedRoute>} />
          <Route path="/remittance/:name" element={<ProtectedRoute><RemittancePage /></ProtectedRoute>} />
          <Route path="/market/:name" element={<ProtectedRoute>< MarketPage /></ProtectedRoute>} />
      </Routes>
  );
}

export default App;
