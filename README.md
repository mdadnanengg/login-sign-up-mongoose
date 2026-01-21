# E-Commerce API with Authentication

A complete e-commerce REST API built with Node.js, Express, MongoDB, JWT authentication, and bcrypt password hashing.

## 🚀 Features

### Authentication & Security
- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Password Hashing** - Bcrypt for secure password storage
- ✅ **User Registration & Login** - Complete auth flow
- ✅ **Role-Based Access** - Admin and user roles
- ✅ **Protected Routes** - Middleware for route protection

### Product Management
- ✅ **CRUD Operations** - Create, Read, Update, Delete products
- ✅ **Pagination** - Efficient product listing
- ✅ **Search** - Text search across products
- ✅ **Filters** - Category, price range, stock availability
- ✅ **Sorting** - Sort by price, date, rating, etc.

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd login-sign-up-mongoose

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start the server
npm run dev
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=8000
MongoDB_URL=mongodb://0.0.0.0:27017/ecommerceDB
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

## 📚 API Documentation

### Base URL
```
http://localhost:8000/api
```

---

## 🔐 Authentication Endpoints

### 1. Register User
**POST** `/api/auth/register`

**cURL Example:**
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "mobileNumber": "1234567890",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "mobileNumber": "1234567890",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### 2. Login User
**POST** `/api/auth/login`

**cURL Example:**
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "password123"
  }'
```

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### 3. Get User Profile
**GET** `/api/auth/profile`

**cURL Example:**
```bash
curl http://localhost:8000/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "username": "johndoe",
    "email": "john@example.com",
    "mobileNumber": "1234567890",
    "role": "user"
  }
}
```

---

## 📦 Product Endpoints

### 1. List Products (Public)
**GET** `/api/products`

**Query Parameters:**
- `page` (default: 1) - Page number
- `limit` (default: 10) - Items per page
- `search` - Search term for name/description/category
- `category` - Filter by category
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `inStock` - true/false for stock availability
- `sortBy` - Field to sort by (createdAt, price, name, rating)
- `sortOrder` - asc/desc

**cURL Examples:**
```bash
# Basic list
curl http://localhost:8000/api/products

# With pagination
curl http://localhost:8000/api/products?page=1&limit=10

# With search
curl http://localhost:8000/api/products?search=laptop

