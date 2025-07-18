const express = require('express');
const app = express();

require('dotenv').config();
require('./db');

const cors = require('cors');

app.use(express.json()); // Modern alternative to body-parser
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
const PORT = process.env.PORT || 5000;

const userRoutes = require('./routes/userRoute');
app.use('/', userRoutes);

const electionRoutes = require('./routes/electionRoutes');
app.use('/election', electionRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
