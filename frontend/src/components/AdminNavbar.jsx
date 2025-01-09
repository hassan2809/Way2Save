import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin');
    };

    return (
        <nav className="bg-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/admin/products" className="text-2xl font-bold text-white">
                        <span className="text-2xl font-bold">
                            Way2<span className='text-red-500'>Save</span>
                        </span>
                    </Link>

                    {/* User Menu */}
                    <UserMenu onLogout={handleLogout} />
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;