# With filters and sorting
curl "http://localhost:8000/api/products?page=1&limit=10&category=Electronics&minPrice=100&maxPrice=1000&sortBy=price&sortOrder=asc"
```

**Response:**
```json
{
  "success": true,
  "products": [
    {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "name": "Laptop",
      "description": "High-performance laptop",
      "price": 999,
      "category": "Electronics",
      "brand": "TechBrand",
      "stock": 50,
      "rating": 4.5,
      "numReviews": 120,
      "images": ["url1", "url2"],
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalProducts": 50,
    "productsPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### 2. Get Product Details (Public)
**GET** `/api/products/:id`

**cURL Example:**
```bash
curl http://localhost:8000/api/products/60f7b3b3b3b3b3b3b3b3b3b3
```

**Response:**
```json
{
  "success": true,
  "product": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 999,
    "category": "Electronics",
    "brand": "TechBrand",
    "stock": 50,
    "rating": 4.5,
    "numReviews": 120,
    "images": ["url1", "url2"],
    "createdBy": {
      "username": "admin",
      "email": "admin@example.com"
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 3. Get All Categories (Public)
**GET** `/api/products/categories`

**cURL Example:**
```bash
curl http://localhost:8000/api/products/categories
```

**Response:**
```json
{
  "success": true,
  "categories": [
    "Electronics",
    "Clothing",
    "Books",
    "Home & Garden"
  ]
}
```

### 4. Create Product (Admin Only)
**POST** `/api/products`

**cURL Example:**
```bash
curl -X POST http://localhost:8000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN_HERE" \
  -d '{
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 999,
    "category": "Electronics",
    "brand": "TechBrand",
    "stock": 50,
    "images": ["url1", "url2"]
  }'
```

**Headers:**
```
Authorization: Bearer <admin-jwt-token>
```

**Request Body:**
```json
{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 999,
  "category": "Electronics",
  "brand": "TechBrand",
  "stock": 50,
  "images": ["url1", "url2"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Product created successfully",
  "product": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 999,
    "category": "Electronics",
    "brand": "TechBrand",
    "stock": 50,
    "images": ["url1", "url2"],
    "createdBy": "60f7b3b3b3b3b3b3b3b3b3b3",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 5. Update Product (Admin Only)
**PUT** `/api/products/:id`

**cURL Example:**
```bash
curl -X PUT http://localhost:8000/api/products/60f7b3b3b3b3b3b3b3b3b3b3 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN_HERE" \
  -d '{
    "price": 899,
    "stock": 45
  }'
```

**Headers:**
```
Authorization: Bearer <admin-jwt-token>
```

**Request Body:**
```json
{
  "price": 899,
  "stock": 45
}
```

**Response:**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "product": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "name": "Laptop",
    "price": 899,
    "stock": 45,
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

### 6. Delete Product (Admin Only)
**DELETE** `/api/products/:id`

**cURL Example:**
```bash
curl -X DELETE http://localhost:8000/api/products/60f7b3b3b3b3b3b3b3b3b3b3 \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN_HERE"
```

**Headers:**
```
Authorization: Bearer <admin-jwt-token>
```

**Response:**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

## 🔒 Authentication Flow

1. **Register** - Create a new user account
2. **Login** - Get JWT token
3. **Use Token** - Include token in Authorization header for protected routes
   ```
   Authorization: Bearer <your-jwt-token>
   ```
4. **Token Expires** - After 7 days, login again to get a new token

---

## 🛡️ Security Features

- ✅ Passwords hashed with **bcrypt** (10 salt rounds)
- ✅ JWT tokens with 7-day expiration
- ✅ Protected routes with authentication middleware
- ✅ Role-based access control (admin/user)
- ✅ Input validation on all endpoints

---

## 📝 Models

### User Model
```javascript
{
  username: String (unique, required),
  email: String (unique, required),
  mobileNumber: String (required),
  password: String (hashed, required),
  role: String (enum: ['user', 'admin'], default: 'user'),
  timestamps: true
}
```

### Product Model
```javascript
{
  name: String (required),
  description: String (required),
  price: Number (required, min: 0),
  category: String (required),
  brand: String,
  stock: Number (default: 0),
  images: [String],
  rating: Number (0-5),
  numReviews: Number,
  isActive: Boolean (default: true),
  createdBy: ObjectId (ref: User),
  timestamps: true
}
```

---

## 🧪 Testing with Postman/Thunder Client

### Create Admin User (Manual - One Time Setup)
Since the first user needs to be an admin, you can either:

1. Register a user normally, then update their role in MongoDB:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

2. Or modify the User model temporarily to set default role as 'admin'

---

## 📁 Project Structure

```
login-sign-up-mongoose/
├── controllers/
│   ├── authController.js        # Auth logic (signup, login, profile)
│   ├── productController.js     # Product CRUD operations
│   └── loginController.js       # Old controller (backward compatibility)
├── middleware/
│   └── auth.js                  # JWT verification & admin check
├── models/
│   ├── User.js                  # User model with bcrypt
│   └── Product.js               # Product model
├── routes/
│   ├── authRoutes.js            # Auth endpoints
│   ├── productRoutes.js         # Product endpoints
│   └── loginRoutes.js           # Old routes (backward compatibility)
├── views/                       # HTML files (old implementation)
├── index.js                     # Main server file
├── package.json
└── .env
```

---

## 🚀 Next Steps / Future Enhancements

- [ ] Add order management
- [ ] Implement shopping cart
- [ ] Add payment integration
- [ ] Product reviews and ratings
- [ ] Image upload functionality
- [ ] Email verification
- [ ] Password reset
- [ ] Wishlist functionality
- [ ] Admin dashboard

---

## 📞 Support

For issues or questions, please create an issue in the repository.

---

## 📄 License

MIT License
