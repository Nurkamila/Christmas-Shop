import React, { useState, useEffect } from 'react';

const categories = ['Christmas Decor', 'Christmas Trees', 'Christmas Lights', 'SALE']; // ← Список категорий

const ProductForm = ({ product, onSave, onClose }) => {
    const [formData, setFormData] = useState({ name: '', price: '', image: '', description: '', category: 'Christmas Decor' }); // ← Добавь category по умолчанию

    useEffect(() => {
        if (product) {
            setFormData({
                id: product.id, // ← Добавь id для edit
                name: product.name,
                price: product.price,
                image: product.image,
                description: product.description,
                category: product.category || 'Christmas Decor'
            });
        } else {
            setFormData({ id: '', name: '', price: '', image: '', description: '', category: 'Christmas Decor' });
        }
    }, [product]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting formData:', formData);
        if (!formData.name || !formData.price || !formData.image || !formData.description || !formData.category) {
            alert('Fill all fields!');
            return;
        }
        onSave(formData); // onSave вызовет toast и closeForm
    };

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{ width: '400px', maxHeight: '80vh', overflowY: 'auto' }}>
                <button className="close-btn" onClick={onClose}>×</button>
                <h2>{product ? 'Edit Product' : 'Add Product'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    <input
                        placeholder="Price ($)"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                    />
                    <input
                        placeholder="Image URL"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        required
                    />
                    <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                        style={{ padding: '0.75rem', border: '2px solid #ccc', borderRadius: '8px' }}
                    >
                        <option value="">Select Category</option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <textarea
                        placeholder="Description"
                        rows="4"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                    />
                    {product ? (
                        <input type="hidden" value={product.id} />
                    ) : null}
                    <button type="submit" className="btn">Save</button>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;