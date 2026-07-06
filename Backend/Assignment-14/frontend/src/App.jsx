import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  // லாகின் நிலையை கண்காணிக்க ஒரு State 
  // வீடியோவில் டெஸ்ட் செய்து காட்ட தற்காலிகமாக true என்று வைத்துள்ளேன்
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    // லாக்அவுட் செய்யும்போது ஸ்டேட்டை false ஆக மாற்றி, லாகின் பக்கத்திற்கு பயனரை அனுப்பலாம்
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
            <Link to="/" className="hover:text-indigo-300 transition-colors font-medium">Dashboard</Link>
            <Link to="/customers" className="hover:text-indigo-300 transition-colors font-medium">Customers</Link>
            
            {/* Conditional Rendering: லாகின் ஸ்டேட்டை பொறுத்து பட்டன் மாறும் */}
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
            {/* Login பக்கத்திற்கு இந்த setIsLoggedIn ஸ்டேட்டை அனுப்புகிறோம், லாகின் ஆகும்போது true செய்ய */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;