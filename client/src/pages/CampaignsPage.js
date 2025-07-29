import React, { useEffect, useState } from 'react';
import styles from './CampaignsPage.module.css';

const defaultImages = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=600&q=80',
];

function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', status: 'Active', description: '', image: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  // Fetch campaigns from backend
  const fetchCampaigns = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/campaigns');
      const data = await res.json();
      setCampaigns((data.campaigns || []).map((c, i) => ({ ...c, image: c.image || defaultImages[i % defaultImages.length] })));
    } catch (err) {
      setError('Failed to fetch campaigns');
    }
    setLoading(false);
  };

  const handleFormChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = () => {
    setForm({ title: '', status: 'Active', description: '', image: '' });
    setEditId(null);
    setShowForm(true);
    setError('');
    setSuccess('');
  };

  const handleEdit = campaign => {
    setForm({ title: campaign.title, status: campaign.status, description: campaign.description, image: campaign.image });
    setEditId(campaign._id);
    setShowForm(true);
    setError('');
    setSuccess('');
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this campaign?')) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/campaigns/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Delete failed');
      setSuccess('Campaign deleted');
      fetchCampaigns();
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
        res = await fetch(`/api/campaigns/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
      } else {
        res = await fetch('/api/campaigns', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
      }
      data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed');
      setSuccess(editId ? 'Campaign updated' : 'Campaign added');
      setShowForm(false);
      fetchCampaigns();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className={styles.campaignsContainer}>
      <div className={styles.campaignsHeader}>
        <div className={styles.campaignsTitle}>Campaigns</div>
        <button className={styles.campaignsAddBtn} onClick={handleAdd}>Add Campaign</button>
      </div>
      {success && <div className={styles.campaignsSuccess}>{success}</div>}
      {error && <div className={styles.campaignsError}>{error}</div>}
      {showForm && (
        <form className={styles.campaignsForm} onSubmit={handleFormSubmit}>
          <input className={styles.campaignsInput} name="title" value={form.title} onChange={handleFormChange} placeholder="Title" required />
          <select className={styles.campaignsInput} name="status" value={form.status} onChange={handleFormChange}>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Paused">Paused</option>
          </select>
          <textarea className={styles.campaignsInput} name="description" value={form.description} onChange={handleFormChange} placeholder="Description" rows={3} />
          <label className={styles.campaignsInput} style={{padding:0, border:'none', background:'none'}}>Image:
            <input type="file" accept="image/*" onChange={handleImageChange} style={{marginTop:'0.5rem'}} />
          </label>
          <div className={styles.campaignsFormActions}>
            <button className={styles.campaignsFormBtn} type="submit">{editId ? 'Update' : 'Add'}</button>
            <button className={styles.campaignsFormBtn} type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      )}
      <table className={styles.campaignsTable}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Status</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map(c => (
            <tr key={c._id}>
              <td>
                <img 
                  src={c.image || defaultImages[campaigns.indexOf(c) % defaultImages.length]} 
                  alt="Campaign" 
                  style={{width:90, height:60, objectFit:'cover', borderRadius:10, boxShadow:'0 2px 8px rgba(0,0,0,0.10)'}} 
                />
              </td>
              <td>{c.title}</td>
              <td>{c.status}</td>
              <td>{c.description}</td>
              <td>
                <div className={styles.campaignsActions}>
                  <button className={styles.campaignsActionBtn} onClick={() => handleEdit(c)}>Edit</button>
                  <button className={styles.campaignsActionBtn} onClick={() => handleDelete(c._id)}>Delete</button>
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

export default CampaignsPage;
