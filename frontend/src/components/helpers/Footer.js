import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: #282c34;
  color: white;
  text-align: center;
  padding: 10px 20px;
  position: fixed;
  width: 100%;
  bottom: 0;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <p>&copy; 2024 Kensaku. All rights reserved.</p>
    </FooterWrapper>
  );
};

export default Footer;


