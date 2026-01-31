import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateSubmission = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'General',
        file_url: ''
    });
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/submissions', formData);
            navigate('/dashboard/contributor');
        } catch (err) {
            setError(err.response?.data?.error || 'Submission failed');
        }
    };

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">New Submission</h1>
            {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Title</label>
                    <input name="title" type="text" className="w-full p-2 border rounded" onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Description</label>
                    <textarea name="description" className="w-full p-2 border rounded h-32" onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Category</label>
                    <select name="category" className="w-full p-2 border rounded" onChange={handleChange}>
                        <option value="General">General</option>
                        <option value="Feature Request">Feature Request</option>
                        <option value="Bug Report">Bug Report</option>
                    </select>
                </div>
                <div className="mb-6">
                    <label className="block mb-2 font-semibold">File URL (Optional)</label>
                    <input name="file_url" type="text" className="w-full p-2 border rounded" onChange={handleChange} placeholder="https://..." />
                </div>
                <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 border rounded hover:bg-gray-100">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default CreateSubmission;
