import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };
  return (
    <nav style={{background:'#1976d2',padding:'1rem',color:'#fff',marginBottom:'2rem'}}>
      <ul style={{display:'flex',gap:'2rem',listStyle:'none',margin:0,padding:0,alignItems:'center'}}>
        <li><Link to="/" style={{color:'#fff',textDecoration:'none'}}>Home</Link></li>
        <li><Link to="/dashboard" style={{color:'#fff',textDecoration:'none'}}>Dashboard</Link></li>
        <li><Link to="/customers" style={{color:'#fff',textDecoration:'none'}}>Customers</Link></li>
        <li><Link to="/customers/1" style={{color:'#fff',textDecoration:'none'}}>Customer Details</Link></li>
        <li><Link to="/sales" style={{color:'#fff',textDecoration:'none'}}>Sales Pipeline</Link></li>
        <li><Link to="/profile" style={{color:'#fff',textDecoration:'none'}}>Profile</Link></li>
        <li><Link to="/about" style={{color:'#fff',textDecoration:'none'}}>About</Link></li>
        <li><Link to="/contact" style={{color:'#fff',textDecoration:'none'}}>Contact</Link></li>
        {/* ...existing code... */}
      </ul>
    </nav>
  );
}

export default Navbar;
