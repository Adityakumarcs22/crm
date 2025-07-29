import React from 'react';
import styles from './AboutPage.module.css';

function AboutPage() {
  return (
    <div className={styles.aboutContainer}>
      <h2 className={styles.aboutTitle}>About Us</h2>
      <div className={styles.aboutSection}>
        <p>Our CRM system is designed to help businesses of all sizes build stronger customer relationships, streamline sales, and automate marketing campaigns. We believe in empowering teams with modern tools that are secure, scalable, and easy to use.</p>
      </div>
      <div className={styles.aboutSection}>
        <h3>Our Mission</h3>
        <p>To deliver a CRM platform that drives growth, improves retention, and provides actionable insights for every business.</p>
      </div>
      <div className={styles.aboutSection}>
        <h3>Why Choose Us?</h3>
        <ul className={styles.aboutList}>
          <li>Intuitive user experience and beautiful design</li>
          <li>Advanced analytics and reporting</li>
          <li>Robust security and user management</li>
          <li>Flexible integrations and automation</li>
          <li>Dedicated support and regular updates</li>
        </ul>
      </div>
      <div className={styles.aboutTeam}>
        <h3>Meet the Team</h3>
        <p>Our team consists of experienced developers, designers, and business experts passionate about helping you succeed. We value feedback and continuously improve our platform to meet your needs.</p>
      </div>
    </div>
  );
}

export default AboutPage;
