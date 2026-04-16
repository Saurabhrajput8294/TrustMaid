# TrustMaid

A modern MERN stack web application for booking verified maids for household services.

## Features

- User registration and login
- Maid registration and verification
- Search and book maids
- Booking management
- Admin panel for managing users, maids, and bookings
- Responsive UI with Tailwind CSS

## Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express.js, MySQL, Sequelize, JWT, Bcrypt
- **Deployment:** Ready for Netlify (frontend) and Render (backend)

## Project Structure

```
trustmaid/
├── server/          # Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
├── client/          # Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── services/
│   └── App.jsx
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MySQL (local or cloud like PlanetScale)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory. You can copy the provided example file:
   ```bash
   cp .env.example .env
   ```

   Then update the values with your local settings:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=trustmaid
   JWT_SECRET=your_jwt_secret_here
   PORT=5000
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   EMAIL_FROM="TrustMaid <your_email@example.com>"
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

   For MySQL, ensure you have a database named `trustmaid` created.

   Note: All professionals share the same outgoing SMTP sender configured above. The app will set `Reply-To` to the maid's email so client replies go to the correct professional.

4. Start the development server:
   ```bash
   npm run dev
   ```

   The backend will run on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:3000`.

## API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/profile` - Get user profile

### Maids
- `GET /api/maids` - Get all maids
- `POST /api/maids/register` - Register as maid
- `PUT /api/maids/availability` - Update availability

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/user` - Get user bookings
- `GET /api/bookings/maid` - Get maid bookings
- `PUT /api/bookings/:id/status` - Update booking status

### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/maids` - Get all maids
- `GET /api/admin/bookings` - Get all bookings

## Deployment

### Backend (Render)
1. Push the server code to a Git repository.
2. Connect the repository to Render.
3. Set environment variables in Render dashboard.
4. Deploy.

### Frontend (Netlify)
1. Build the frontend: `npm run build`
2. Push the client code to a Git repository.
3. Connect the repository to Netlify.
4. Set build command to `npm run build` and publish directory to `dist`.
5. Deploy.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.