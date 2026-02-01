import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ContributorDashboard.css';

const ContributorDashboard = () => {
    const [stats, setStats] = useState({ total_submissions: 0, pending: 0, approved: 0, rejected: 0 });
    const [submissions, setSubmissions] = useState([]);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        fetchStats();
        fetchRecent();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/dashboard/stats`);
            setStats(res.data.stats);
        } catch (error) {
            console.error('Failed to fetch stats', error);
        }
    };

    const fetchRecent = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/submissions?limit=5`);
            setSubmissions(res.data.data);
        } catch (error) {
            console.error('Error fetching submissions:', error);
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1 className="dashboard-title">Contributor Dashboard</h1>
                <Link to="/submissions/new" className="btn-primary">
                    + New Submission
                </Link>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <h3 className="stat-title">Total Submissions</h3>
                    <p className="stat-value">{stats.total_submissions}</p>
                </div>
                <div className="stat-card">
                    <h3 className="stat-title">Pending</h3>
                    <p className="stat-value text-yellow">{stats.pending}</p>
                </div>
                <div className="stat-card">
                    <h3 className="stat-title">Approved</h3>
                    <p className="stat-value text-green">{stats.approved}</p>
                </div>
                <div className="stat-card">
                    <h3 className="stat-title">Rejected</h3>
                    <p className="stat-value text-red">{stats.rejected}</p>
                </div>
            </div>

            <h2 className="section-title">Recent Submissions</h2>
            <div className="table-container">
                <table className="dashboard-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map(sub => (
                            <tr key={sub.id}>
                                <td>{sub.title}</td>
                                <td>
                                    <span className={`status-badge ${sub.status === 'approved' ? 'status-approved' :
                                            sub.status === 'rejected' ? 'status-rejected' : 'status-pending'
                                        }`}>
                                        {sub.status.toUpperCase()}
                                    </span>
                                </td>
                                <td>{new Date(sub.created_at).toLocaleDateString()}</td>
                                <td>
                                    <Link to={`/submissions/${sub.id}`} className="action-link">View</Link>
                                </td>
                            </tr>
                        ))}
                        {submissions.length === 0 && (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center', color: '#888', padding: '20px' }}>
                                    No submissions found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContributorDashboard;
