import React, { useState, useEffect } from 'react';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', status: 'Lead' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null); // எடிட் செய்யும் கஸ்டமரின் ID-ஐ சேமிக்க

  // 1. கஸ்டமர்களை எடுத்து வரும் ஃபங்க்ஷன் (Read)
  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/customers');
      if (response.ok) {
        const data = await response.json();
        setCustomers(data);
      }
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    let localErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.name.trim()) localErrors.name = "Customer name is required";
    if (!formData.email.trim()) {
      localErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      localErrors.email = "Invalid email address";
    }
    if (!formData.phone.trim()) localErrors.phone = "Phone number is required";
    setErrors(localErrors);
    return Object.keys(localErrors).length === 0;
  };

  // 2. கஸ்டமரை உருவாக்குதல் (Create) மற்றும் மாற்றுதல் (Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      let response;
      if (editId) {
        // எடிட் மோடு ஆன் ஆக இருந்தால் PUT API-ஐ அழைக்கும்
        response = await fetch(`http://localhost:5000/api/customers/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        // புதிய கஸ்டமர் என்றால் POST API-ஐ அழைக்கும்
        response = await fetch('http://localhost:5000/api/customers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }

      if (response.ok) {
        alert(editId ? "Customer updated successfully!" : "Customer added successfully!");
        setFormData({ name: '', email: '', phone: '', status: 'Lead' });
        setEditId(null);
        fetchCustomers();
      } else {
        alert("Action failed");
      }
    } catch (err) {
      alert("Server connection error");
    } finally {
      setLoading(false);
    }
  };

  // 3. எடிட் பட்டன் கிளிக் செய்யும்போது ஃபார்மிற்கு டேட்டாவை மாற்றுதல்
  const handleEdit = (customer) => {
    setEditId(customer._id);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      status: customer.status
    });
  };

  // 4. கஸ்டமரை நீக்குதல் (Delete)
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/customers/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert("Customer deleted successfully!");
          fetchCustomers();
        } else {
          alert("Failed to delete customer");
        }
      } catch (err) {
        alert("Server connection error");
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* 💳 கஸ்டமர் சேர்க்கும்/எடிட் செய்யும் ஃபார்ம் */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-5xl mx-auto">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          {editId ? 'Edit Customer Details' : 'Add New Customer'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2.5 border border-gray-200 rounded-xl text-sm" placeholder="John Doe" />
            {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email</label>
            <input type="text" name="email" value={formData.email} onChange={handleChange} className="w-full p-2.5 border border-gray-200 rounded-xl text-sm" placeholder="john@example.com" />
            {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Phone</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2.5 border border-gray-200 rounded-xl text-sm" placeholder="9876543210" />
            {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2.5 border border-gray-200 rounded-xl text-sm bg-white">
              <option value="Lead">Lead</option>
              <option value="Contact">Contact</option>
              <option value="Customer">Customer</option>
            </select>
          </div>
          <div className="md:col-span-4 flex justify-end space-x-2">
            {editId && (
              <button type="button" onClick={() => { setEditId(null); setFormData({ name: '', email: '', phone: '', status: 'Lead' }); }} className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all">
                Cancel
              </button>
            )}
            <button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow-md transition-all">
              {loading ? 'Processing...' : editId ? 'Update Customer' : 'Add Customer'}
            </button>
          </div>
        </form>
      </div>

      {/* 📊 கஸ்டமர்கள் லிஸ்ட் டேபிள் */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-5xl mx-auto">
        <div className="p-5 border-b border-gray-50 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-slate-800">Customer Directory</h3>
          <span className="text-xs bg-indigo-50 text-indigo-600 font-bold px-2.5 py-1 rounded-full">{customers.length} Total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-gray-100">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-slate-600">
              {customers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-400">No customers found.</td>
                </tr>
              ) : (
                customers.map((customer) => (
                  <tr key={customer._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-semibold text-slate-800">{customer.name}</td>
                    <td className="p-4">{customer.email}</td>
                    <td className="p-4">{customer.phone}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        customer.status === 'Customer' ? 'bg-emerald-50 text-emerald-600' :
                        customer.status === 'Contact' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                      }`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="p-4 text-center space-x-3">
                      <button onClick={() => handleEdit(customer)} className="text-indigo-600 hover:text-indigo-900 font-semibold text-xs uppercase tracking-wider">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(customer._id)} className="text-rose-600 hover:text-rose-900 font-semibold text-xs uppercase tracking-wider">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Customers;