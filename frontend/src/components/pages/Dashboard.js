import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledPaper = styled(Paper)`
  padding: 16px;
  margin: 16px 0;
`;

const CenteredBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const Dashboard = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/user/files/', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });
                setFiles(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch files');
                setLoading(false);
            }
        };

        fetchFiles();
    }, []);

    return (
        <Container>
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Dashboard
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Here you can see an overview of your projects and scan results.
                </Typography>
                {loading ? (
                    <CircularProgress />
                ) : error ? (
                    <Typography color="error">{error}</Typography>
                ) : files.length === 0 ? (
                    <CenteredBox>
                        <Typography variant="h4" style={{ color: 'red' }}>You haven't uploaded any files yet.</Typography>
                    </CenteredBox>
                ) : (
                    <List>
                        {files.map((file) => (
                            <StyledPaper key={file.id}>
                                <ListItem>
                                    <ListItemText
                                        primary={file.file.split('/').pop()}
                                        secondary={`Uploaded at: ${new Date(file.uploaded_at).toLocaleString()}`}
                                    />
                                    <RouterLink to={`/files/${file.id}`}>
                                        View Details
                                    </RouterLink>
                                </ListItem>
                            </StyledPaper>
                        ))}
                    </List>
                )}
            </Box>
        </Container>
    );
};

export default Dashboard;
