import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ReviewerDashboard = () => {
    const [stats, setStats] = useState({ pending_reviews: 0, total_reviewed: 0, approved: 0, rejected: 0 });
    const [submissions, setSubmissions] = useState([]);
    const [filter, setFilter] = useState('pending');

    useEffect(() => {
        fetchStats();
        fetchSubmissions();
    }, [filter]);

    const fetchStats = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/dashboard/stats');
            setStats(res.data.stats);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const fetchSubmissions = async () => {
        try {
            // For reviewer, fetch all or filter by status
            const statusParam = filter === 'all' ? '' : `&status=${filter}`;
            const res = await axios.get(`http://localhost:5000/api/submissions?limit=20${statusParam}`);
            setSubmissions(res.data.data);
        } catch (error) {
            console.error('Error fetching submissions:', error);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Reviewer Dashboard</h1>

            <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded shadow text-center border-l-4 border-yellow-500">
                    <h3 className="text-gray-500">Pending Reviews</h3>
                    <p className="text-2xl font-bold">{stats.pending_reviews}</p>
                </div>
                <div className="bg-white p-4 rounded shadow text-center">
                    <h3 className="text-gray-500">Total Reviewed</h3>
                    <p className="text-2xl font-bold">{stats.total_reviewed}</p>
                </div>
                <div className="bg-white p-4 rounded shadow text-center">
                    <h3 className="text-green-500">Approved</h3>
                    <p className="text-2xl font-bold">{stats.approved}</p>
                </div>
                <div className="bg-white p-4 rounded shadow text-center">
                    <h3 className="text-red-500">Rejected</h3>
                    <p className="text-2xl font-bold">{stats.rejected}</p>
                </div>
            </div>

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Submissions</h2>
                <select
                    className="p-2 border rounded"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="pending">Pending Only</option>
                    <option value="all">All Submissions</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            <div className="bg-white rounded shadow text-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b">
                            <th className="p-4">Title</th>
                            <th className="p-4">Contributor</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map(sub => (
                            <tr key={sub.id} className="border-b hover:bg-gray-50">
                                <td className="p-4">{sub.title}</td>
                                <td className="p-4">{sub.contributor?.name}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs text-white ${sub.status === 'approved' ? 'bg-green-500' :
                                            sub.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'
                                        }`}>
                                        {sub.status.toUpperCase()}
                                    </span>
                                </td>
                                <td className="p-4">{new Date(sub.created_at).toLocaleDateString()}</td>
                                <td className="p-4">
                                    {sub.status === 'pending' ? (
                                        <Link to={`/submissions/${sub.id}/review`} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-xs">
                                            Review
                                        </Link>
                                    ) : (
                                        <Link to={`/submissions/${sub.id}`} className="text-blue-600 hover:underline">
                                            View
                                        </Link>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {submissions.length === 0 && (
                            <tr>
                                <td colSpan="5" className="p-4 text-center text-gray-500">No submissions found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReviewerDashboard;
