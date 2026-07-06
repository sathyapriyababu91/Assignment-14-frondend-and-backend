import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    alert("Logged out successfully!");
  };

  return (
    <Router>
      <div className="font-sans min-h-screen bg-gray-50">
        {/* Navigation Header */}
        <nav className="bg-slate-800 text-white p-4 flex items-center justify-between shadow-md">
          <b className="text-xl tracking-wide text-indigo-400">⚡ CRM Solution</b>
          <div className="flex gap-6 items-center">
            {isLoggedIn && (
              <>
                <Link to="/" className="hover:text-indigo-300 transition-colors font-medium">Dashboard</Link>
                <Link to="/customers" className="hover:text-indigo-300 transition-colors font-medium">Customers</Link>
              </>
            )}
            
            {isLoggedIn ? (
              <button 
                onClick={handleLogout}
                className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors shadow-sm"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/login" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </nav>

        {/* Dynamic Page Routes */}
        <div className="max-w-7xl mx-auto mt-6 px-4 pb-12">
          <Routes>
            <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
            
            <Route 
              path="/customers" 
              element={isLoggedIn ? <Customers /> : <Navigate to="/login" />} 
            /> 
            
            <Route path="/login" element={!isLoggedIn ? <Login setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />} />
            <Route path="/register" element={!isLoggedIn ? <Register /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;