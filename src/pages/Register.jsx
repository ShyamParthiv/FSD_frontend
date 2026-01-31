import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'contributor',
        phone: ''
    });
    const { register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData.name, formData.email, formData.password, formData.role);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">Name</label>
                        <input name="name" type="text" className="w-full p-2 border rounded" onChange={handleChange} required />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Email</label>
                        <input name="email" type="email" className="w-full p-2 border rounded" onChange={handleChange} required />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Password</label>
                        <input name="password" type="password" className="w-full p-2 border rounded" onChange={handleChange} required />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2">Role</label>
                        <select name="role" className="w-full p-2 border rounded" onChange={handleChange}>
                            <option value="contributor">Contributor</option>
                            <option value="reviewer">Reviewer</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Register</button>
                </form>
                <div className="mt-4 text-center">
                    <Link to="/login" className="text-blue-600">Already have an account? Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
