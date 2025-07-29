import React from 'react';

const footerStyle = {
  background: '#1976d2',
  color: '#fff',
  padding: '2rem 0 1rem 0',
  textAlign: 'center',
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px',
  marginTop: '3rem',
};

const linkStyle = {
  color: '#fff',
  margin: '0 1rem',
  textDecoration: 'underline',
  fontWeight: 500,
};

const iconStyle = {
  width: '28px',
  height: '28px',
  margin: '0 0.5rem',
  verticalAlign: 'middle',
  filter: 'brightness(0) invert(1)'
};

function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={{marginBottom: '1rem'}}>
        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" style={linkStyle}>
          <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg" alt="LinkedIn" style={iconStyle} />
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" style={linkStyle}>
          <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/twitter.svg" alt="Twitter" style={iconStyle} />
        </a>
        <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" style={linkStyle}>
          <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg" alt="Facebook" style={iconStyle} />
        </a>
      </div>
      <div style={{fontSize: '1.1rem', marginBottom: '0.5rem'}}>CRM System &copy; {new Date().getFullYear()} | All rights reserved.</div>
      <div style={{fontSize: '0.98rem', color: '#cce0ff'}}>Contact: support@crm.com | +1-800-CRM-HELP</div>
    </footer>
  );
}

export default Footer;
