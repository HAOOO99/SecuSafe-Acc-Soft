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

function App() {
  return (
    <Router>
      
      <Routes>
        {/* <Route path="/" element={<MainHome></MainHome>}></Route> */}
        <Route path="/login" element={<IsAuthenticate> <LoginPage /> </IsAuthenticate> } />
        <Route path="/" element={<ProtectedRoute> <Brands /> </ProtectedRoute>} />
        <Route path="/dashboard/:name" element= {<ProtectedRoute> <Dashboard /></ProtectedRoute>} />
        <Route path="/pi/:name" element= {<ProtectedRoute> <PIPage /></ProtectedRoute>} />
        <Route path="/ci/:name" element= {<ProtectedRoute> <CIPage /></ProtectedRoute>} />
        <Route path="/cn/:name" element= {<ProtectedRoute> <CNPage /></ProtectedRoute>}/>
        <Route path="/remittance/:name" element= {<ProtectedRoute> <RemittancePage /></ProtectedRoute>}/>

      </Routes>

    </Router>
  );
}

export default App;
