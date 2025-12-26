import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Snow from '../components/Snow.jsx';

const Cart = ({ cart, setCart, currentCategory, setCurrentCategory }) => { // ← Props в destructuring, без 'props'
    const [showCheckout, setShowCheckout] = useState(false);
    const [card, setCard] = useState('');
    const [code, setCode] = useState('');
    const navigate = useNavigate();

    const total = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity <= 0) {
            removeItem(id);
            return;
        }
        setCart(cart.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
    };

    const removeItem = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const handleCheckout = (e) => {
        e.preventDefault();
        if (card && code) {
            alert('Поздравляем! Ваша покупка совершена! 🎉');
            setCart([]);
            setShowCheckout(false);
        } else {
            alert('Введите данные карты!');
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <Snow />
            <h2>Cart ({cart.length} items)</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty. <Link to="/" style={{ color: '#DC143C' }}>Continue shopping</Link></p>
            ) : (
                <>
                    {cart.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                            <span>{item.name} - ${item.price}</span>
                            <div>
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                <input type="number" min="1" value={item.quantity} onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))} style={{ width: '50px', textAlign: 'center' }} />
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                            </div>
                            <button className="btn" onClick={() => removeItem(item.id)}>Remove</button>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="total">Total: ${total.toFixed(2)}</div>
                    <button className="btn" onClick={() => setShowCheckout(true)}>Checkout</button>
                </>
            )}

            {showCheckout && (
                <div className="modal" onClick={() => setShowCheckout(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h3>Enter Card Details</h3>
                        <form onSubmit={handleCheckout}>
                            <input placeholder="Card Number" value={card} onChange={e => setCard(e.target.value)} required />
                            <input placeholder="CVV" value={code} onChange={e => setCode(e.target.value)} required />
                            <button type="submit" className="btn">Pay ${total.toFixed(2)}</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;