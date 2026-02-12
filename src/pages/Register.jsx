import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

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
            await register(formData.name, formData.email, formData.password, formData.role, formData.phone);
            navigate('/login');
        } catch (err) {
            console.error('Registration failed:', err);
            const errorMessage = err.response?.data?.error || err.response?.data?.message || err.message || 'Registration failed';
            setError(errorMessage);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Register</h2>
                {error && <div className="auth-error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <input name="name" type="text" className="form-input" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input name="email" type="email" className="form-input" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input name="password" type="password" className="form-input" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Phone (Optional)</label>
                        <input name="phone" type="tel" className="form-input" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Role</label>
                        <select name="role" className="form-input" value={formData.role} onChange={handleChange}>
                            <option value="contributor">Contributor</option>
                            <option value="reviewer">Reviewer</option>
                        </select>
                    </div>
                    <button type="submit" className="btn-auth">Register</button>
                </form>
                <div className="auth-footer">
                    <Link to="/login" className="auth-link">Already have an account? Login</Link>
                </div>
            </div>
        </div>
    );
};


export default Register;
