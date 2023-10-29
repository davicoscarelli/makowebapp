import { useState, useEffect } from 'react';
import SubTask from './SubTask';
import useTaskActions from './useTaskActions';
import axios from '../AxiosConfig.js';


function Task({ task, onDelete }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [newSubTaskTitle, setNewSubTaskTitle] = useState('');
    const [refresh, setRefresh] = useState(true); // Add this line
    const { subTask, handleDelete, handleAdd, fetchData } = useTaskActions('tasks', task.id, "subtasks", '');
    const [items, setItems] = useState([]);


    const handleSubTaskDeleted = () => {
        setRefresh(true); // Toggle the refresh state to trigger a re-fetch
    };
    
    // useEffect(() => {
    //     if (refresh) {
    //         fetchData();
    //         setRefresh(false); // Reset refresh state after fetching
    //     }
    // }, [refresh]);

    const handleExpandClick = () => {
        setIsExpanded(!isExpanded);
    };

    const handleDeleteTask = () => {
        if (onDelete) {
            onDelete(task.id);
            console.log('task on delete!')
        }
    };    
    
    useEffect(() => {
        if (refresh) {
            fetchData();
            setRefresh(false); // Reset refresh state after fetching
        }
    }, [refresh]);

    return (
        <div>
            <h2 className="title">{task.title}</h2>
            <button onClick={handleExpandClick}>
                {isExpanded ? "Collapse" : "Expand"}
            </button>
            <button onClick={handleDeleteTask}>Delete Task</button>
            {isExpanded && (
                <>
                    {subTask && subTask.map(subTask => (
                        <SubTask key={subTask.id} subTask={subTask} onDelete={handleSubTaskDeleted} />
                    ))}

                    <input 
                        type="text" 
                        value={newSubTaskTitle} 
                        onChange={e => setNewSubTaskTitle(e.target.value)} 
                        placeholder="New SubTask Title"
                    />
                    <button onClick={() => handleAdd(newSubTaskTitle)}>Add SubTask</button>
                </>
            )}
        </div>
    );
}

export default Task;