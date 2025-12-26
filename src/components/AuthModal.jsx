import React, { useState } from 'react';

const AuthModal = ({ isLogin, onClose, onAuthSuccess = () => {} }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault(); // Предотвращаем submit
        if (loading) return;

        setLoading(true);
        setError('');
        console.log('Submitting:', isLogin ? 'Login' : 'Sign Up', { email }); // Отладка

        const users = JSON.parse(localStorage.getItem('users') || '[]');

        if (isLogin) {
            const user = users.find(u => u.email === email && u.password === password);
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                onAuthSuccess(user);
                onClose();
            } else {
                setError('Invalid email or password!');
            }
        } else {
            if (password !== confirmPassword) {
                setError('Passwords do not match!');
                setLoading(false);
                return;
            }
            if (users.find(u => u.email === email)) {
                setError('Email already registered! Please login.');
                setLoading(false);
                return;
            }
            if (!email || !password) {
                setError('Please fill all fields!');
                setLoading(false);
                return;
            }
            const newUser = { email, password, isAdmin: email === 'admin@example.com' };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('user', JSON.stringify(newUser));
            onAuthSuccess(newUser);
            onClose();
        }
        setLoading(false);
    };

    const clearError = () => setError('');

    if (loading) {
        return (
            <div className="modal" onClick={onClose}>
                <div className="modal-content" style={{ width: '350px', textAlign: 'center' }}>
                    <button className="close-btn" onClick={onClose}>×</button>
                    <h2>Loading...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{ width: '350px' }}>
                <button className="close-btn" onClick={onClose}>×</button>
                <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); clearError(); }}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); clearError(); }}
                        required
                    />
                    {!isLogin && (
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => { setConfirmPassword(e.target.value); clearError(); }}
                            required
                        />
                    )}
                    {error && <p className="error">{error}</p>}
                    <button type="submit" className="btn" disabled={loading}>
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthModal;