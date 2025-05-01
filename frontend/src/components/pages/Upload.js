import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledUpload = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f9fc;
`;

const UploadForm = styled.form`
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

const Upload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      setMessage('File uploaded successfully');
      navigate(`/files/${response.data.id}`); // Navigate to the file details page
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage('Authentication failed, please log in again.');
      } else {
        setMessage('Failed to upload file');
      }
      console.error('There was an error uploading the file:', error);
    }
  };

  return (
    <StyledUpload>
      <UploadForm onSubmit={handleSubmit}>
        <Title>Upload File</Title>
        {message && <p>{message}</p>}
        <Input type="file" onChange={handleFileChange} required />
        <Button type="submit">Upload</Button>
      </UploadForm>
    </StyledUpload>
  );
};

export default Upload;
