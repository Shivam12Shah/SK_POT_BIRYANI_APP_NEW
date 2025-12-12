# Backend & CMS Design for SK Pot Biryani App

This document outlines the backend architecture, MongoDB schema, API endpoints, and CMS integration strategy to support the React Native application.

## 1. Technology Stack
- **Database**: MongoDB (Atlas or Self-hosted)
- **Backend**: Node.js + Express.js
- **CMS (Admin Panel)**: React.js (Vite) + TailwindCSS
- **App**: React Native (Existing)

## 2. MongoDB Schema Design

### 2.1 Users Collection (`users`)
Stores customer information.
```javascript
{
  _id: ObjectId,
  phone: String, // Unique, Index
  name: String,
  email: String, // Optional
  createdAt: Date,
  updatedAt: Date
}
```

### 2.2 Addresses Collection (`addresses`)
Stores delivery addresses linked to users.
```javascript
{
  _id: ObjectId,
  userId: ObjectId, // Ref: users
  name: String,
  phone: String,
  addressLine: String,
  city: String,
  state: String,
  pincode: String,
  type: String, // 'Home', 'Work', 'Other'
  isDefault: Boolean
}
```

### 2.3 Products Collection (`products`)
Stores menu items including biryanis, kebabs, etc.
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  image: String, // URL
  category: String, // e.g., 'Biryani', 'Kebab', 'Beverage'
  isVegetarian: Boolean,
  
  // Customization Options
  dips: [
    { name: String, price: Number }
  ],
  beverages: [
    { name: String, price: Number }
  ],
  drinks: [
    { name: String, price: Number }
  ],
  
  nutrition: {
    calories: Number,
    proteins: Number,
    fats: Number,
    carbs: Number,
    sugar: Number
  },
  
  isAvailable: Boolean, // For stock management
  createdAt: Date
}
```

### 2.4 Orders Collection (`orders`)
Stores placed orders.
```javascript
{
  _id: ObjectId,
  orderId: String, // Human readable e.g., 'ORD12345'
  userId: ObjectId, // Ref: users
  items: [
    {
      productId: ObjectId, // Ref: products
      name: String, // Snapshot of name
      price: Number, // Snapshot of price
      quantity: Number,
      customizations: Object // Selected dips/drinks
    }
  ],
  totalAmount: Number,
  status: String, // 'placed', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'
  addressSnapshot: Object, // Full address details at time of order
  paymentMethod: String, // 'cash', 'online'
  createdAt: Date
}
```

### 2.5 Admin Users (`admins`)
For CMS access.
```javascript
{
  _id: ObjectId,
  username: String,
  passwordHash: String,
  role: String // 'admin', 'manager'
}
```

## 3. API Endpoints

### 3.1 Authentication (App)
- `POST /api/auth/login-otp` - Request OTP for phone.
- `POST /api/auth/verify-otp` - Verify OTP and login/register user.

### 3.2 Products (Public)
- `GET /api/products` - List all active products. Support query params for filtering by category.
- `GET /api/products/:id` - Get single product details.

### 3.3 User & Address
- `GET /api/user/profile` - Get user profile.
- `PUT /api/user/profile` - Update profile.
- `GET /api/user/addresses` - Get file addresses.
- `POST /api/user/addresses` - Add address.
- `PUT /api/user/addresses/:id` - Edit address.
- `DELETE /api/user/addresses/:id` - Delete address.

### 3.4 Orders
- `POST /api/orders` - Place a new order.
- `GET /api/orders` - Get user's order history.
- `GET /api/orders/:id` - Get specific order details.

### 3.5 Admin/CMS API (Protected)
- `POST /api/admin/login` - Admin login.
- `GET /api/admin/orders` - View all orders (filter by status).
- `PUT /api/admin/orders/:id/status` - Update order status (e.g., to 'Delivered').
- `POST /api/admin/products` - Add new product.
- `PUT /api/admin/products/:id` - Update existing product.
- `DELETE /api/admin/products/:id` - Remove product.
- `GET /api/admin/dashboard` - Get stats (total active orders, daily revenue).

## 4. CMS (Vite App) Integration

The CMS will be a standalone web application built with **React (Vite)**. It will connect to the same Node.js backend using the Admin APIs.

### Key Features for CMS:
1.  **Dashboard**:
    *   Live Order Feed: Real-time list of new orders (socket.io recommended for real-time updates).
    *   Key Metrics: Total Sales Today, Active Orders count.
2.  **Menu Management**:
    *   Table view of all products.
    *   "Add Product" form with image upload (to AWS S3 or Cloudinary).
    *   Toggle "Availability" switch to quickly hide items out of stock.
3.  **Order Management**:
    *   Kanban or List view of orders.
    *   Click to view details (User info + Items).
    *   Action buttons: "Accept", "Mark Ready", "Mark Delivered".

## 5. Next Steps for Implementation
1.  **Setup Backend**: Initialize Node/Express project, connect to MongoDB.
2.  **Create Models**: Implement Mongoose schemas defined above.
3.  **Build APIs**: Implement the endpoints.
4.  **Connect App**: Replace `dummyData.js` and local Redux actions with API calls (using Axios/Redux-Thunk).
5.  **Build CMS**: Initialize Vite project and build the admin UI.
