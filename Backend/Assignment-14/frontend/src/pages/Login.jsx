import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    let localErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.email.trim()) {
      localErrors.email = "Business email is required";
    } else if (!emailRegex.test(formData.email)) {
      localErrors.email = "Invalid email address";
    }

    if (!formData.password) {
      localErrors.password = "Password is required";
    }

    setErrors(localErrors);
    return Object.keys(localErrors).length === 0;
  };

  // லாகின் பக்கத்தை பேக்எண்ட் API உடன் இணைக்கும் பகுதி
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // டோக்கனை லோக்கல் ஸ்டோரேஜில் சேமிக்கிறோம் (செஷனுக்காக)
        localStorage.setItem('token', data.token);
        
        // App.jsx-ல் இருக்கும் லாகின் நிலையை true என மாற்றுகிறோம்
        setIsLoggedIn(true); 

        alert("Login Successful!");
        navigate('/'); // முகப்புப் பக்கத்திற்கு (Dashboard) அழைத்துச் செல்கிறது
      } else {
        setServerError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      setServerError('Server connection error. Is backend running?');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-slate-900 p-6 text-center text-white">
        <h2 className="text-2xl font-bold tracking-wide">Welcome Back</h2>
        <p className="text-indigo-200 text-xs mt-1">Sign in to manage your customer relationships</p>
      </div>

      <form className="p-8 space-y-5" onSubmit={handleSubmit}>
        {serverError && (
          <div className="p-3 rounded-lg text-sm font-medium bg-rose-50 text-rose-600">
            {serverError}
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Business Email</label>
          <input 
            type="text" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@company.com" 
            className="w-full p-3 border border-gray-200 rounded-xl text-sm bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all shadow-inner" 
          />
          {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
        </div>
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Password</label>
            <a href="#" className="text-xs text-indigo-600 hover:underline font-medium">Forgot?</a>
          </div>
          <input 
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••" 
            className="w-full p-3 border border-gray-200 rounded-xl text-sm bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all shadow-inner" 
          />
          {errors.password && <p className="text-xs text-rose-500 mt-1">{errors.password}</p>}
        </div>

        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl font-semibold transition-all text-sm shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 transform active:scale-[0.98]">
          Sign In to Dashboard
        </button>
      </form>

      <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 text-center text-sm text-gray-500">
        New to the platform? <Link to="/register" className="text-indigo-600 font-semibold hover:underline">Create an account</Link>
      </div>
    </div>
  );
}

export default Login;