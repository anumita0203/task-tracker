import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import axios from 'axios';
import {
    Container,
    Box,
    Typography,
    Button,
    Chip,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';

function TaskDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [buttonLabel, setButtonLabel] = useState('Mark Complete');

    useEffect(() => {
        setLoading(true);
        axios.get(`http://127.0.0.1:8000/api/tasks/${id}/`)
            .then(response => {
                setTask(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching task details:", error);
                setLoading(false);
            });
    }, [id]);

    const handleAddSubtask = () => {
        navigate(`/add-subtask/${id}`);
    };

    const toggleSubtaskCompletion = (subtaskId, currentStatus) => {
        axios.patch(`http://127.0.0.1:8000/api/tasks/${subtaskId}/`, { completed: !currentStatus })
            .then(response => {
                setTask(prevTask => ({
                    ...prevTask,
                    subtasks: prevTask.subtasks.map(subtask =>
                        subtask.id === subtaskId ? { ...subtask, completed: !currentStatus } : subtask
                    )
                }));
            })
            .catch(error => console.error("Error updating subtask:", error));
    };

    const toggleTaskCompletion = (taskId, currentStatus) => {
        // Optimistically update the button label
        const updatedStatus = !currentStatus;
    
        // Send the PATCH request to update the task completion status
        axios.patch(`http://127.0.0.1:8000/api/tasks/${taskId}/`, { completed: updatedStatus })
            .then(() => {
                // Directly update the task's completion status
                setTask(prevTask => ({ ...prevTask, completed: updatedStatus }));
            })
            .catch(error => {
                console.error("Error updating task:", error);
                // Handle error (e.g., revert the button state if necessary)
            });
    };

    if (loading) {
        return (
            <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
            <Box 
                sx={{ 
                    p: 4, 
                    boxShadow: 3, 
                    borderRadius: 2, 
                    bgcolor: 'background.paper' 
                }}
            >
                <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold'}}>
                    {task.title}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <DescriptionIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body1">
                        {task.description || 'No description available.'}
                    </Typography>
                </Box>

                {/* Creation Time */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AccessTimeIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body1">
                        {new Date(task.created_at).toLocaleString()}
                    </Typography>
                </Box>

                {/* Completion Status */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Button
                        variant={task.completed ? "contained" : "outlined"}
                        color={task.completed ? "success" : "secondary"}
                        onClick={() => toggleTaskCompletion(task.id, task.completed)}
                    >
                        {task.completed ? "Completed" : "Mark Complete"}
                    </Button>
                </Box>

                {/* Tags */}
                {task.tags && task.tags.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            Tags:
                        </Typography>
                        <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap' }}>
                            {task.tags.map(tag => (
                                <Chip key={tag.id} label={tag.name} sx={{ mr: 1, mb: 1 }} />
                            ))}
                        </Box>
                    </Box>
                )}

                {/* Subtasks Table */}
                {task.subtasks && task.subtasks.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" sx={{fontWeight: 'bold', mt: 2, mb: 1 }}>
                            Subtasks
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table aria-label="subtasks table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {task.subtasks.map(subtask => (
                                        <TableRow key={subtask.id}>
                                            <TableCell>{subtask.title}</TableCell>
                                            <TableCell>{subtask.description}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant={subtask.completed ? "contained" : "outlined"}
                                                    color={subtask.completed ? "success" : "secondary"}
                                                    onClick={() => toggleSubtaskCompletion(subtask.id, subtask.completed)}
                                                >
                                                    {subtask.completed ? "Completed" : "Mark Complete"}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                )}

                {/* Add Subtask Button */}
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleAddSubtask}
                        sx={{ py: 1.5, px: 3, fontSize: '1rem' }}
                    >
                        Add Subtask
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default TaskDetail;
