import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Snow from '../components/Snow';
import { initialProducts } from '../data/products'; // Импорт для fallback

const Home = ({ products: propProducts, cart, setCart, isAdmin, onDelete, onEdit, currentCategory, setCurrentCategory, showToast }) => { // ← Добавь , setCurrentCategory// ← showToast добавлен!
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [visibleProducts, setVisibleProducts] = useState(6);
    const [filteredProducts, setFilteredProducts] = useState(propProducts || initialProducts); // Fallback
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Home useEffect triggered with category:', currentCategory, 'products length:', propProducts.length); // Лог длины продуктов
        const currentProducts = propProducts.length > 0 ? propProducts : initialProducts;
        let filtered = [...currentProducts];
        console.log('Initial filtered length:', filtered.length); // Лог до фильтра

        // Фильтр по категории
        if (currentCategory !== 'All') {
            if (currentCategory === 'SALE') {
                filtered = filtered.filter(p => p.price < 20);
            } else {
                filtered = filtered.filter(p => p.category === currentCategory);
            }
        }

        // Поиск и сортировка
        filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
        if (sort === 'high') filtered.sort((a, b) => b.price - a.price);
        if (sort === 'low') filtered.sort((a, b) => a.price - b.price);
        console.log('Final filtered length:', filtered.length); // Лог после фильтра
        setFilteredProducts(filtered);
    }, [search, sort, propProducts, currentCategory]);

    const addToCart = (product) => {
        const existing = cart.find(c => c.id === product.id);
        if (existing) {
            setCart(cart.map(c => c.id === product.id ? { ...c, quantity: c.quantity + 1 } : c));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const loadMore = () => setVisibleProducts(prev => prev + 6);

    return (
        <div>
            <Snow />
            {/* Индикатор категории */}
            {currentCategory !== 'All' && (
                <div style={{ textAlign: 'center', padding: '1rem', fontSize: '1.2rem', color: '#FFD700' }}>
                    Showing: {currentCategory}
                    <button
                        className="btn"
                        onClick={() => setCurrentCategory('All')} // ← Теперь работает!
                        style={{ marginLeft: '1rem', fontSize: '0.9rem' }}
                    >
                        Show All
                    </button>
                </div>
            )}
            <div className="search-filter">
                <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
                <select value={sort} onChange={e => setSort(e.target.value)}>
                    <option value="">Sort by Price</option>
                    <option value="high">High to Low</option>
                    <option value="low">Low to High</option>
                </select>
            </div>
            <div className="product-grid">
                {filteredProducts.slice(0, visibleProducts).map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={addToCart}
                        isAdmin={isAdmin}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        showToast={showToast} // ← Теперь ок, поскольку в props
                    />
                ))}
            </div>
            {visibleProducts < filteredProducts.length && (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <button className="btn" onClick={loadMore}>Load More</button>
                </div>
            )}
        </div>
    );
};

export default Home;