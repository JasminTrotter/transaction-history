import React from 'react';
import '../styles/Header.css';
import '../styles/App.css';
import logo from '../assets/logo-transparent.png';

function Header() {
  return (
    <header>
      <div className='header-flex'>
        <a href='https://student-portal-balletbody.herokuapp.com' target='_blank' rel='noopener noreferrer'><img src={logo} className='logo' alt='Ballet Body by Jasmin logo'></img></a>
        <h1>Transaction History</h1>
      </div>
    </header>
  );
}

export default Header;
