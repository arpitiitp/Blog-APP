import express from 'express';
import 'dotenv/config';

import cors from 'cors';
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import authRouter from './routes/authRoutes.js';

const app = express();
app.use(express.json());
// Connect to the database inside the request handler or at top-level if supported
// For Vercel, it's safer to ensure connection in route handlers or invoke it here but handle async nature
// Since we are using top-level await (available in Node 14+ ESM), this is generally okay, 
// but in Vercel it runs per lambda. The cached logic in db.js handles the re-use.
// Middlewares
const allowedOrigins = [
  'https://blog-app-frontend-zeta-rust.vercel.app',
  'http://localhost:5173',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


// Initialize Database Connection
await connectDB();

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
