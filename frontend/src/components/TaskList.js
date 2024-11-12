// Filename: TaskList.js

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { 
    Container, 
    Box, 
    Typography, 
    List, 
    ListItem, 
    ListItemText, 
    Button, 
    Divider 
} from '@mui/material';

function TaskList({ tasks, refreshTasks }) {
    const navigate = useNavigate();

    // Function to toggle task completion
    const toggleTaskCompletion = (taskId, currentStatus) => {
        axios.patch(`http://127.0.0.1:8000/api/tasks/${taskId}/`, { completed: !currentStatus })
            .then(refreshTasks)
            .catch(error => console.error("Error updating task status:", error));
    };

    return (
        <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 5 }, mt: 5 }} style={{padding:0}}>
            <Box 
                sx={{ 
                    p: { xs: 2, sm: 3, md: 4 }, 
                    boxShadow: 3, 
                    borderRadius: 2, 
                    bgcolor: 'background.paper', 
                    width: '100%' 
                }}
            >
                <Typography variant="h5" align="center" gutterBottom>
                    Task List
                </Typography>

                <List>
                    {tasks.map(task => (
                        <React.Fragment key={task.id}>
                            <ListItem 
                                secondaryAction={
                                    <>
                                        <Button 
                                            variant="contained" 
                                            color="primary" 
                                            size="small"
                                            onClick={() => navigate(`/add-subtask/${task.id}`)}
                                            sx={{ mr: 2 }}
                                        >
                                            Add Subtask
                                        </Button>
                                        <Button
                                            variant={task.completed ? "contained" : "outlined"}
                                            color={task.completed ? "success" : "secondary"}
                                            onClick={() => toggleTaskCompletion(task.id, task.completed)}
                                        >
                                            {task.completed ? "Completed" : "Mark Complete"}
                                        </Button>
                                    </>
                                }
                            >
                                {/* Use Link for task name */}
                                <Link to={`/tasks/${task.id}`} style={{ textDecoration: 'none' }}>
                                    <ListItemText 
                                        primary={task.title} 
                                        secondary={task.completed ? "Completed" : "Incomplete"} 
                                    />
                                </Link>
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            </Box>
        </Container>
    );
}

export default TaskList;
