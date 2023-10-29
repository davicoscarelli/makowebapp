import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';  
import axios from '../AxiosConfig.js';
import Task from './Task';
import useTaskActions from './useTaskActions';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false); // Initialize with true to fetch data on mount
    const { handleDelete } = useTaskActions('tasks', null, null, null);


    // Function to fetch tasks from server
    const fetchTasks = useCallback(() => {
        axios.get('/tasks')
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error("Error fetching tasks:", error);
                if (error.response && error.response.status === 401) {
                    alert('Session expired. Please login again.');
                    navigate('/login');
                }
            });
    }, [navigate]);


    
    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            navigate('/login');
            return;
        }

        fetchTasks();
    }, [navigate, fetchTasks]);

    useEffect(() => {
        if (refresh) {
            fetchTasks();
            setRefresh(false); // Reset refresh state after fetching
        }
    }, [refresh, fetchTasks]);

    const handleAddTask = () => {
        axios.post('/tasks', { title: newTaskTitle })
            .then(response => {
                setTasks([...tasks, response.data]);
                setNewTaskTitle('');
            })
            .catch(error => {
                console.error("Error adding task:", error);
            });
        fetchTasks();
    };

    const handleTaskDelete = (task) => {
        handleDelete(task.id);

        // try {
        //     axios.delete(`/tasks/${task.id}`);
        // } catch (error) {
        //     console.error(`Error deleting task:`, error);
        // }
        // setRefresh(true); 
        
    };

    return (
        <div className="container">
            {tasks.map(task => (
                <Task 
                    key={task.id} 
                    task={task} 
                    onDelete={() => handleTaskDelete(task)}
                    onSubTaskDelete={fetchTasks}  // If you want to refresh after a subtask is deleted as well
                />
            ))}
            <input 
                type="text" 
                value={newTaskTitle} 
                onChange={e => setNewTaskTitle(e.target.value)} 
                placeholder="New Task Title"
            />
            <button onClick={handleAddTask}>Add Task</button>
        </div>
    );
}

export default TaskList;
