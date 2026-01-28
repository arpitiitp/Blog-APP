import express from 'express';
import 'dotenv/config';

import cors from 'cors';
import connectDB from './configs/db.js'; // Assuming this path is correct based on the image
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import authRouter from './routes/authRoutes.js';

const app = express();
// Connect to the database inside the request handler or at top-level if supported
// For Vercel, it's safer to ensure connection in route handlers or invoke it here but handle async nature
// Since we are using top-level await (available in Node 14+ ESM), this is generally okay, 
// but in Vercel it runs per lambda. The cached logic in db.js handles the re-use.
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