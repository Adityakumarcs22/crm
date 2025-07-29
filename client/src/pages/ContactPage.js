import React, { useState } from 'react';
import styles from './ContactPage.module.css';

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send message');
      setSuccess(data.message);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className={styles.contactContainer}>
      <h2 className={styles.contactTitle}>Contact Us</h2>
      <div className={styles.contactSection}>
        <p>We’re here to help! Reach out to our team for support, questions, or feedback.</p>
      </div>
      <div className={styles.contactSection}>
        <h3>Email</h3>
        <p><a href="mailto:support@crm.com">aditya1001@gmail.com</a></p>
      </div>
      <div className={styles.contactSection}>
        <h3>Phone</h3>
        <p>+919656000051</p>
      </div>
      <div className={styles.contactSection}>
        <h3>Office Address</h3>
        <p>123 CRM Avenue, Lucknow , India</p>
      </div>
      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <input className={styles.contactInput} name="name" value={form.name} onChange={handleChange} type="text" placeholder="Your Name" required />
        <input className={styles.contactInput} name="email" value={form.email} onChange={handleChange} type="email" placeholder="Your Email" required />
        <textarea className={styles.contactTextarea} name="message" value={form.message} onChange={handleChange} placeholder="Your Message" rows={4} required />
        <button className={styles.contactButton} type="submit" disabled={loading}>Send Message</button>
      </form>
      {success && <div style={{color:'green',marginBottom:'1rem'}}>{success}</div>}
      {error && <div style={{color:'red',marginBottom:'1rem'}}>{error}</div>}
      <h3>Follow Us</h3>
      <ul className={styles.contactSocial}>
        <li><a href="#">LinkedIn</a></li>
        <li><a href="#">Twitter</a></li>
        <li><a href="#">Facebook</a></li>
      </ul>
    </div>
  );
}

export default ContactPage;
