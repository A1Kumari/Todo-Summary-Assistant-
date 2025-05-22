import React, { useContext } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import TokenContext from '../../context/TokenContext.js';

function Header() {
    const token = localStorage.getItem("authToken");
    const { user } = useContext(TokenContext);
    
    const logout = () => {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
    }
    
    return (
        <div className="min-h-screen flex flex-col">
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <NavLink to="/" className="text-xl font-bold text-indigo-600 hover:text-indigo-800 transition duration-300">
                                Todo App
                            </NavLink>
                        </div>
                        
                        <div className="flex items-center">
                            {token ? (
                                <div className="flex items-center space-x-4">
                                    <p className="text-gray-700">
                                        Welcome, <span className="font-medium text-indigo-600 capitalize">{user?.name}</span>
                                    </p>
                                    <button 
                                        onClick={logout}
                                        className="px-4 py-2 rounded-md bg-indigo-50 text-indigo-600 font-medium hover:bg-indigo-100 transition duration-300"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-6">
                                    <NavLink 
                                        to="/login"
                                        className={({ isActive }) => 
                                            isActive ? "text-indigo-600 border-b-2 border-indigo-600 pb-1" : "text-gray-600 hover:text-indigo-600 transition duration-300"
                                        }
                                    >
                                        Login
                                    </NavLink>
                                    <NavLink 
                                        to="/register"
                                        className={({ isActive }) => 
                                            isActive ? "text-indigo-600 border-b-2 border-indigo-600 pb-1" : "text-gray-600 hover:text-indigo-600 transition duration-300"
                                        }
                                    >
                                        Register
                                    </NavLink>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            
            <main className="flex-grow">
                <Outlet />
            </main>
        </div>
    );
}

export default Header;