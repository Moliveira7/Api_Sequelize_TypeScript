import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { router } from './routes';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Routes setup
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});