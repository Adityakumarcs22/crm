import React from 'react';

function HomePage() {
  return (
    <div style={{maxWidth:'900px',margin:'0 auto',textAlign:'center'}}>
      <h2>Welcome to the CRM System</h2>
      <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80" alt="CRM Dashboard" style={{width:'100%',maxWidth:'600px',borderRadius:'12px',marginBottom:'2rem'}} />
      <p style={{fontSize:'1.2rem',margin:'2rem 0'}}>
        Our CRM platform empowers your business to manage customer relationships, sales pipelines, and marketing campaigns with ease. Gain actionable insights, automate workflows, and drive growth with a modern, secure, and scalable solution.
      </p>
      <div style={{display:'flex',justifyContent:'space-around',flexWrap:'wrap',gap:'2rem'}}>
        <div style={{flex:'1',minWidth:'250px',background:'#f5f5f5',padding:'1.5rem',borderRadius:'8px'}}>
          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Customer Management" style={{width:'100%',borderRadius:'8px',marginBottom:'1rem'}} />
          <h3>Customer Management</h3>
          <p>Centralize customer data, track interactions, and improve retention with smart segmentation and notes.</p>
        </div>
        <div style={{flex:'1',minWidth:'250px',background:'#f5f5f5',padding:'1.5rem',borderRadius:'8px'}}>
          <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80" alt="Sales Pipeline" style={{width:'100%',borderRadius:'8px',marginBottom:'1rem'}} />
          <h3>Sales Pipeline</h3>
          <p>Visualize and manage deals, automate follow-ups, and optimize your sales process for maximum conversion.</p>
        </div>
        <div style={{flex:'1',minWidth:'250px',background:'#f5f5f5',padding:'1.5rem',borderRadius:'8px'}}>
          <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80" alt="Campaign Automation" style={{width:'100%',borderRadius:'8px',marginBottom:'1rem'}} />
          <h3>Campaign Automation</h3>
          <p>Launch targeted campaigns, automate outreach, and measure results with built-in analytics and reporting.</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
