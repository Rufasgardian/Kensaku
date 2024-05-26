import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';


const StyledSignup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f9fc;
`;

const SignupForm = styled.form`
  background-color: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    repeatPassword: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePassword(formData.password)) {
        setMessage('Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.');
        return;
      }
    
    if (formData.password !== formData.repeatPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/signup/', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        repeat_password: formData.repeatPassword
      });
      setMessage('User registered successfully');
      console.log('User registered successfully', response.data);

      navigate('/login');

    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data.email) {
          setMessage('User with this email already exists.');
        } else if(error.response.data.username) {
          setMessage('User with this username already exists.');
        }else{
          setMessage(`${error.response.data}`);
        }
      } else {
        setMessage('There was an error!');
      }
    }
  };

  return (
    <StyledSignup>
      <SignupForm onSubmit={handleSubmit}>
        <Title>Sign Up</Title>
        {message && <p>{message}</p>}
        <Input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        <Input 
          type="text" 
          name="username" 
          placeholder="Username" 
          value={formData.username} 
          onChange={handleChange} 
          required 
        />
        <Input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={handleChange} 
          required 
        />
        <Input 
          type="password" 
          name="repeatPassword" 
          placeholder="Repeat Password" 
          value={formData.repeatPassword} 
          onChange={handleChange} 
          required 
        />
        <Button type="submit">Submit</Button>
      </SignupForm>
    </StyledSignup>
  );
};

export default Signup;
