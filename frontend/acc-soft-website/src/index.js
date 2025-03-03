import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Route, Router } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const PORT = process.env.PORT || 3000;  // ✅ Use Render's assigned port
App.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


