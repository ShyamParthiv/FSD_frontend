import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SubmissionDetails = () => {
    const { id } = useParams();
    const [submission, setSubmission] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();

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

    if (!submission) return <div className="p-8">Loading...</div>;

    const canResubmit =
        user.role === 'contributor' &&
        submission.status === 'rejected' &&
        submission.resubmission_count < 2;

    return (
        <div className="p-8 max-w-3xl mx-auto">
            <button onClick={() => navigate(-1)} className="mb-4 text-blue-600">&larr; Back</button>

            <div className="bg-white p-8 rounded shadow">
                <div className="flex justify-between items-start mb-6">
                    <h1 className="text-3xl font-bold">{submission.title}</h1>
                    <div className="text-right">
                        <span className={`px-3 py-1 rounded text-sm text-white ${submission.status === 'approved' ? 'bg-green-500' :
                                submission.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'
                            }`}>
                            {submission.status.toUpperCase()}
                        </span>
                        <div className="text-sm text-gray-500 mt-2">
                            {new Date(submission.created_at).toLocaleDateString()}
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="font-semibold text-gray-700">Category</h3>
                    <p>{submission.category}</p>
                </div>

                <div className="mb-6">
                    <h3 className="font-semibold text-gray-700">Description</h3>
                    <p className="whitespace-pre-wrap">{submission.description}</p>
                </div>

                {submission.file_url && (
                    <div className="mb-6">
                        <h3 className="font-semibold text-gray-700">Attachment</h3>
                        <a href={submission.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            View File
                        </a>
                    </div>
                )}

                {submission.status === 'rejected' && submission.feedback && (
                    <div className="mb-6 bg-red-50 p-4 rounded border border-red-200">
                        <h3 className="font-semibold text-red-700">Reviewer Feedback</h3>
                        <p className="text-red-800">{submission.feedback}</p>
                    </div>
                )}

                <div className="border-t pt-4 mt-8 flex justify-between items-center">
                    <div className="text-gray-600">
                        Resubmissions used: {submission.resubmission_count} / 2
                    </div>
                    {canResubmit && (
                        <Link to={`/submissions/${id}/resubmit`} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Resubmit Entry
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubmissionDetails;
