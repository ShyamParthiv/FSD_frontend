import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ReviewSubmission = () => {
    const { id } = useParams();
    const [submission, setSubmission] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [status, setStatus] = useState(''); // 'approved' or 'rejected'
    const navigate = useNavigate();
    const [error, setError] = useState('');

    useEffect(() => {
        fetchSubmission();
    }, [id]);

    const fetchSubmission = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/submissions/${id}`);
            setSubmission(res.data.submission);
        } catch (error) {
            console.error('Error fetching submission:', error);
        }
    };

    const handleReview = async (newStatus) => {
        // If rejecting, show feedback text area first if not shown? 
        // Or simpler: two buttons. If Reject clicked and separate state.
        setStatus(newStatus);
        if (newStatus === 'approved') {
            // Confirm?
            submitReview(newStatus);
        }
    };

    const submitReview = async (reviewStatus) => {
        try {
            await axios.put(`http://localhost:5000/api/submissions/${id}/review`, {
                status: reviewStatus,
                feedback: reviewStatus === 'rejected' ? feedback : null
            });
            navigate('/dashboard/reviewer');
        } catch (err) {
            setError(err.response?.data?.error || 'Review failed');
        }
    };

    if (!submission) return <div className="p-8">Loading...</div>;

    return (
        <div className="p-8 max-w-3xl mx-auto">
            <button onClick={() => navigate(-1)} className="mb-4 text-blue-600">&larr; Back</button>
            <h1 className="text-3xl font-bold mb-6">Review Submission</h1>

            {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}

            <div className="bg-white p-8 rounded shadow mb-8">
                <h2 className="text-2xl font-bold mb-2">{submission.title}</h2>
                <p className="text-gray-600 mb-6">By {submission.contributor.name}</p>

                <div className="mb-4">
                    <h3 className="font-semibold">Description</h3>
                    <p className="whitespace-pre-wrap">{submission.description}</p>
                </div>

                {submission.file_url && (
                    <div className="mb-4">
                        <a href={submission.file_url} target="_blank" className="text-blue-600 hover:underline">View Attachment</a>
                    </div>
                )}
            </div>

            <div className="bg-white p-8 rounded shadow">
                <h3 className="text-xl font-bold mb-4">Action</h3>

                {status === 'rejected' ? (
                    <div>
                        <label className="block mb-2 font-semibold">Reason for Rejection (Required)</label>
                        <textarea
                            className="w-full p-2 border rounded mb-4 h-32"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Provide constructive feedback..."
                        />
                        <div className="flex gap-4">
                            <button onClick={() => setStatus('')} className="px-4 py-2 border rounded">Cancel</button>
                            <button onClick={() => submitReview('rejected')} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Confirm Rejection</button>
                        </div>
                    </div>
                ) : (
                    <div className="flex gap-4">
                        <button onClick={() => handleReview('approved')} className="px-6 py-3 bg-green-600 text-white rounded font-bold hover:bg-green-700">Approve</button>
                        <button onClick={() => handleReview('rejected')} className="px-6 py-3 bg-red-600 text-white rounded font-bold hover:bg-red-700">Reject</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewSubmission;
