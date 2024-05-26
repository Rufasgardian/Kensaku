import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: calc(100vh - 100px); /* Adjust for header and footer */
  background-color: #f7f9fc;
  padding: 20px;
  margin-bottom: 40px; /* Add space for the footer */
`;

const FileDetailsContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
  margin-bottom: 40px; /* Add space between this container and the footer */
  height: 100%;
  overflow-y: auto;
`;

const IssueDetailsContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 45%;
  margin-bottom: 40px; /* Add space between this container and the footer */
  height: 100%;
  overflow-y: auto;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-family: 'Arial', sans-serif;
  color: #333;
`;

const FileName = styled.h3`
  text-align: center;
  margin-bottom: 20px;
  font-family: 'Arial', sans-serif;
  color: #666;
`;

const CodeBlock = styled.pre`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  overflow-x: auto;
  font-family: 'Courier New', Courier, monospace;
  color: #333;
  font-size: 14px;
  line-height: 1.5;
  position: relative;
  max-height: 600px;
`;

const LineNumbers = styled.ol`
  list-style: none;
  counter-reset: linenumber;
  margin: 0;
  padding: 0;
  text-align: left;
  margin-right: 10px;
`;

const LineNumber = styled.li`
  counter-increment: linenumber;
  position: relative; /* For positioning the tooltip */
  ${({ highlighted }) => highlighted && `
    background-color: #ffdddd;
    color: #d9534f;
  `}
  &:before {
    content: counter(linenumber);
    display: inline-block;
    width: 2em;
    margin-right: 1em;
    text-align: right;
    color: #888;
  }
`;

const IssueItem = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fafafa;
`;

const IssueTitle = styled.h4`
  margin: 0 0 5px 0;
  font-size: 16px;
  color: #d9534f;
`;

const IssueDetails = styled.p`
  margin: 0;
  font-size: 14px;
  color: #333;
`;

const Severity = styled.p`
  margin: 0;
  font-size: 14px;
  color: #d9534f;
`;

const FileDetails = () => {
  const { fileId } = useParams();
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFileDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/file/${fileId}/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        setFileName(response.data.file_name);
        setFileContent(response.data.file_content);
        setIssues(response.data.issues || []); // Ensure issues is always an array
        console.log('Issues received:', response.data.issues); // Debugging: log the issues
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError('File not found');
        } else {
          setError('Failed to fetch file details');
        }
      }
    };

    fetchFileDetails();
  }, [fileId]);

  return (
    <Container>
      <FileDetailsContainer>
        <Title>File Details</Title>
        {fileName && <FileName>{fileName}</FileName>}
        {error ? (
          <p>{error}</p>
        ) : (
          <CodeBlock>
            <LineNumbers>
              {fileContent.split('\n').map((line, index) => {
                const issue = issues.find(issue => issue.line_number === index + 1);
                return (
                  <LineNumber key={index} highlighted={!!issue}>
                    {line}
                  </LineNumber>
                );
              })}
            </LineNumbers>
          </CodeBlock>
        )}
      </FileDetailsContainer>
      <IssueDetailsContainer>
        <Title>Issue Details</Title>
        {issues.length === 0 ? (
          <p>No issues found</p>
        ) : (
          issues.map((issue, index) => (
            <IssueItem key={index}>
              <IssueTitle>{issue.test_name} (Line {issue.line_number})</IssueTitle>
              <IssueDetails>{issue.issue_text}</IssueDetails>
              <Severity>Severity: {issue.severity}</Severity>
            </IssueItem>
          ))
        )}
      </IssueDetailsContainer>
    </Container>
  );
};

export default FileDetails;
