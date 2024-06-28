import React from 'react';
import { useContext, useState } from 'react';
import { GeneralContext } from '../../App';
import { Link } from 'react-router-dom';
import { checkPermissions, pages } from '../../utils';

export default function Navbar() {
    const { user, setUser, logout, userRoleType, setUserRoleType } = useContext(GeneralContext);
    console.log(userRoleType)

    return (
        <nav className="bg-gray-800 p-4">
            <div className="max-w-full mx-auto px-4">
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <span className="text-white text-lg font-semibold">Logo</span>
                    </div>
                    <div className="hidden md:flex">
                        {pages.filter(p => !p.permissions || checkPermissions(p.permissions, userRoleType)).map(p => (
                            <Link key={p.route} to={p.route} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                {p.title}
                            </Link>
                        ))
                        }
                        {user &&
                            <Link className="text-red-500 hover:bg-red-900 hover:text-red-100 px-3 py-2 rounded-md text-sm font-medium" onClick={logout}>Logout</Link>
                        }
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


