import React, { useEffect, useState } from 'react';
import styles from './DashboardPage.module.css';

function DashboardPage() {
  const [stats, setStats] = useState({ customers: 0, sales: 0, campaigns: 0 });
  const [recentCustomers, setRecentCustomers] = useState([]);
  const [recentCampaigns, setRecentCampaigns] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    fetchStats();
    fetchRecentCustomers();
    fetchRecentCampaigns();
  }, []);

  // Fetch stats from backend
  const fetchStats = async () => {
    try {
      const res = await fetch('/api/customers?page=1&limit=1');
      const data = await res.json();
      setStats(s => ({ ...s, customers: data.total || 0 }));
    } catch {
      setStats(s => ({ ...s, customers: 0 }));
    }
    // TODO: Fetch sales and campaigns from backend if available
  };

  // Fetch recent customers from backend
  const fetchRecentCustomers = async () => {
    try {
      const res = await fetch('/api/customers?page=1&limit=5');
      const data = await res.json();
      setRecentCustomers(data.customers || []);
    } catch {
      setRecentCustomers([]);
    }
  };

  // Simulate recent campaigns fetch
  const fetchRecentCampaigns = async () => {
    setRecentCampaigns([
      { title: 'Summer Sale', status: 'Active' },
      { title: 'Q2 Outreach', status: 'Completed' },
      { title: 'New Leads', status: 'Active' },
    ]);
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardHeader}>
        <div className={styles.dashboardTitle}>Dashboard</div>
      </div>
      <div className={styles.dashboardStats}>
        <div className={styles.dashboardStat}>
          <div className={styles.dashboardStatLabel}>Customers</div>
          <div className={styles.dashboardStatValue}>{stats.customers}</div>
        </div>
        <div className={styles.dashboardStat}>
          <div className={styles.dashboardStatLabel}>Sales</div>
          <div className={styles.dashboardStatValue}>{stats.sales}</div>
        </div>
        <div className={styles.dashboardStat}>
          <div className={styles.dashboardStatLabel}>Campaigns</div>
          <div className={styles.dashboardStatValue}>{stats.campaigns}</div>
        </div>
      </div>
      <div className={styles.dashboardSection}>
        <div className={styles.dashboardSectionTitle}>Recent Customers</div>
        <ul className={styles.dashboardList}>
          {recentCustomers.map((c, i) => (
            <li key={i} className={styles.dashboardListItem} onClick={() => setSelectedCustomer(c)} style={{cursor:'pointer'}}>
              <strong>{c.name}</strong> &mdash; {c.company}
            </li>
          ))}
        </ul>
        {selectedCustomer && (
          <div style={{background:'#f5f5f5',borderRadius:'12px',padding:'1.5rem',marginTop:'1rem',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
            <h3 style={{color:'#1976d2',marginBottom:'1rem'}}>Customer Details</h3>
            <div><strong>Name:</strong> {selectedCustomer.name}</div>
            <div><strong>Company:</strong> {selectedCustomer.company}</div>
            <div><strong>Email:</strong> {selectedCustomer.email}</div>
            <div><strong>Phone:</strong> {selectedCustomer.phone}</div>
            <div><strong>Status:</strong> {selectedCustomer.status}</div>
            <div><strong>Notes:</strong> {selectedCustomer.notes}</div>
            <button style={{marginTop:'1rem',background:'#1976d2',color:'#fff',border:'none',borderRadius:'8px',padding:'0.5rem 1.2rem',cursor:'pointer'}} onClick={()=>setSelectedCustomer(null)}>Close</button>
          </div>
        )}
      </div>
      <div className={styles.dashboardSection}>
        <div className={styles.dashboardSectionTitle}>Recent Campaigns</div>
        <ul className={styles.dashboardList}>
          {recentCampaigns.map((c, i) => (
            <li key={i} className={styles.dashboardListItem}>
              <strong>{c.title}</strong> &mdash; <span style={{color: c.status==='Active'?'#1976d2':'#555'}}>{c.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DashboardPage;
