import React, { useEffect, useState } from 'react';

function CustomerManager() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', status: 'Active' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/customers');
      const data = await res.json();
      setCustomers(data);
      if (data.length === 0) setSuccess('No customers found. Add a new customer!');
    } catch (err) {
      setError('Failed to fetch customers');
    }
    setLoading(false);
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      let res;
      if (editingId) {
        res = await fetch(`/api/customers/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
      } else {
        res = await fetch('/api/customers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
      }
      if (!res.ok) {
        const errData = await res.json();
        if (errData.error && errData.error.includes('duplicate key')) {
          throw new Error('Email already exists. Please use a different email.');
        }
        throw new Error(errData.error || 'Operation failed');
      }
      setForm({ name: '', email: '', status: 'Active' });
      setEditingId(null);
      setSuccess(editingId ? 'Customer updated successfully!' : 'Customer added successfully!');
      fetchCustomers();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleEdit = customer => {
    setForm({ name: customer.name, email: customer.email, status: customer.status });
    setEditingId(customer._id || customer.id);
  };

  const handleDelete = async id => {
    if (!id) {
      setError('Invalid customer ID.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`/api/customers/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Delete failed');
      }
      fetchCustomers();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{marginBottom: '2rem'}}>
      <h3>Customer Data</h3>
      {error && <div style={{color:'red',marginBottom:'1rem'}}>{error}</div>}
      {success && <div style={{color:'green',marginBottom:'1rem'}}>{success}</div>}
      {loading && <div>Loading...</div>}
      <form onSubmit={handleSubmit} style={{display: 'flex', gap: '1rem', marginBottom: '1rem'}}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required type="email" />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Active">Active</option>
          <option value="Prospect">Prospect</option>
        </select>
        <button type="submit" style={{background:'#1976d2',color:'#fff',border:'none',padding:'0.5rem 1rem',borderRadius:4}} disabled={loading}>
          {editingId ? 'Update' : 'Add'}
        </button>
        {editingId && <button type="button" onClick={()=>{setEditingId(null);setForm({name:'',email:'',status:'Active'});}} disabled={loading}>Cancel</button>}
      </form>
      <table style={{width:'100%',borderCollapse:'collapse'}}>
        <thead>
          <tr style={{background:'#eee'}}>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.length === 0 ? (
            <tr><td colSpan="4" style={{textAlign:'center'}}>No customers found.</td></tr>
          ) : customers.map(c => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.status}</td>
              <td>
                <button onClick={()=>handleEdit(c)} style={{marginRight:'0.5rem'}}>Edit</button>
                <button onClick={()=>handleDelete(c._id)} style={{color:'red'}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerManager;
