import React, { useState } from 'react';
import styles from './SalesPage.module.css';

const initialDeals = [
  { id: 1, title: 'Acme Corp', company: 'Acme Corp', value: '$12,000', stage: 'Lead', contact: 'alice@acme.com' },
  { id: 2, title: 'Beta LLC', company: 'Beta LLC', value: '$8,500', stage: 'Contacted', contact: 'bob@beta.com' },
  { id: 3, title: 'Gamma Inc', company: 'Gamma Inc', value: '$15,000', stage: 'Proposal', contact: 'carol@gamma.com' },
  { id: 4, title: 'Delta Ltd', company: 'Delta Ltd', value: '$5,000', stage: 'Negotiation', contact: 'dan@delta.com' },
  { id: 5, title: 'Epsilon Co', company: 'Epsilon Co', value: '$20,000', stage: 'Won', contact: 'eve@epsilon.com' },
];

const stages = ['Lead', 'Contacted', 'Proposal', 'Negotiation', 'Won', 'Lost'];

function SalesPage() {
  const [deals, setDeals] = useState(initialDeals);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', company: '', value: '', stage: 'Lead', contact: '' });
  const [editId, setEditId] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleFormChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    setForm({ title: '', company: '', value: '', stage: 'Lead', contact: '' });
    setEditId(null);
    setShowForm(true);
    setError('');
    setSuccess('');
  };

  const handleEdit = deal => {
    setForm({ title: deal.title, company: deal.company, value: deal.value, stage: deal.stage, contact: deal.contact });
    setEditId(deal.id);
    setShowForm(true);
    setError('');
    setSuccess('');
  };

  const handleDelete = id => {
    if (!window.confirm('Delete this deal?')) return;
    setDeals(deals.filter(d => d.id !== id));
    setSuccess('Deal deleted');
    setTimeout(() => setSuccess(''), 1500);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    if (!form.title || !form.company || !form.value) {
      setError('Title, company, and value are required');
      return;
    }
    if (editId) {
      setDeals(deals.map(d => d.id === editId ? { ...d, ...form } : d));
      setSuccess('Deal updated');
    } else {
      setDeals([...deals, { ...form, id: Date.now() }]);
      setSuccess('Deal added');
    }
    setShowForm(false);
    setTimeout(() => setSuccess(''), 1500);
  };

  return (
    <div className={styles.salesContainer}>
      <div className={styles.salesHeader}>
        <div className={styles.salesTitle}>Sales Pipeline</div>
        <button className={styles.salesAddBtn} onClick={handleAdd}>Add Deal</button>
      </div>
      {success && <div className={styles.salesSuccess}>{success}</div>}
      {error && <div className={styles.salesError}>{error}</div>}
      {showForm && (
        <form className={styles.salesForm} onSubmit={handleFormSubmit}>
          <input className={styles.salesInput} name="title" value={form.title} onChange={handleFormChange} placeholder="Deal Title" required />
          <input className={styles.salesInput} name="company" value={form.company} onChange={handleFormChange} placeholder="Company" required />
          <input className={styles.salesInput} name="value" value={form.value} onChange={handleFormChange} placeholder="Value" required />
          <input className={styles.salesInput} name="contact" value={form.contact} onChange={handleFormChange} placeholder="Contact Email" />
          <select className={styles.salesInput} name="stage" value={form.stage} onChange={handleFormChange}>
            {stages.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <div className={styles.salesFormActions}>
            <button className={styles.salesFormBtn} type="submit">{editId ? 'Update' : 'Add'}</button>
            <button className={styles.salesFormBtn} type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      )}
      <div className={styles.pipelineBoard}>
        {stages.map(stage => (
          <div className={styles.pipelineColumn} key={stage}>
            <div className={styles.pipelineColumnTitle}>{stage}</div>
            {deals.filter(d => d.stage === stage).map(d => (
              <div className={styles.pipelineCard} key={d.id}>
                <div className={styles.pipelineCardTitle}>{d.title}</div>
                <div className={styles.pipelineCardCompany}>{d.company}</div>
                <div className={styles.pipelineCardValue}>{d.value}</div>
                <div style={{fontSize:'0.95rem',color:'#555',marginBottom:'0.3rem'}}>{d.contact}</div>
                <div className={styles.pipelineCardActions}>
                  <button className={styles.pipelineActionBtn} onClick={() => handleEdit(d)}>Edit</button>
                  <button className={styles.pipelineActionBtn} onClick={() => handleDelete(d.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SalesPage;
