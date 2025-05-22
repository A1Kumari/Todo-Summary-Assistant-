import React from 'react';
import { NavLink } from 'react-router-dom';

function TaskIndicator() {
    return ( 
        <div className='flex-grow'>
            <nav className='w-full'>
                <ul className='flex items-center justify-center gap-2 p-2 bg-gray-100 rounded-2xl shadow-sm border border-gray-200'>
                    <li className='flex-1'>
                        <NavLink 
                            to="/"
                            className={({ isActive }) =>
                                `block text-center py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                                    isActive 
                                        ? 'bg-white text-blue-600 shadow-md border border-blue-100' 
                                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                }`
                            }
                        >
                            All Tasks
                        </NavLink>
                    </li>
                    <li className='flex-1'>
                        <NavLink 
                            to="/active"
                            className={({ isActive }) =>
                                `block text-center py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                                    isActive 
                                        ? 'bg-white text-blue-600 shadow-md border border-blue-100' 
                                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                }`
                            }
                        >
                            Active
                        </NavLink>
                    </li>
                    <li className='flex-1'>
                        <NavLink 
                            to="/completed"
                            className={({ isActive }) =>
                                `block text-center py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                                    isActive 
                                        ? 'bg-white text-blue-600 shadow-md border border-blue-100' 
                                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                }`
                            }
                        >
                            Completed
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default TaskIndicator;