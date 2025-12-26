import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Snow from '../components/Snow';

const ProductDetail = ({ products, cart, setCart, currentCategory, setCurrentCategory }) => { // ← Props в destructuring, без дубликатов
    const { id } = useParams();
    const product = products.find(p => p.id == id);
    const navigate = useNavigate();

    if (!product) return <div>Product not found</div>;

    const addToCart = () => {
        setCart([...cart, product]);
        navigate('/cart');
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <Snow />
            <button className="btn" onClick={() => navigate('/')} style={{ marginBottom: '1rem' }}>Back to Shop</button>
            <h1>{product.name}</h1>
            <img
                src={product.image}
                alt={product.name}
                onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400?text=No+Image'; }}
                style={{
                    width: '100%',
                    height: 'auto', // ← Auto для полного фото
                    maxHeight: '400px', // Максимум высоты, без среза
                    objectFit: 'contain', // ← Полное фото без обрезки (центрирует)
                    borderRadius: '10px',
                    marginBottom: '1rem'
                }}
            />
            <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#228B22' }}>${product.price}</p>
            <p>{product.description}</p>
            <button className="btn" onClick={addToCart}>Add to Cart</button>
        </div>
    );
};

export default ProductDetail;