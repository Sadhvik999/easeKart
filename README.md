# 🛒 EaseKart – Multi-Vendor E-Commerce Platform

## 📌 Problem Statement
EaseKart aims to create a **comprehensive online marketplace** where multiple sellers can list their products and customers can shop seamlessly.  
The system solves challenges such as:

- Handling multiple user roles (**Admin, Seller, Customer**)  
- Managing product listings, orders, payments  
- AI-powered product description generation  
- Efficient image management and optimized hosting  
- Secure authentication with email/JWT + Google login

---

## 🏗️ System Architecture

### **Frontend**
- Next.js  
- React.js  
- React Router (client-side routing)

### **Backend**
- Node.js  
- Express.js  

### **Database**
- MySQL (Aiven Deployment)

### **Authentication**
- JWT-based login & signup  
- Google Authentication  

### **Hosting**
- **Frontend**: Vercel  
  👉 https://ease-kart.vercel.app  
- **Backend**: Vercel  
  👉 https://ease-kart-ddr9.vercel.app  
- **Database**: Aiven MySQL  

### **Image Storage & Optimization**
- ImageKit

---

## ⭐ Key Features

### 🔐 **Authentication & Authorization**
- User signup/login
- Google login
- Logout
- Role-based access (**Admin**, **Seller**, **Customer**)

---

### 🛍️ **Product & Store Management**
- Full CRUD for:
  - Products  
  - Stores  
  - Orders  
  - Coupons  
- Multi-vendor support:
  - Multiple sellers manage their own stores
  - Sellers can view/track their orders

---

### 📄 **Frontend Routing**

#### **Customer**
- Homepage  
- Shop Page  
- Product Details  
- Cart  
- My Orders  
- Profile  

#### **Seller**
- Seller Dashboard  
- Add Product  
- Manage Products  
- Orders Page  

#### **Admin**
- Admin Dashboard  
- Store Management (active + pending approval)  
- Coupon Management  

---

### 🔄 **Pagination & Dynamic Rendering**
- Backend pagination for products
- Dynamic frontend rendering using API calls
- Category-based product filtering  
- Personalized carts stored in backend with user ID

---

### 🤖 **AI Integration**
- AI-generated **product name & description**
- Powered by **Google Gemini API**
- Triggered automatically when uploading product image

---

### 💳 **Payment Gateway**
- **Stripe** integration for secure online payments

---

### 📦 **Order Management**
- Customers:
  - Place orders  
  - Add delivery address  
  - Apply coupon codes  
- Sellers:
  - View/manage orders for their store  
- Admin:
  - Approve stores  
  - Manage coupons  

---

### 🖼️ **Image Management**
- ImageKit for:
  - Storing product/store images  
  - Optimizing, resizing, CDN delivery  

---

## 🧰 Tech Stack

### **Frontend**
- Next.js  
- React.js  
- React Router  
- Axios  
- TailwindCSS / Bootstrap  

### **Backend**
- Node.js  
- Express.js  

### **Database**
- PostgreSQL (Neon) *(mentioned in template)*  
- MySQL (Aiven) *(actual project deployment)*  

### **Authentication**
- JWT  
- Google OAuth  

### **AI**
- Google Gemini API  

### **Hosting**
- Vercel (frontend)  
- Vercel / Render / Railway (backend)  

### **Other Tools**
- ImageKit (image optimization)  
- Ingest (for event processing)

---

## 🧪 API Overview (Sample Endpoints)

### **Auth**
| Endpoint | Method | Description | Access |
|---------|--------|-------------|--------|
| `/api/auth/signup` | POST | Register new user | Public |
| `/api/auth/login` | POST | Login user | Public |

---

### **Products**
| Endpoint | Method | Description | Access |
|---------|--------|-------------|--------|
| `/api/products` | GET | Get all products | Authenticated |
| `/api/products` | POST | Add new product (AI-enhanced) | Seller |
| `/api/products/:id` | PUT | Update product | Seller |
| `/api/products/:id` | DELETE | Delete product | Seller |

---

### **Orders**
| Endpoint | Method | Description | Access |
|---------|--------|-------------|--------|
| `/api/orders` | GET | Get all orders | Customer/Seller |
| `/api/orders` | POST | Place new order | Authenticated |

---

### **Stores (Admin)**
| Endpoint | Method | Description | Access |
|---------|--------|-------------|--------|
| `/api/stores` | GET | Get active stores | Admin |
| `/api/admin/stores/approve/:id` | PUT | Approve store | Admin |

---

### **Coupons**
| Endpoint | Method | Description | Access |
|---------|--------|-------------|--------|
| `/api/coupons` | POST | Create coupon | Admin |

---

## 📄 End of Documentation
