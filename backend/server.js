require('dotenv').config();
const express = require('express');
const cors = require('cors');

const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);

// Connect to PostgreSQL and sync database
sequelize.authenticate()
    .then(() => {
        console.log('✅ Connected to PostgreSQL successfully!');
        // Sync models to the database (creates tables if they don't exist)
        // Note: Use { alter: true } during development to update tables without dropping them
        return sequelize.sync({ alter: true });
    })
    .then(() => {
        console.log('✅ Database models synchronized successfully!');
    })
    .catch((err) => {
        console.error('❌ Failed to connect to PostgreSQL:', err);
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
