import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import ProductForm from './components/ProductForm';
import Footer from './components/Footer';
import { initialProducts } from './data/products';
import './styles/App.css';

function AppContent() {
    const [products, setProducts] = useState(initialProducts);
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showProductForm, setShowProductForm] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [currentCategory, setCurrentCategory] = useState('All');
    const [toastMessage, setToastMessage] = useState('');
    const [forceUpdate, setForceUpdate] = useState(0);

    const handleAuthSuccess = (userData) => {
        setUser(userData.email);
        setIsLoggedIn(true);
        setIsAdmin(userData.isAdmin);
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedProducts = localStorage.getItem('products');
        let loadedProducts = initialProducts;

        if (storedProducts) {
            try {
                loadedProducts = JSON.parse(storedProducts).map(p => ({ ...p, id: String(p.id) }));
                console.log('Loaded products sample id:', loadedProducts[0]?.id); // Лог id для проверки
            } catch (e) {
                console.error('Invalid products in localStorage:', e);
            }
        }
        setProducts(loadedProducts);

        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setUser(parsed.email);
            setIsLoggedIn(true);
            setIsAdmin(parsed.isAdmin);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 0) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        setIsLoggedIn(false);
        setIsAdmin(false);
    };

    const openEditForm = (product = null) => {
        setEditProduct(product);
        setShowProductForm(true);
    };

    const closeForm = () => {
        setShowProductForm(false);
        setEditProduct(null);
    };

    const saveProduct = (productData) => {
        console.log('Saving product:', productData);
        if (editProduct) {
            // Edit
            setProducts((prevProducts) => {
                const updated = prevProducts.map(p => String(p.id) === String(productData.id) ? productData : p);
                console.log('Updated product:', updated.find(p => String(p.id) === String(productData.id)));
                return updated;
            });
            console.log('Edit complete — length unchanged');
        } else {
            // Add
            if (!productData.id) {
                productData.id = Date.now().toString(); // Генерируем id
            }
            setProducts((prevProducts) => [...prevProducts, productData]); // Правильная arrow
            // console.log('Add complete — new length:', prevProducts.length + 1);
        }
        showToast(editProduct ? 'Product updated!' : 'Product added!'); // Toast для обеих веток
        setForceUpdate(prev => prev + 1); // Force re-render
        closeForm(); // Закрытие модала всегда
    };

    const deleteProduct = (id) => {
        if (window.confirm('Delete this product?')) {
            setProducts(products.filter(p => String(p.id) !== String(id))); // String сравнение
        }
    };

    const showToast = (message) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(''), 2000);
    };

    return (
        <>
            <Navbar
                key={currentCategory}
                isLoggedIn={isLoggedIn}
                isAdmin={isAdmin}
                onLogout={handleLogout}
                user={user}
                onAuthSuccess={handleAuthSuccess}
                currentCategory={currentCategory}
                setCurrentCategory={setCurrentCategory}
                cartLength={cart.length}
                showToast={showToast}
            />
            <Routes>
                <Route
                    path="/"
                    key={forceUpdate} // Force re-render после edit/add
                    element={
                        <Home
                            products={products}
                            cart={cart}
                            setCart={setCart}
                            isAdmin={isAdmin}
                            onDelete={deleteProduct}
                            onEdit={openEditForm}
                            currentCategory={currentCategory}
                            setCurrentCategory={setCurrentCategory}
                            showToast={showToast}
                        />
                    }
                />
                <Route
                    path="/product/:id"
                    element={
                        <ProductDetail
                            products={products}
                            cart={cart}
                            setCart={setCart}
                            currentCategory={currentCategory}
                            setCurrentCategory={setCurrentCategory}
                            showToast={showToast}
                        />
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <Cart
                            cart={cart}
                            setCart={setCart}
                            currentCategory={currentCategory}
                            setCurrentCategory={setCurrentCategory}
                            showToast={showToast}
                        />
                    }
                />
                <Route
                    path="/admin"
                    element={
                        isAdmin ? (
                            <Admin
                                products={products}
                                onEdit={openEditForm}
                                onDelete={deleteProduct}
                                currentCategory={currentCategory}
                                setCurrentCategory={setCurrentCategory}
                            />
                        ) : (
                            <Navigate to="/" replace />
                        )
                    }
                />
            </Routes>
            {toastMessage && (
                <div className="toast" style={{ position: 'fixed', top: '80px', right: '20px', background: '#FFD700', color: '#DC143C', padding: '1rem', borderRadius: '5px', zIndex: 1001 }}>
                    {toastMessage}
                </div>
            )}
            {showProductForm && (
                <ProductForm
                    product={editProduct}
                    onSave={saveProduct}
                    onClose={closeForm}
                />
            )}
            <Footer />
        </>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;