# easeKart

Problem Statement
The project aims to solve the problem of creating a comprehensive online marketplace where
multiple sellers can offer their products to customers. It addresses challenges like managing
different user roles (admin, seller, customer), handling product listings, orders, payments, and
integrating AI for product descriptions.
System Architecture
● Frontend: Next.js (with React.js and React Router for page navigation)
● Backend: Node.js + Express
● Database: MySQL (using Aiven for deployment of MySQL database)
● Authentication: JWT-based login/signup , Google Authentication
● ● Hosting:
○ Frontend: Vercel : https://ease-kart.vercel.app
○ Backend: Vercel :  https://ease-kart-ddr9.vercel.app
○ Database: Aiven Deployment
Image Storage and Optimization: ImageKit
Key Features
● Authentication & Authorization: User registration, login (including Google login), logout,
role-based access (admin, seller, customer).
● CRUD Operations: Create, read, update, delete products, manage orders, manage stores,
create coupons.
● Frontend Routing:
○ Customer: Homepage, Shop page, Product Details page, Cart page, My Orders
page, User Profile.
○ Seller: Seller Dashboard, Add Product, Manage Product, Orders page.
○ Admin: Admin Dashboard, Stores (active and pending approval), Coupons.
Implemented pagination in backend and displaying products dynamically in frontend by fetching
data from backend.
Implemented pesonalised cart for authenticated users and storing each cart item in backend
with users personal id.
Filtered products using category and rendering it via user request.
● AI Integration: Automatic product name and description generation using Google Gemini
API when uploading a product image.
● Multi-Vendor Functionality: Multiple sellers can create and manage their stores, list
products, and view orders.
● Payment Gateway Integration: Stripe for online payments .
● Order Management: Customers can place orders, choose delivery addresses, apply coupon
codes. Sellers can view and manage their orders. Admin can manage stores and coupons.
● Image Management: ImageKit for storing and optimizing product and store images .
Tech Stack
● Frontend: Next.js, React.js, React Router, Axios, TailwindCSS/Bootstrap (TailwindCSS
is likely used based on modern Next.js projects)
● Backend: Node.js, Express.js
● Database: PostgreSQL (Neon)
● Authentication: JWT (implied by template, Google login shown in video)
● AI: Google Gemini API
● Hosting: Vercel (for frontend), Render/Railway (for backend, mentioned in template)
● Other: ImageKit (for image storage and optimization), Ingest (for event
processing/functions)
API Overview (Sample Endpoints)
Endpoint Method Description Access
/api/auth/signup POST Register new user Public
/api/auth/login POST Authenticate user Public
/api/products GET Get all products Authenticated
/api/products POST Add new product (with AI) Seller
/api/products/:id PUT Update product Seller
/api/products/:id DELET Delete product Seller
E
/api/orders GET Get all orders Authenticated
(customer/seller)
/api/orders POST Place new order Authenticated
/api/stores GET Get active stores Admin
/api/admin/stores/approve
PUT Approve pending store Admin
/:id
/api/coupons POST Create new coupon Admin
