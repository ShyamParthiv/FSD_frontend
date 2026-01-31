import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ContributorDashboard = () => {
    const [stats, setStats] = useState({ total_submissions: 0, pending: 0, approved: 0, rejected: 0 });
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        fetchStats();
        fetchRecentSubmissions();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/dashboard/stats');
            setStats(res.data.stats);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const fetchRecentSubmissions = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/submissions?limit=5');
            setSubmissions(res.data.data);
        } catch (error) {
            console.error('Error fetching submissions:', error);
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Contributor Dashboard</h1>
                <Link to="/submissions/new" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    + New Submission
                </Link>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded shadow text-center">
                    <h3 className="text-gray-500">Total</h3>
                    <p className="text-2xl font-bold">{stats.total_submissions}</p>
                </div>
                <div className="bg-white p-4 rounded shadow text-center">
                    <h3 className="text-yellow-500">Pending</h3>
                    <p className="text-2xl font-bold">{stats.pending}</p>
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

            <h2 className="text-xl font-bold mb-4">Recent Submissions</h2>
            <div className="bg-white rounded shadow text-sm"> {/* text-sm for smaller rows */}
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b">
                            <th className="p-4">Title</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map(sub => (
                            <tr key={sub.id} className="border-b hover:bg-gray-50">
                                <td className="p-4">{sub.title}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs text-white ${sub.status === 'approved' ? 'bg-green-500' :
                                            sub.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'
                                        }`}>
                                        {sub.status.toUpperCase()}
                                    </span>
                                </td>
                                <td className="p-4">{new Date(sub.created_at).toLocaleDateString()}</td>
                                <td className="p-4">
                                    <Link to={`/submissions/${sub.id}`} className="text-blue-600 hover:underline">View</Link>
                                </td>
                            </tr>
                        ))}
                        {submissions.length === 0 && (
                            <tr>
                                <td colSpan="4" className="p-4 text-center text-gray-500">No submissions found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContributorDashboard;
