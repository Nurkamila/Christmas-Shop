import React from 'react';
import ProductCard from '../components/ProductCard';
import Snow from '../components/Snow.jsx';

const Admin = ({ products, onEdit, onDelete, currentCategory, setCurrentCategory }) => { // ← Props в destructuring, без дубликатов
    return (
        <div style={{ padding: '2rem' }}>
            <Snow />
            <h2>Admin Panel</h2>
            <button className="btn" onClick={() => onEdit()}>Add Product</button> {/* ← Открывает модал */}
            <div className="product-grid">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        isAdmin={true}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                ))}
            </div>
        </div>
    );
};

export default Admin;