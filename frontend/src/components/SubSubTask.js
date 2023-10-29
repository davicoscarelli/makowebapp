import React from 'react';
import useTaskActions from './useTaskActions';

function SubSubTask({ subSubTask, onDelete }) {
    const { handleDelete } = useTaskActions('subsubtasks', subSubTask.id, '', 'subtasks');  // Using 'subtasks' as the parentEndpoint since subsubtasks belong to subtasks.

    const DeletesubsubTask = () => {
        handleDelete(subSubTask.id, 'subtasks'); // Specifying 'subtasks' as the parentEndpoint for the deletion logic.
        if (onDelete) {
            onDelete(subSubTask.id);
        }
    };

    return (
        <div className="subsubtask">
            <h3>{subSubTask.title}</h3>
            <button onClick={DeletesubsubTask}>Delete SubSubTask</button>
        </div>
    );
}

export default SubSubTask;
