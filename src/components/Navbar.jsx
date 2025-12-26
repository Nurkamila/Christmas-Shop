import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ← Добавь useNavigate
import AuthModal from './AuthModal';

const Navbar = ({ isLoggedIn, isAdmin, onLogout, user, onAuthSuccess = () => {}, currentCategory, setCurrentCategory, cartLength, showToast }) => {
    const [showAuth, setShowAuth] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate(); // ← Для навигации

    const openAuth = (loginMode) => {
        setIsLogin(loginMode);
        setShowAuth(true);
    };

    const handleCategoryClick = (category) => {
        console.log('Category clicked:', category); // Лог (убери позже)
        setCurrentCategory(category);
        navigate('/'); // ← Переход на Home с фильтром
    };

    return (
        <nav className="navbar" key={currentCategory}> {/* ← key для re-render */}
            <div className="logo">
                <div className="logo-emoji">🎄</div>
                <div className="logo-text">
                    <div className="logo-line">Christmas</div>
                    <div className="logo-line shop">Shop!</div>
                </div>
            </div>
            <ul>
                <li><button className={`nav-link ${currentCategory === 'All' ? 'active' : ''}`} onClick={() => handleCategoryClick('All')}>All</button></li>
                <li><button className={`nav-link ${currentCategory === 'Christmas Decor' ? 'active' : ''}`} onClick={() => handleCategoryClick('Christmas Decor')}>Christmas Decor</button></li>
                <li><button className={`nav-link ${currentCategory === 'Christmas Trees' ? 'active' : ''}`} onClick={() => handleCategoryClick('Christmas Trees')}>Christmas Trees</button></li>
                <li><button className={`nav-link ${currentCategory === 'Christmas Lights' ? 'active' : ''}`} onClick={() => handleCategoryClick('Christmas Lights')}>Christmas Lights</button></li>
                <li><button className={`nav-link ${currentCategory === 'SALE' ? 'active' : ''}`} onClick={() => handleCategoryClick('SALE')}>SALE</button></li>
                {isAdmin && <li><Link to="/admin">Admin</Link></li>}
                {isLoggedIn ? (
                    <li>
                        <span className="welcome-text">Welcome!</span>
                        <button className="btn" onClick={onLogout}>Logout</button>
                    </li>
                ) : (
                    <li>
                        <button className="btn" onClick={() => openAuth(true)}>Login</button>
                        <button className="btn" onClick={() => openAuth(false)}>Sign Up</button>
                    </li>
                )}
                <li>
                    <Link to="/cart" style={{ textDecoration: 'none', color: 'white' }}>
                        🛒 Cart
                        {cartLength > 0 && <span className="cart-badge">{cartLength}</span>}
                    </Link>
                </li>
            </ul>
            {showAuth && (
                <AuthModal
                    isLogin={isLogin}
                    onClose={() => setShowAuth(false)}
                    onAuthSuccess={onAuthSuccess}
                />
            )}
        </nav>
    );
};

export default Navbar;