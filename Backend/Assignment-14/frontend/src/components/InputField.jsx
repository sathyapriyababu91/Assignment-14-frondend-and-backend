// src/components/InputField.jsx
import React from 'react';

function InputField({ label, type = 'text', name, value, onChange, placeholder, error }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">{label}</label>
      <input 
        type={type} 
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder} 
        className="w-full p-3 border border-gray-200 rounded-xl text-sm bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all shadow-inner" 
      />
      {error && <p className="text-xs text-rose-500 mt-1">{error}</p>}
    </div>
  );
}

export default InputField;