import React from 'react';

const Snow = () => {
    return (
        <div className="snow-container">
            {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="snowflake" style={{ animationDelay: `${Math.random() * 10}s` }} />
            ))}
        </div>
    );
};

export default Snow;