# API Module

A centralized API module for making HTTP requests in the React Native app.

## Structure

```
src/api/
├── config.js      # API configuration (base URL, endpoints)
├── client.js      # HTTP client with interceptors
├── services.js    # High-level service methods
└── index.js       # Module exports
```

## Usage

### 1. Basic API Call

```javascript
import { productService } from '../api';

// Get all products
const fetchProducts = async () => {
  try {
    const products = await productService.getAll();
    console.log('Products:', products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};
```

### 2. With Authentication

```javascript
import { apiClient, authService } from '../api';

// Login and set token
const login = async (email, password) => {
  try {
    const response = await authService.login(email, password);
    
    // Set token for future requests
    apiClient.setAuthToken(response.token);
    
    return response;
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Logout and clear token
const logout = async () => {
  await authService.logout();
  apiClient.clearAuthToken();
};
```

### 3. Custom API Call

```javascript
import { apiClient } from '../api';

// Custom GET request
const customGet = async () => {
  const data = await apiClient.get('/custom/endpoint', { param: 'value' });
  return data;
};

// Custom POST request
const customPost = async () => {
  const data = await apiClient.post('/custom/endpoint', {
    name: 'John',
    email: 'john@example.com',
  });
  return data;
};
```

### 4. Using in Redux Actions

```javascript
import { productService } from '../api';

export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: 'PRODUCTS_LOADING' });
  
  try {
    const products = await productService.getAll();
    dispatch({ type: 'PRODUCTS_SUCCESS', payload: products });
  } catch (error) {
    dispatch({ type: 'PRODUCTS_ERROR', payload: error.message });
  }
};
```

## Available Services

### Auth Service
- `authService.login(email, password)`
- `authService.register(userData)`
- `authService.logout()`
- `authService.refreshToken(refreshToken)`

### User Service
- `userService.getProfile()`
- `userService.updateProfile(profileData)`

### Product Service
- `productService.getAll(params)`
- `productService.getById(id)`
- `productService.search(query, filters)`

### Cart Service
- `cartService.getCart()`
- `cartService.addToCart(productId, quantity)`
- `cartService.updateCartItem(itemId, quantity)`
- `cartService.removeFromCart(itemId)`

### Order Service
- `orderService.getAll(params)`
- `orderService.getById(orderId)`
- `orderService.create(orderData)`
- `orderService.trackOrder(orderId)`

### Address Service
- `addressService.getAll()`
- `addressService.getById(addressId)`
- `addressService.create(addressData)`
- `addressService.update(addressId, addressData)`
- `addressService.delete(addressId)`

### Location Service
- `locationService.geocode(address)`
- `locationService.reverseGeocode(latitude, longitude)`

## Configuration

Update the base URL in `config.js`:

```javascript
export const API_BASE_URL = __DEV__
  ? 'http://localhost:3000/api'  // Your dev server
  : 'https://api.yourapp.com/api'; // Your production server
```

## Error Handling

All API calls return errors in a consistent format:

```javascript
{
  success: false,
  error: 'Error message',
  status: 404,  // HTTP status code (if available)
  data: {}      // Additional error data
}
```

## Features

- ✅ Centralized configuration
- ✅ Authentication token management
- ✅ Request/response interceptors
- ✅ Error handling
- ✅ Request timeout
- ✅ Logging
- ✅ Type-safe endpoints
- ✅ Reusable service methods
