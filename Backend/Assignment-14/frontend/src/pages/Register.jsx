import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    let localErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) localErrors.name = "Full name is required";
    
    if (!formData.email.trim()) {
      localErrors.email = "Business email is required";
    } else if (!emailRegex.test(formData.email)) {
      localErrors.email = "Invalid email address";
    }

    if (!formData.password) {
      localErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      localErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      localErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(localErrors);
    return Object.keys(localErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration Successful! Please Login.");
        navigate('/login');
      } else {
        setServerMessage({ type: 'error', text: data.message || 'Registration failed' });
      }
    } catch (err) {
      setServerMessage({ type: 'error', text: 'Server connection error. Make sure backend is running!' });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-slate-900 p-6 text-center text-white">
        <h2 className="text-2xl font-bold tracking-wide">Create Account</h2>
        <p className="text-indigo-200 text-xs mt-1">Get started with your CRM Dashboard setup</p>
      </div>

      <form className="p-8 space-y-4" onSubmit={handleSubmit}>
        {serverMessage.text && (
          <div className={`p-3 rounded-lg text-sm font-medium ${serverMessage.type === 'error' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
            {serverMessage.text}
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Alex John" className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
          {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Business Email</label>
          <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="name@company.com" className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
          {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
          {errors.password && <p className="text-xs text-rose-500 mt-1">{errors.password}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Confirm Password</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
          {errors.confirmPassword && <p className="text-xs text-rose-500 mt-1">{errors.confirmPassword}</p>}
        </div>

        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl font-semibold transition-all text-sm shadow-md">
          Create Business Account
        </button>
      </form>

      <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 text-center text-sm text-gray-500">
        Already have an account? <Link to="/login" className="text-indigo-600 font-semibold hover:underline">Sign In</Link>
      </div>
    </div>
  );
}

export default Register;