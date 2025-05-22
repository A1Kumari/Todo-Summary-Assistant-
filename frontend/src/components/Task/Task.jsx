import React, { useState, useContext } from 'react';
import moment from 'moment';
import TaskContext from '../../context/TaskContext';
import "./task.css";

// Material UI Icons
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function Task({ task, id }) {
    const { dispatch } = useContext(TaskContext);
    const [expanded, setExpanded] = useState(false);
    const [showSubtaskForm, setShowSubtaskForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDescription, setEditDescription] = useState(task.description);
    const [subtaskTitle, setSubtaskTitle] = useState('');
    const [subtaskDescription, setSubtaskDescription] = useState('');

    const handleRemove = (e) => {
        e.stopPropagation();
        dispatch({
            type: "REMOVE_TASK",
            id
        });
    };

    const handleMarkDone = (e) => {
        e.stopPropagation();
        dispatch({
            type: "MARK_DONE",
            id
        });
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        setShowEditForm(true);
    };

    const handleCancelEdit = (e) => {
        e.stopPropagation();
        setShowEditForm(false);
        setEditTitle(task.title);
        setEditDescription(task.description);
    };

    const handleSaveEdit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({
            type: "EDIT_TASK",
            id,
            payload: {
                title: editTitle,
                description: editDescription
            }
        });
        setShowEditForm(false);
    };

    const handleAddSubtask = (e) => {
        e.stopPropagation();
        setShowSubtaskForm(true);
    };

    const handleCancelSubtask = (e) => {
        e.stopPropagation();
        setShowSubtaskForm(false);
        setSubtaskTitle('');
        setSubtaskDescription('');
    };

    const handleSaveSubtask = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({
            type: "ADD_SUBTASK",
            id,
            payload: {
                title: subtaskTitle,
                description: subtaskDescription,
                completed: false,
                createdAt: new Date().toISOString()
            }
        });
        setShowSubtaskForm(false);
        setSubtaskTitle('');
        setSubtaskDescription('');
    };

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="mb-3">
            {/* Main Task Card */}
            <div 
                className={`rounded-lg shadow-md transition-all duration-300 ${
                    task.completed ? 'bg-green-100' : 'bg-red-100'
                }`}
                onClick={toggleExpand}
            >
                <div className="flex items-center p-4">
                    {/* Status Icon */}
                    <div className="flex-shrink-0 mr-3" onClick={handleMarkDone}>
                        {task.completed ? (
                            <CheckCircleIcon className="text-green-500 cursor-pointer" />
                        ) : (
                            <CheckCircleOutlineIcon className="text-gray-400 hover:text-green-500 cursor-pointer" />
                        )}
                    </div>
                    
                    {/* Task Content */}
                    <div className="flex-grow">
                        <h3 className={`font-medium capitalize text-lg ${
                            task.completed ? 'text-gray-500 line-through' : 'text-gray-800'
                        }`}>
                            {task.title}
                        </h3>
                        {!expanded && task.description && (
                            <p className={`text-sm mt-1 ${
                                task.completed ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                                {task.description.length > 60 
                                    ? `${task.description.substring(0, 60)}...` 
                                    : task.description}
                            </p>
                        )}
                        <div className="text-xs text-gray-500 italic mt-1">
                            {task?.createdAt ? moment(task.createdAt).fromNow() : "just now"}
                        </div>
                    </div>
                    
                    {/* Action Icons */}
                    <div className="flex space-x-1 ml-2">
                        <button 
                            onClick={handleEdit}
                            className="p-1 text-indigo-600 hover:bg-indigo-100 rounded-full transition-colors duration-200"
                        >
                            <EditIcon style={{ fontSize: 18 }} />
                        </button>
                        <button 
                            onClick={handleAddSubtask}
                            className="p-1 text-blue-600 hover:bg-blue-100 rounded-full transition-colors duration-200"
                        >
                            <AddIcon style={{ fontSize: 18 }} />
                        </button>
                        <button 
                            onClick={handleRemove}
                            className="p-1 text-red-600 hover:bg-red-100 rounded-full transition-colors duration-200"
                        >
                            <DeleteIcon style={{ fontSize: 18 }} />
                        </button>
                        <button 
                            onClick={toggleExpand}
                            className="p-1 text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
                        >
                            {expanded ? (
                                <ExpandLessIcon style={{ fontSize: 18 }} />
                            ) : (
                                <ExpandMoreIcon style={{ fontSize: 18 }} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Expanded Content */}
                {expanded && (
                    <div className="px-4 pb-4 pt-0">
                        {task.description && (
                            <div className="mb-3">
                                <p className={`text-sm ${
                                    task.completed ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                    {task.description}
                                </p>
                            </div>
                        )}
                        
                        {/* Subtasks Section */}
                        {task.subtasks && task.subtasks.length > 0 && (
                            <div className="mt-3">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Subtasks:</h4>
                                <div className="pl-4 border-l-2 border-gray-200">
                                    {task.subtasks.map((subtask, index) => (
                                        <div key={index} className="flex items-center mb-2">
                                            <div 
                                                className="mr-2 cursor-pointer" 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    dispatch({
                                                        type: "TOGGLE_SUBTASK",
                                                        id,
                                                        subtaskIndex: index
                                                    });
                                                }}
                                            >
                                                {subtask.completed ? (
                                                    <CheckCircleIcon className="text-green-500" style={{ fontSize: 16 }} />
                                                ) : (
                                                    <CheckCircleOutlineIcon className="text-gray-400" style={{ fontSize: 16 }} />
                                                )}
                                            </div>
                                            <div className={`flex-grow text-sm ${
                                                subtask.completed ? 'text-gray-400 line-through' : 'text-gray-700'
                                            }`}>
                                                {subtask.title}
                                            </div>
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    dispatch({
                                                        type: "REMOVE_SUBTASK",
                                                        id,
                                                        subtaskIndex: index
                                                    });
                                                }}
                                                className="p-1 text-red-500 hover:bg-red-100 rounded-full transition-colors duration-200"
                                            >
                                                <DeleteIcon style={{ fontSize: 14 }} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Edit Form Modal */}
            {showEditForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30" onClick={handleCancelEdit}>
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
                        <div className="bg-indigo-600 px-4 py-3 flex justify-between items-center">
                            <h2 className="text-xl font-medium text-white">Edit Task</h2>
                        </div>
                        
                        <div className="p-6">
                            <form onSubmit={handleSaveEdit}>
                                <div className="mb-4">
                                    <label htmlFor="editTitle" className="block mb-2 text-sm font-medium text-gray-700">Title</label>
                                    <input
                                        type="text"
                                        id="editTitle"
                                        value={editTitle}
                                        required
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="editDescription" className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        rows={5}
                                        id="editDescription"
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                        style={{ resize: "none" }}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                    />
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={handleCancelEdit}
                                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Subtask Form Modal */}
            {showSubtaskForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30" onClick={handleCancelSubtask}>
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
                        <div className="bg-blue-600 px-4 py-3 flex justify-between items-center">
                            <h2 className="text-xl font-medium text-white">Add Subtask</h2>
                        </div>
                        
                        <div className="p-6">
                            <form onSubmit={handleSaveSubtask}>
                                <div className="mb-4">
                                    <label htmlFor="subtaskTitle" className="block mb-2 text-sm font-medium text-gray-700">Title</label>
                                    <input
                                        type="text"
                                        id="subtaskTitle"
                                        value={subtaskTitle}
                                        required
                                        onChange={(e) => setSubtaskTitle(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="subtaskDescription" className="block mb-2 text-sm font-medium text-gray-700">Description (Optional)</label>
                                    <textarea
                                        rows={3}
                                        id="subtaskDescription"
                                        value={subtaskDescription}
                                        onChange={(e) => setSubtaskDescription(e.target.value)}
                                        style={{ resize: "none" }}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    />
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={handleCancelSubtask}
                                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                                    >
                                        Add Subtask
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Task;