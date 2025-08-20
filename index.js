import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/dbConfig.js';
import userRoutes from './routes/userRoutes.js';
import allowanceRequestRoutes from './routes/allowanceRequestRoutes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/allowance-requests', allowanceRequestRoutes);

app.get('/', (req, res) => {
  res.json({ 
    message: 'Employee Travel Allowance System API',
    status: 'Running'
  });
});

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});