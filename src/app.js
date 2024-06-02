const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes'); // Pastikan jalur ini benar
const db = require('../config/firebase');

require('dotenv').config();

const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
