import { useState, useEffect,useCallback } from 'react';
import axios from '../AxiosConfig.js';

function useTaskActions(endpoint, id, subtasks, parentEndpoint) {
    const [items, setItems] = useState([]);
    const [refresh, setRefresh] = useState(true); // Initialize with true to fetch data on mount
    const [refreshKey, setRefreshKey] = useState(0);

    // const [taskdelete, setDelete] = useState(false);

    const fetchData = useCallback(() => {
        axios.get(`/${endpoint}/${id}/${subtasks}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            console.log("Fetched items:", response.data);

            setItems(response.data);
        })
        .catch(error => {
            console.error(`Error fetching ${endpoint}:`, error);
        });
    }, [endpoint, id, subtasks])

    // const fetchParent = async () => {
    //     const parentid = await getParentTaskId();
    //     await axios.delete(`/${endpoint}/${id}`);
    //     if (endpoint === 'tasks') {
    //         axios.get(`/tasks`, {
    //             headers: {
    //                 'Authorization': `Bearer ${localStorage.getItem('token')}`
    //             }
    //         })
            
    //     } else {
    //         axios.get(`/${parentEndpoint}/${parentid}/${endpoint}`, {
    //             headers: {
    //                 'Authorization': `Bearer ${localStorage.getItem('token')}`
    //             }
    //         })
    //         setDelete(false)
    //         .then(response => {
    //             setItems(response.data);
    //         })
    //         .catch(error => {
    //             console.error(`Error fetching ${endpoint}:`, error);
    //         })
    //     }
    //     ;
    // }
    
    useEffect(() => {
        if (refresh) {
            fetchData();
            setRefresh(false);
        }
    }, [refresh, fetchData, refreshKey]);

    // const getParentTaskId = async () => {
    //     try {
    //         const response = await axios.get(`/${endpoint}/${id}`);
    //         const data = response.data;
    
    //         if (parentEndpoint === 'subtasks') {
    //             return data.task_id; // Return task_id for subtasks
    //         } else if (parentEndpoint === 'subsubtasks') {
    //             return data.subtask_id; // Return subtask_id for subsubtask
    //         } else if (parentEndpoint === 'tasks') {
    //             return 0; // Return 0 for a task
    //         }
    //     } catch (error) {
    //         console.error(`Error fetching parent ID for ${parentEndpoint}:`, error);
    //         return null;
    //     }
    // };
    
    const handleDelete = async (itemId) => {
        try {
            console.log("Attempting to delete item with ID:", itemId);

            await axios.delete(`/${endpoint}/${itemId}`);
            console.log("Successfully deleted item with ID:", itemId);

            fetchData();
            setRefresh(true);
            setRefreshKey(prevKey => prevKey + 1); // This will trigger the useEffect to re-fetch tasks

        } catch (error) {
            console.error(`Error deleting ${endpoint}:`, error);
        }
    };


    const handleAdd = (title) => {
        axios.post(`/${endpoint}/${id}/${subtasks}`, { title })
            .then(() => {
                setRefresh(true);// Trigger a refresh after successful addition
            })
            .catch(error => {
                console.error(`Error adding to ${endpoint}:`, error);
            });
    };

    return {
        items,
        handleDelete,
        handleAdd, 
        fetchData
    };
}

export default useTaskActions;