// TaskManager.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

function TaskManager() {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = () => {
        axios.get('http://127.0.0.1:8000/api/tasks/')
            .then(response => setTasks(response.data))
            .catch(error => console.error("Error fetching tasks:", error));
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <TaskForm onTaskAdded={fetchTasks} />
            <TaskList tasks={tasks} onTaskStatusChange={fetchTasks} />
        </div>
    );
}

export default TaskManager;
