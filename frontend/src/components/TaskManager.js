// TaskManager.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './TaskList';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';

function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    // Fetch tasks when the component mounts
    useEffect(() => {
        loadTasks();
    }, []);

    // Function to load tasks from the API
    const loadTasks = () => {
        axios.get('http://127.0.0.1:8000/api/tasks/')
            .then(response => setTasks(response.data))
            .catch(error => console.error("Error fetching tasks:", error));
    };

    // Function to handle adding a new task, then refresh the task list
    const handleAddTask = (newTaskData) => {
        axios.post('http://127.0.0.1:8000/api/tasks/', newTaskData)
            .then(() => {
                loadTasks();  // Refresh tasks after adding
                navigate('/'); // Redirect to the task list view
            })
            .catch(error => console.error("Error adding task:", error));
    };

    return (
        <Box sx={{ px: { xs: 2, sm: 3, md: 5 }, mt: 5 }}>
            <header style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => navigate('/add-task')}
                    sx={{
                        px: 3, // Padding on the X-axis for a larger button
                        py: 1, // Padding on the Y-axis
                        fontWeight: 'bold',
                        borderRadius: 2,
                        boxShadow: 3,
                    }}
                >
                    Add Task
                </Button>
            </header>
            
            <TaskList tasks={tasks} refreshTasks={loadTasks} />
        </Box>
    );
}

export default TaskManager;
