import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Kensaku from '../images/kensaku2.png';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #282c34;
  color: white;
`;

const Logo = styled.img`
  height: 40px;
`;

const NavLinks = styled.div`
  a {
    color: white;
    margin: 0 10px;
    text-decoration: none;
  }
`;

const Header = () => {
  const navigate = useNavigate();

  const handleNavClick = (section) => (e) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('access_token');

  return (
    <HeaderWrapper>
      <RouterLink to={isLoggedIn ? '/dashboard' : '/'}>
        <Logo src={Kensaku} alt="Kensaku Logo" />
      </RouterLink>
      <NavLinks>
        <a href="#about" onClick={handleNavClick('about')}>About</a>
        <a href="#pricing" onClick={handleNavClick('pricing')}>Pricing</a>
        {isLoggedIn ? (
          <>
            <RouterLink to="/upload">Upload</RouterLink>
            <RouterLink to="/login" onClick={handleLogout}>Log out</RouterLink>
          </>
        ) : (
          <>
            <RouterLink to="/login">Log in</RouterLink>
            <RouterLink to="/signup">Sign up</RouterLink>
          </>
        )}
      </NavLinks>
    </HeaderWrapper>
  );
};

export default Header;