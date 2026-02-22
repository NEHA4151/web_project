import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import './Profile.css';

const Profile = () => {
    const { user, logout } = useAuth();
    const { isDarkMode } = useTheme();

    if (!user) {
        return null; // The protected route wrapper handles the redirect
    }

    return (
        <div className={`profile-container ${isDarkMode ? 'dark' : 'light'}`}>
            <div className="profile-card">
                <div className="profile-header">
                    <div className="profile-avatar">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <h2>My Profile</h2>
                </div>

                <div className="profile-details">
                    <div className="detail-item">
                        <span className="detail-label">Name</span>
                        <span className="detail-value">{user.name}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Email ID</span>
                        <span className="detail-value">{user.email}</span>
                    </div>
                </div>

                <div className="profile-actions">
                    <button onClick={logout} className="logout-button">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
