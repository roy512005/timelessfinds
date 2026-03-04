# Timeless Finds - PostgreSQL Full-Stack Restructure V2

## 1. Full Folder Structure
```text
pro 2/
├── backend/                  # NEW: Express.js + Sequelize Backend
│   ├── config/
│   │   └── db.js             # PostgreSQL connection with Sequelize
│   ├── controllers/
│   │   ├── authController.js # JWT Auth & Login logic
│   │   ├── productController.js # Product fetching operations
│   │   ├── reservationController.js 
│   │   └── orderController.js
│   ├── models/
│   │   ├── index.js          # Associations (HasMany/BelongsTo)
│   │   ├── User.js           # Sequelize UUID PK Schema
│   │   ├── Product.js        # Postgres Arrays/JSON storage
│   │   ├── Reservation.js    
│   │   └── Order.js          
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── productRoutes.js
│   ├── .env                  # Backend connection keys
│   ├── package.json
│   ├── seeder.js             # Bootstrapper for 20 luxury items
│   └── server.js             # Express app entry point
├── src/                      # EXISTING: React frontend UI
│   ├── components/
│   │   └── Navbar.tsx        # Fully animated database search
│   ├── pages/
│   │   ├── Home.tsx          # Dynamic Top 3 Showcase
│   │   ├── Shop.tsx          # Dynamic URL search filtering
│   │   └── ProductDetail.tsx # "Reserve This Piece" flow -> WA
│   ├── App.tsx
│   └── main.tsx
├── package.json              # Includes `npm run dev:all` & `npm run seed`
└── vite.config.ts            # Proxy traffic to Port 5001
```

## 2. PostgreSQL Database Schema
Data integrity is now heavily maintained within PostgreSQL.

**Users Table**:
`id` (UUID V4), `name`, `email` (unique), `password` (hashed), `phone`, `address`, `role` (enum: user, admin), `createdAt`, `updatedAt`

**Products Table**:
`id` (UUID V4), `title`, `price` (Decimal), `short_description`, `story_description`, `category`, `era`, `condition`, `authenticity_note`, `images` (ARRAY of Strings), `status` (enum: available, reserved, sold), `createdAt`, `updatedAt`

**Reservations Table**:
`id` (UUID V4), `userId` (Foreign Key - User), `productId` (Foreign Key - Product), `status` (enum: pending, confirmed, cancelled), `expires_at`, `createdAt`, `updatedAt`

**Orders Table**:
`id` (UUID V4), `userId`, `productId`, `payment_status` (Razorpay future-proofing), `shipping_status`, `createdAt`

## 3. API Routes Overview

**Auth Routes (`/api/auth`)**
- `POST /register`: Generate UUID & token
- `POST /login`: JWT Auth login
- (Google OAuth to be securely bridged with Passport.js strategy later)

**Product Routes (`/api/products`)**
- `GET /`: List all 20+ products (uses Sequelize `[Op.iLike]` operator for case-insensitive robust searching)
- `GET /:id`: Load single view

**Reservation Routes (`/api/reservations`)**
- `POST /`: Secures product for 24h & automatically issues WhatsApp redirect.

## 4. Deployment Instructions

1. **Provision PostgreSQL**:
   Setup a fully managed PostgreSQL database from Neon.tech, Supabase, or AWS RDS.
   Obtain your Connection URI string.
   **Format**: `postgresql://username:password@hostname:5432/database`

2. **Configure Environment Variables**:
   In `backend/.env`, replace the target `DATABASE_URL`:
   ```env
   DATABASE_URL="your_new_postgres_connection_string"
   PORT=5001
   JWT_SECRET="supersafekey"
   ```

3. **Populate Database (Seeder Tool)**:
   The application now includes exactly **20 elite items** prepared.
   To generate tables and import the data:
   ```bash
   npm run seed
   ```

4. **Launch Development**:
   AirPlay conflicts are bypassed by routing traffic internally to port 5001 safely.
   ```bash
   npm run dev:all
   ```

5. **Future Payment Architecture**:
   The Sequelize `Order` model maps inherently perfectly to Razorpay's object lifecycle so transitioning an item from Reservation Lock to `payment_status: paid` inside PostgreSQL happens cleanly.
