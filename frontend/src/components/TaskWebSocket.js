import React, { useState, useEffect } from 'react';

const TaskWebSocket = () => {
  const [message, setMessage] = useState('');
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/tasks/');

    socket.onmessage = function(event) {
      const data = JSON.parse(event.data);
      setMessage(data.message);
    };

    socket.onopen = function() {
      console.log('WebSocket connection established');
    };

    socket.onclose = function() {
      console.log('WebSocket connection closed');
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws) {
      ws.send(JSON.stringify({ message: 'New task update' }));
    }
  };

  return (
    <div>
      <h1>WebSocket Task Updates</h1>
      <div>{message}</div>
      <button onClick={sendMessage}>Send Task Update</button>
    </div>
  );
};

export default TaskWebSocket;
