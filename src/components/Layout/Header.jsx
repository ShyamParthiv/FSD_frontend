import React from 'react';
import './Layout.css';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className="app-header">
            <div className="header-search">
                <input type="text" placeholder="Search Dashboard..." />
            </div>
            <div className="header-profile">
                {user && (
                    <>
                        <div className="profile-info">
                            {user.username || user.email}
                        </div>
                        <div className="profile-avatar">
                            {(user.username?.[0] || user.email?.[0] || 'U').toUpperCase()}
                        </div>
                    </>
                )}
                <button onClick={logout} style={{ background: 'none', border: 'none', color: '#666', fontSize: '0.9em', cursor: 'pointer', padding: '0 10px' }}>
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;
