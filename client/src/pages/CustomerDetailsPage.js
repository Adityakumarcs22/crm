import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function CustomerDetailsPage() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchCustomer() {
      try {
        setLoading(true);
        const res = await fetch(`/api/customers/${id}`);
        if (!res.ok) throw new Error('Customer not found');
        const data = await res.json();
        setCustomer(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCustomer();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{color:'red'}}>{error}</div>;
  if (!customer) return <div>No customer found.</div>;

  return (
    <div style={{maxWidth:600,margin:'2rem auto',padding:24,background:'#fff',borderRadius:8,boxShadow:'0 2px 8px #0001'}}>
      <h2>Customer Details</h2>
      <table style={{width:'100%',marginBottom:24}}>
        <tbody>
          <tr><td><b>Name:</b></td><td>{customer.name}</td></tr>
          <tr><td><b>Email:</b></td><td>{customer.email}</td></tr>
          <tr><td><b>Phone:</b></td><td>{customer.phone}</td></tr>
          <tr><td><b>Address:</b></td><td>{customer.address}</td></tr>
          <tr><td><b>Joined:</b></td><td>{customer.joined ? new Date(customer.joined).toLocaleDateString() : ''}</td></tr>
        </tbody>
      </table>
      <Link to="/customers" style={{color:'#1976d2'}}>Back to Customers</Link>
    </div>
  );
}

export default CustomerDetailsPage;
