import React from 'react';
import SubSubTask from './SubSubTask';
import useTaskActions from './useTaskActions';
import { useState, useEffect } from 'react';


function SubTask({subTask, onDelete }) {
    console.log("Rendering SubTask with props:", subTask, onDelete);

    const { items: subSubTasks, handleDelete, handleAdd, fetchData } = useTaskActions('subtasks', subTask.id, "subsubtasks", 'tasks');
    const [newSubSubTaskTitle, setNewSubSubTaskTitle] = React.useState(''); // <-- Add this state
    const [refresh, setRefresh] = useState(true); // Add this line

    const DeleteSubTask = () => {
        console.log("Deleting subtask with ID:", subTask.id);
        handleDelete(subTask.id);

        // handleDelete(subTask.id);
        // if (onDelete) {
        //     onDelete(subTask.id);
        //     console.log('subtask on delete!')
        // }
    };    
    

    const handleSubSubTaskDeleted = () => {
        console.log("SubSubTask deleted, refreshing data...");
        setRefresh(true); // Toggle the refresh state to trigger a re-fetch
    };
    
    useEffect(() => {
        if (refresh) {
            fetchData();
            setRefresh(false); // Reset refresh state after fetching
        }
    }, [refresh, fetchData]);


    return (
        <div className="subtask">
            <h3>{subTask.title}</h3>
            <button onClick={DeleteSubTask}>Delete SubTask</button>
            {subSubTasks && (
                <>
                    {subSubTasks.map(subSubTask => (
                        <SubSubTask key={subSubTask.id} subSubTask={subSubTask} onDelete={() => handleSubSubTaskDeleted(subSubTask)} />
                    ))}
                    <input 
                        type="text" 
                        placeholder="New SubSubTask Title"
                        value={newSubSubTaskTitle} // <-- Use the state value here
                        onChange={e => setNewSubSubTaskTitle(e.target.value)}  // <-- Set the state here 
                    />
                    <button onClick={() => handleAdd(newSubSubTaskTitle)}>
                        Add SubSubTask
                    </button>
                </>
            )}
        </div>
    );
}

export default SubTask;