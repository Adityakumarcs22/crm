import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'customer' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || 'Registration failed');
      setSuccess('Registration successful! You can now login.');
      setTimeout(()=>navigate('/login'), 1200);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{maxWidth:400,margin:'2rem auto',padding:24,background:'#fff',borderRadius:8,boxShadow:'0 2px 8px #0001'}}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required style={{width:'100%',marginBottom:12}} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{width:'100%',marginBottom:12}} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required style={{width:'100%',marginBottom:12}} />
        <select name="role" value={form.role} onChange={handleChange} style={{width:'100%',marginBottom:12}}>
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
        {error && <div style={{color:'red',marginBottom:8}}>{error}</div>}
        {success && <div style={{color:'green',marginBottom:8}}>{success}</div>}
        <button type="submit" style={{width:'100%',background:'#1976d2',color:'#fff',padding:8,border:'none',borderRadius:4}}>Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'customer' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || 'Registration failed');
      setSuccess('Registration successful! You can now login.');
      setTimeout(()=>navigate('/login'), 1200);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{maxWidth:400,margin:'2rem auto',padding:24,background:'#fff',borderRadius:8,boxShadow:'0 2px 8px #0001'}}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required style={{width:'100%',marginBottom:12}} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{width:'100%',marginBottom:12}} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required style={{width:'100%',marginBottom:12}} />
        <select name="role" value={form.role} onChange={handleChange} style={{width:'100%',marginBottom:12}}>
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
        {error && <div style={{color:'red',marginBottom:8}}>{error}</div>}
        {success && <div style={{color:'green',marginBottom:8}}>{success}</div>}
        <button type="submit" style={{width:'100%',background:'#1976d2',color:'#fff',padding:8,border:'none',borderRadius:4}}>Register</button>
      </form>
    </div>
  );
}


