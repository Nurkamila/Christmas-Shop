import React from 'react';

const CartItem = ({ item, onRemove }) => {
    return (
        <div className="cart-item">
            <span>{item.name} - ${item.price}</span>
            <button className="btn" onClick={() => onRemove(item.id)}>Remove</button>
        </div>
    );
};

export default CartItem;