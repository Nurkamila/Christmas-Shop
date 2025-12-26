# Christmas Shop

A festive e-commerce application for browsing and purchasing Christmas decorations. Built with React, this project features an intuitive product catalog, shopping cart, admin panel for managing inventory, and responsive design for a joyful holiday shopping experience.

## Main Features

- **Product Browsing**: Grid layout with lazy loading ("Load More"), search, price sorting, and category filters (Christmas Decor, Christmas Trees, Christmas Lights, SALE).
- **Shopping Cart**: Add/remove items, quantity adjustment (+/-), subtotal calculation, and fake checkout modal.
- **Admin Panel**: Login as admin to add, edit, or delete products with category assignment. Changes persist via localStorage.
- **User Authentication**: Simple login/signup modal with role-based access (admin vs user).
- **Responsive Design**: Mobile-friendly navbar, sticky navigation, falling snow animation, and footer with contacts.
- **Notifications**: Toast alerts for cart adds, product saves/updates, and errors.
- **Product Details**: Full-view pages with images and "Add to Cart" button.

## APIs Used

- **LocalStorage API**: Used for persistent storage of products and user data (no external backend). [Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
- **External Image Hosting**: Pinterest and Unsplash for product images (hotlinked URLs). [Pinterest API Docs](https://developers.pinterest.com/docs/redoc/pinterest_api), [Unsplash API Docs](https://unsplash.com/developers).

No real-time APIs or databases; suitable for demo purposes.

## Tech Stack

- **Frontend Framework**: React 18 (with Hooks: useState, useEffect).
- **Routing**: React Router DOM (v6) for SPA navigation.
- **Styling**: Vanilla CSS (no Tailwind/Bootstrap; custom festive gradients and animations).
- **State Management**: React Context/State (local via useState; global via props drilling).
- **Persistence**: Browser localStorage.
- **Build Tool**: Create React App (CRA) for development and bundling.
- **Deployment**: Vercel (serverless, auto-deploys from GitHub).

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install dependencies.

```bash
git clone https://github.com/Nurkamila/Christmas-Shop-Original-.git
cd christmas-shop
npm install
npm start
```

The app opens at `http://localhost:3000`. For production build:
```bash
npm run build
```

Admin Login (for testing CRUD):
- Email: `admin@example.com`
- Password: `admin123`

## Usage

- **Browse Products**: Filter by category, search, sort by price.
- **Shopping Cart**: Add items, adjust quantity, checkout (fake modal).
- **Admin Panel**: `/admin` — add/edit/delete products.
- **Test Features**: Add to cart, edit product, check notifications.

Example usage in browser:
- Navigate to `/` for home.
- `/cart` for shopping cart.
- `/product/1` for product details.

## Known Limitations

- **Persistence**: Relies on localStorage (per-browser, no multi-device sync; data lost on clear cache).
- **Authentication**: Fake modal (no real backend; roles hardcoded in login).
- **Images**: External URLs (Pinterest/Unsplash) — may break if hotlink blocked or images deleted; recommend static assets in `/public/images` for production.
- **Payments/Checkout**: Fake modal (no Stripe/PayPal integration; alert for "success").
- **Scalability**: No real database (Firebase/MongoDB would be next); single-user admin.
- **Accessibility**: Basic ARIA (alt texts); add screen-reader support for production.
- **Performance**: Lazy loading for products; optimize for 1000+ items with virtualization (React Window).
