import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-info">
                    <p>Christmas Shop is your reliable partner in creating a festive mood! We offer the best Christmas decorations with worldwide delivery.</p>
                </div>
                <div className="footer-contacts">
                    <a href="https://www.instagram.com/christmas_shop_zorik?igsh=OGZ4dXE3aWQ0YnNv" target="_blank" rel="noopener noreferrer" className="contact-link">
                        📸 Instagram
                    </a>
                    <a href="tel:+15551234567" className="contact-link">
                        📞 +1 (555) 123-4567
                    </a>
                </div>
                <div className="footer-logo">
                    <h2>Christmas Shop</h2>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 Christmas Shop. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;