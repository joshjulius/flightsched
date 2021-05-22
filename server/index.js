import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import slots from './routes/api/slots.route.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
    .connect(process.env.FLIGHTSCHED_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.use('/api/slots', slots);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));