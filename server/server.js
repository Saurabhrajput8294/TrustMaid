const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/maids', require('./routes/maidRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));