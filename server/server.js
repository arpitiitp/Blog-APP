import express from 'express';
import 'dotenv/config';

import cors from 'cors';
import connectDB from './configs/db.js'; // Assuming this path is correct based on the image
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import authRouter from './routes/authRoutes.js';

const app = express();
// Connect to the database
await connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send("API is Working"));
app.use('/api/admin', adminRouter)
app.use('/api/blog', blogRouter)
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
  });
}
export default app;