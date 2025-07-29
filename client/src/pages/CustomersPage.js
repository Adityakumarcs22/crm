import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './CustomersPage.module.css';

function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '' });
  const [editId, setEditId] = useState(null);

  // Fetch customers from backend
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/customers');
      const data = await res.json();
      setCustomers(data.customers || []);
    } catch (err) {
      setError('Failed to fetch customers');
    }
    setLoading(false);
  };

  const handleFormChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    setForm({ name: '', email: '', phone: '', company: '' });
    setEditId(null);
    setShowForm(true);
    setError('');
    setSuccess('');
  };

  const handleEdit = customer => {
    setForm({ name: customer.name, email: customer.email, phone: customer.phone || '', company: customer.company || '' });
    setEditId(customer._id);
    setShowForm(true);
    setError('');
    setSuccess('');
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this customer?')) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/customers/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Delete failed');
      setSuccess('Customer deleted');
      fetchCustomers();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      let res, data;
      if (editId) {
        res = await fetch(`/api/customers/${editId}`, {
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
      data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed');
      setSuccess(editId ? 'Customer updated' : 'Customer added');
      setShowForm(false);
      fetchCustomers();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className={styles.customersContainer}>
      <div className={styles.customersHeader}>
        <div className={styles.customersTitle}>Customers</div>
        <button className={styles.customersAddBtn} onClick={handleAdd}>Add Customer</button>
      </div>
      {success && <div className={styles.customersSuccess}>{success}</div>}
      {error && <div className={styles.customersError}>{error}</div>}
      {showForm && (
        <form className={styles.customersForm} onSubmit={handleFormSubmit}>
          <input className={styles.customersInput} name="name" value={form.name} onChange={handleFormChange} placeholder="Name" required />
          <input className={styles.customersInput} name="email" value={form.email} onChange={handleFormChange} placeholder="Email" required />
          <input className={styles.customersInput} name="phone" value={form.phone} onChange={handleFormChange} placeholder="Phone" />
          <input className={styles.customersInput} name="company" value={form.company} onChange={handleFormChange} placeholder="Company" />
          <div className={styles.customersFormActions}>
            <button className={styles.customersFormBtn} type="submit">{editId ? 'Update' : 'Add'}</button>
            <button className={styles.customersFormBtn} type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      )}
      <table className={styles.customersTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr key={c._id}>
              <td><Link to={`/customers/${c._id}`} style={{ color: '#1976d2', textDecoration: 'underline' }}>{c.name}</Link></td>
              <td>{c.email}</td>
              <td>{c.phone || '-'}</td>
              <td>{c.company || '-'}</td>
              <td>{c.status || '-'}</td>
              <td>{c.createdAt ? new Date(c.createdAt).toLocaleString() : '-'}</td>
              <td>
                <div className={styles.customersActions}>
                  <button className={styles.customersActionBtn} onClick={() => handleEdit(c)}>Edit</button>
                  <button className={styles.customersActionBtn} onClick={() => handleDelete(c._id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <div>Loading...</div>}
    </div>
  );
}

export default CustomersPage;
