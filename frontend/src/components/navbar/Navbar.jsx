import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="max-w-full mx-auto px-4">
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <span className="text-white text-lg font-semibold">Logo</span>
                    </div>
                    <div className="hidden md:flex">
                        <Link to='/' className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                        <Link to='/login' className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                        <Link to='/signup' className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Signup</Link>
                        <Link to='/about' className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</Link>
                    </div>
                    <div className="md:hidden flex -mr-2">
                        <button className="text-white focus:outline-none">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}


