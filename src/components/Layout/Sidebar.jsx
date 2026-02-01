import React from 'react';
import { NavLink } from 'react-router-dom';
import './Layout.css';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
    const { user } = useAuth();
    const role = user?.role || 'contributor'; // Default to contributor if not set

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                Sing App
            </div>
            <nav className="sidebar-nav">
                <NavLink to={`/dashboard/${role}`} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    Dashboard
                </NavLink>

                {role === 'contributor' && (
                    <>
                        <NavLink to="/submissions/new" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            New Submission
                        </NavLink>
                    </>
                )}

                <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    My Profile
                </NavLink>
                <div className="nav-item">
                    Documentation
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;
