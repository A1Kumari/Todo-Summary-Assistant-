import React, { useState } from 'react';
import { useContext } from 'react';
import TaskContext from '../../context/TaskContext';
import TokenContext from '../../context/TokenContext';
import axios from "../../Axios/axios.js"
import "./createTask.css"
// Add this to your CSS file
/*
.toast {
  opacity: 0;
  visibility: hidden;
}

.toast.show {
  opacity: 1;
  visibility: visible;
}
*/

function CreateTask() {
    const { dispatch } = useContext(TaskContext)
    const {userToken} = useContext(TokenContext)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [priority, setPriority] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleAdd = async (e) => {
        e.preventDefault();
         
        try {
            const res = await axios.post("/task/addTask", {
              title, 
              description, 
              dueDate,
              priority,
              completed: false
            },{
              headers: {
                Authorization: `Bearer ${userToken}`
              }
            })
            //setToast(res.data)
            // showToast();
          } catch (error) {
            console.log(error);
          }
        dispatch({
            type: "ADD_TASK",
            title,
            description
        })
        setTitle("")
        setDescription("")
        setIsFormOpen(false);
    };
    
    const openForm = () => {
        setIsFormOpen(true);
    };
    
    const closeForm = () => {
        setIsFormOpen(false);
    };
    
    return (
        <div className="relative">
            {/* Add Button */}
            <div className="fixed bottom-6 right-6 z-10">
                <button 
                    onClick={openForm}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition duration-300 focus:outline-none"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>
            
            {/* Form Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden transform transition-all">
                        <div className="bg-indigo-600 px-4 py-3 flex justify-between items-center">
                            <h2 className="text-xl font-medium text-white">Create New Task</h2>
                            <button 
                                onClick={closeForm}
                                className="text-white hover:text-gray-200 focus:outline-none"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <div className="p-6">
                            <form onSubmit={handleAdd}>
                                <div className="mb-4">
                                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        value={title}
                                        required
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        rows={5}
                                        name="description"
                                        id="description"
                                        value={description}
                                        required
                                        onChange={(e) => setDescription(e.target.value)}
                                        style={{ resize: "none" }}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                    />
                                </div>
                                {/* priority */}
                                {/* Priority Selection */}
<div className="mb-6">
  <label className="block mb-2 text-sm font-medium text-gray-700">Priority</label>
  <div className="flex gap-3">
    {['Low', 'Medium', 'High'].map((level) => (
      <button
        key={level}
        type="button"
        onClick={() => setPriority(level)}
        className={`px-4 py-2 rounded-lg text-sm font-medium border ${
          priority === level
            ? 'bg-indigo-600 text-white border-indigo-600'
            : 'bg-white text-gray-700 border-gray-300'
        }`}
      >
        {level}
      </button>
    ))}
  </div>
</div>

                                {/* duedate */}

                                {/* Due Date Picker */}
<div className="mb-6">
  <label htmlFor="dueDate" className="block mb-2 text-sm font-medium text-gray-700">
    Due Date
  </label>
  <div className="relative">
    <input
      type="date"
      id="dueDate"
      name="dueDate"
  
      onChange={(e) => setDueDate(e.target.value)}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 pr-10"
    />
    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
      <svg
        className="w-5 h-5 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    </div>
  </div>
</div>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={closeForm}
                                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
                                    >
                                        Add Task
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Toast Notification */}
            <div 
                className="toast opacity-0 bg-green-600 text-white p-3 rounded-xl shadow-2xl text-center fixed bottom-4 left-1/2 transform -translate-x-1/2 transition-opacity duration-300 z-30" 
                id="toast"
            >
                <p>Task added successfully!</p>
            </div>
        </div>
    );
}

export default CreateTask;