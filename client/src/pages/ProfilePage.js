import React, { useState } from 'react';
import styles from './ProfilePage.module.css';

const initialUser = {
  name: 'John Doe',
  email: 'john.doe@crm.com',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  role: 'Sales Manager',
  phone: '+1-800-CRM-USER',
  address: '456 CRM Lane, Business City, Country',
  joined: 'Jan 10, 2023',
};

function ProfilePage() {
  const [user, setUser] = useState(initialUser);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState(user);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleEditChange = e => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async e => {
    e.preventDefault();
    // Here you would send PUT to backend
    setUser(editData);
    setEditing(false);
    setSuccess('Profile updated successfully!');
    setTimeout(() => setSuccess(''), 2000);
  };

  const handlePasswordSubmit = async e => {
    e.preventDefault();
    // Here you would send password change to backend
    setPassword('');
    setShowPassword(false);
    setSuccess('Password changed successfully!');
    setTimeout(() => setSuccess(''), 2000);
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData({ ...editData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.profileContainer}>
      <img src={editing ? editData.avatar : user.avatar} alt="Profile" className={styles.profileAvatar} />
      {editing ? (
        <form onSubmit={handleEditSubmit} className={styles.profileInfo}>
          <input name="name" value={editData.name} onChange={handleEditChange} className={styles.profileInput} />
          <input name="email" value={editData.email} onChange={handleEditChange} className={styles.profileInput} />
          <input name="role" value={editData.role} onChange={handleEditChange} className={styles.profileInput} />
          <input name="phone" value={editData.phone} onChange={handleEditChange} className={styles.profileInput} />
          <input name="address" value={editData.address} onChange={handleEditChange} className={styles.profileInput} />
          <label className={styles.profileLabel}>Change Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <div className={styles.profileActions}>
            <button className={styles.profileButton} type="submit">Save</button>
            <button className={styles.profileButton} type="button" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <>
          <div className={styles.profileName}>{user.name}</div>
          <div className={styles.profileEmail}>{user.email}</div>
          <div className={styles.profileInfo}>
            <div className={styles.profileLabel}>Role:</div>
            <div className={styles.profileValue}>{user.role}</div>
            <div className={styles.profileLabel}>Phone:</div>
            <div className={styles.profileValue}>{user.phone}</div>
            <div className={styles.profileLabel}>Address:</div>
            <div className={styles.profileValue}>{user.address}</div>
            <div className={styles.profileLabel}>Joined:</div>
            <div className={styles.profileValue}>{user.joined}</div>
          </div>
          <div className={styles.profileActions}>
            <button className={styles.profileButton} onClick={() => setEditing(true)}>Edit Profile</button>
            <button className={styles.profileButton} onClick={() => setShowPassword(true)}>Change Password</button>
          </div>
        </>
      )}
      {showPassword && (
        <form onSubmit={handlePasswordSubmit} style={{marginTop:'1rem',width:'100%'}}>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="New Password" className={styles.profileInput} required />
          <div className={styles.profileActions}>
            <button className={styles.profileButton} type="submit">Save Password</button>
            <button className={styles.profileButton} type="button" onClick={() => setShowPassword(false)}>Cancel</button>
          </div>
        </form>
      )}
      {success && <div style={{color:'green',marginTop:'1rem'}}>{success}</div>}
      {error && <div style={{color:'red',marginTop:'1rem'}}>{error}</div>}
    </div>
  );
}

export default ProfilePage;
