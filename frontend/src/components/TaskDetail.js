// Filename: TaskDetail.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    Box,
    Typography,
    Button,
    Chip,
    Divider,
    List,
    ListItem,
    ListItemText,
    CircularProgress
} from '@mui/material';

function TaskDetail() {
    const { id } = useParams(); // Get task ID from URL
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);

    console.log('Task ID from URL:', id);

    // Fetch task details by ID
    useEffect(() => {
        setLoading(true);  // Set loading to true when the request is about to start
        axios.get(`http://127.0.0.1:8000/api/tasks/${id}/`)
            .then(response => {
                setTask(response.data);
                setLoading(false);  // Set loading to false when the data is loaded
            })
            .catch(error => {
                console.error("Error fetching task details:", error);
                setLoading(false);
            });
    }, [id]);  // Only re-run the effect if the ID in the URL changes

    // Handle adding a subtask
    const handleAddSubtask = () => {
        navigate(`/add-subtask/${id}`);
    };

    if (loading) {
        return (
            <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Box 
                sx={{ 
                    p: { xs: 2, sm: 3, md: 4 }, 
                    boxShadow: 3, 
                    borderRadius: 2, 
                    bgcolor: 'background.paper', 
                    width: '100%' 
                }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                    Task Details
                </Typography>

                {/* Task Title */}
                <Typography variant="h5">{task.title}</Typography>

                {/* Task Description */}
                <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong>Description:</strong> {task.description || 'No description available.'}
                </Typography>

                {/* Creation Time */}
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    <strong>Created At:</strong> {new Date(task.created_at).toLocaleString()}
                </Typography>

                {/* Completion Status */}
                <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Status:</strong> {task.completed ? 'Completed' : 'Incomplete'}
                </Typography>

                {/* Tags */}
                {task.tags && task.tags.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            Tags:
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                            {task.tags.map(tag => (
                                <Chip key={tag.id} label={tag.name} sx={{ mr: 1, mb: 1 }} />
                            ))}
                        </Box>
                    </Box>
                )}

                {/* Subtasks */}
                {task.subtasks && task.subtasks.length > 0 && (
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="h6" sx={{ mt: 3 }}>
                        Subtasks:
                        </Typography>
                        <List>
                        {task.subtasks.map(subtask => (
                            <ListItem key={subtask.id}>
                            <ListItemText 
                                primary={subtask.title} 
                                secondary={`${subtask.description} - ${subtask.completed ? 'Completed' : 'Incomplete'}`} 
                            />
                            </ListItem>
                        ))}
                        </List>
                    </Box>
                    
                )}

                {/* Add Subtask Button */}
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleAddSubtask}
                    >
                        Add Subtask
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default TaskDetail;
