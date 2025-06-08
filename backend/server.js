import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/tasks.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/tasks',taskRoutes);

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
})
    .then(() => {console.log('Connected to MongoDB successfully')})
    .catch((err) => {console.error('MongoDB connection error: ',err)});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)});