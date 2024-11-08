// TaskForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskForm({ onTaskAdded }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);
    const [parentTask, setParentTask] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/tags/')
            .then(response => setAvailableTags(response.data))
            .catch(error => console.error("Error fetching tags:", error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const taskData = {
            title,
            description,
            tags: selectedTags,
            parent_task: parentTask
        };
        axios.post('http://127.0.0.1:8000/api/tasks/', taskData)
            .then(() => {
                onTaskAdded();  // This will trigger fetchTasks in TaskManager
                setTitle("");
                setDescription("");
                setSelectedTags([]);
                setParentTask(null);
            })
            .catch(error => console.error("Error creating task:", error));
    };

    return (
        <div className="container mt-4">
            <h2>Add a Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Task Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <textarea
                        className="form-control"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Tags</label>
                    <select
                        className="form-control"
                        value={selectedTags}
                        onChange={(e) => setSelectedTags([...e.target.selectedOptions].map(o => o.value))}
                        multiple
                    >
                        {availableTags.map(tag => (
                            <option key={tag.id} value={tag.id}>{tag.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Parent Task (for subtasks)</label>
                    <select
                        className="form-control"
                        value={parentTask || ""}
                        onChange={(e) => setParentTask(e.target.value || null)}
                    >
                        <option value="">None</option>
                        {/* This dropdown will show all tasks as possible parent tasks */}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Add Task</button>
            </form>
        </div>
    );
}

export default TaskForm;
