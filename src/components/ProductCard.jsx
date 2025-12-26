import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart, isAdmin, onDelete, onEdit, showToast }) => {
    const handleAddToCart = () => {
        if (onAddToCart) { // ← Проверка: если функция передана
            onAddToCart(product);
            showToast('Added to cart!');
        }
    };

    return (
        <div className="product-card">
            <h3 className="product-title">{product.name}</h3>
            <Link to={`/product/${product.id}`} className="product-image-link">
                <img src={product.image} alt={product.name} />
            </Link>
            <p className="product-price">${product.price}</p>
            <p className="product-description">{product.description}</p>
            {onAddToCart && ( // ← Условный рендер кнопки: только если функция есть (не в Admin)
                <button className="btn" onClick={handleAddToCart}>Add to Cart</button>
            )}
            {isAdmin && (
                <div className="admin-actions">
                    <button className="btn" onClick={() => onEdit(product)}>Edit</button>
                    <button className="btn btn-delete" onClick={() => onDelete(product.id)}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default ProductCard;