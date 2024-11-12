import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
    Container, 
    Box, 
    Typography, 
    TextField, 
    Button, 
    Chip, 
    Autocomplete 
} from '@mui/material';

function TaskForm() {
    const { parentTaskId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);

    useEffect(() => {
        // Fetch existing tags from the backend
        axios.get('http://127.0.0.1:8000/api/tags/')
            .then(response => setAvailableTags(response.data.map(tag => tag.name))) // Store only tag names
            .catch(error => console.error("Error fetching tags:", error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Map selectedTags back to tag_ids for backend
        const taskData = {
            title,
            description,
            tags: selectedTags.map(
                tag => availableTags.find(availableTag => availableTag === tag)
            ),
            parent_task: parentTaskId || null,
        };
        
        axios.post('http://127.0.0.1:8000/api/tasks/', taskData)
            .then(() => navigate('/'))
            .catch(error => console.error("Error creating task:", error));
    };

    const handleTagsChange = (event, newValue) => {
        // Add new tags to availableTags if they don't already exist
        const newTags = newValue.filter(tag => !availableTags.includes(tag));
        if (newTags.length > 0) {
            setAvailableTags([...availableTags, ...newTags]);
        }
        setSelectedTags(newValue); // Update selected tags
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Box component="form" onSubmit={handleSubmit} sx={{ p: 4, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
                <Typography variant="h5" align="center" gutterBottom>
                    {parentTaskId ? "Add Subtask" : "Add New Task"}
                </Typography>

                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />

                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                    variant="outlined"
                />

                <Autocomplete
                    multiple
                    freeSolo
                    options={availableTags}
                    value={selectedTags}
                    onChange={handleTagsChange}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip label={option} {...getTagProps({ index })} />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Tags"
                            placeholder="Add or select tags"
                        />
                    )}
                />

                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    fullWidth
                    sx={{ mt: 3 }}
                >
                    {parentTaskId ? "Add Subtask" : "Add Task"}
                </Button>
            </Box>
        </Container>
    );
}

export default TaskForm;
