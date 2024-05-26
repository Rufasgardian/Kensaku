import React from 'react';
import styled from 'styled-components';

const StyledBody = styled.div`
  padding: 20px;
`;

const Section = styled.section`
  margin: 40px 0;
`;

const AboutSection = styled(Section)`
  text-align: center;
`;

const Advantages = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const AdvantageBox = styled.div`
  background-color: #f4f4f4;
  border-radius: 15px;
  padding: 20px;
  width: 30%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const PricingSection = styled(Section)`
  text-align: center;
`;

const PricingPlans = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PlanBox = styled.div`
  background-color: #f4f4f4;
  border-radius: 15px;
  padding: 20px;
  width: 40%;
  margin: 0 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const PlanTitle = styled.h3`
  margin-bottom: 10px;
`;

const PlanPrice = styled.p`
  font-size: 24px;
  margin-bottom: 20px;
`;

const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    margin: 10px 0;
  }
`;

const HomePage = () => {
  return (
    <StyledBody>
      <AboutSection id="about">
        <h2>About Kensaku</h2>
        <p>Kensaku is a state-of-the-art SAST tool that helps developers find and fix vulnerabilities in their code.</p>
        <Advantages>
          <AdvantageBox>
            <h3>Fast and Accurate</h3>
            <p>Our tool quickly scans your codebase and accurately identifies vulnerabilities, saving you time and effort.</p>
          </AdvantageBox>
          <AdvantageBox>
            <h3>Comprehensive Coverage</h3>
            <p>Kensaku covers a wide range of security issues, including the OWASP Top 10, ensuring your application is secure.</p>
          </AdvantageBox>
          <AdvantageBox>
            <h3>Easy to Use</h3>
            <p>With a user-friendly interface and detailed reports, Kensaku makes it easy to understand and fix vulnerabilities.</p>
          </AdvantageBox>
        </Advantages>
      </AboutSection>

      <PricingSection id="pricing">
        <h2>Pricing</h2>
        <PricingPlans>
          <PlanBox>
            <PlanTitle>Kensaku</PlanTitle>
            <PlanPrice>Free</PlanPrice>
            <PlanFeatures>
              <li>Finds vulnerabilities ✔️</li>
              <li>OWASP TOP 10 ✔️</li>
              <li>Advanced vulnerabilities ❌</li>
              <li>Unlimited file upload ❌</li>
            </PlanFeatures>
          </PlanBox>
          <PlanBox>
            <PlanTitle>Kensaku Pro</PlanTitle>
            <PlanPrice>$10.99/month</PlanPrice>
            <PlanFeatures>
              <li>Finds vulnerabilities ✔️</li>
              <li>OWASP TOP 10 ✔️</li>
              <li>Advanced vulnerabilities ✔️</li>
              <li>Unlimited file upload ✔️</li>
            </PlanFeatures>
          </PlanBox>
        </PricingPlans>
      </PricingSection>
      <br></br>
        <br></br>
    </StyledBody>
  );
};

export default HomePage;
