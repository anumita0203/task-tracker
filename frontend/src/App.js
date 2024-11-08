// App.js
import React from 'react';
import TaskManager from './components/TaskManager';
import TaskWebSocket from './components/TaskWebSocket';

function App() {
    return (
        <div className="App">
            <TaskManager />
            <TaskWebSocket />
        </div>
    );
}

export default App;

