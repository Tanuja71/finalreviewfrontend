# Tribal Craft Marketplace Frontend

## Run locally
1. npm install
2. copy `.env.example` to `.env`
3. set `VITE_API_URL=http://localhost:8080/api`
4. npm run dev

## Expected backend endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET /api/products
- GET /api/products/{id}
- GET /api/products/search/{keyword}
- GET /api/products/artisan/{artisanId}
- POST /api/products/artisan/{artisanId}
- DELETE /api/products/{id}
- GET /api/reviews/product/{productId}
- POST /api/cart/add?customerId=&productId=&quantity=&customizationText=
- GET /api/cart/{customerId}
- DELETE /api/cart/{cartItemId}
- POST /api/orders/place/{customerId}
- GET /api/orders/customer/{customerId}

## Important note
The uploaded backend zip is incomplete. It includes controllers that reference missing classes such as Product, Review, User, Role, services, repositories, JWT classes, and application properties. The backend must be completed before this frontend can work end-to-end.
