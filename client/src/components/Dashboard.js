import React, { useEffect, useState } from 'react';
import CustomerManager from './CustomerManager';

function Dashboard() {
  const [salesPipeline, setSalesPipeline] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [salesRes, campaignsRes, analyticsRes] = await Promise.all([
        fetch('/api/sales-pipeline'),
        fetch('/api/campaigns'),
        fetch('/api/analytics'),
      ]);
      setSalesPipeline(await salesRes.json());
      setCampaigns(await campaignsRes.json());
      setAnalytics(await analyticsRes.json());
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h2>CRM Dashboard</h2>
      <CustomerManager />
      <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap'}}>
        <section style={{border: '1px solid #ccc', padding: '1rem', minWidth: '250px'}}>
          <h3>Sales Pipeline</h3>
          <ul>
            {salesPipeline.map(s => (
              <li key={s.id}>{s.stage} - ${s.value}</li>
            ))}
          </ul>
        </section>
        <section style={{border: '1px solid #ccc', padding: '1rem', minWidth: '250px'}}>
          <h3>Campaign Automation</h3>
          <ul>
            {campaigns.map(c => (
              <li key={c.id}>{c.name} - {c.status}</li>
            ))}
          </ul>
        </section>
        <section style={{border: '1px solid #ccc', padding: '1rem', minWidth: '250px'}}>
          <h3>Analytics</h3>
          <ul>
            <li>Retention Rate: {analytics.retentionRate}%</li>
            <li>Conversion Rate: {analytics.conversionRate}%</li>
            <li>Total Sales: ${analytics.totalSales}</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
