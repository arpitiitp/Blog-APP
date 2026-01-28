# Blog-APP

A full-stack Blog Application built with the MERN stack (MongoDB, Express, React, Node.js). Features a modern UI, authentication (including Google OAuth), admin dashboard, image uploads, and AI integration.

## 🚀 Features

*   **Public Interface**:
    *   View all blogs.
    *   Read individual blog posts.
    *   Responsive design for mobile and desktop.
*   **Authentication**:
    *   Admin Login (Email/Password).
    *   **Google OAuth Login** for users/admins.
    *   JWT-based session management.
*   **Admin Dashboard**:
    *   Complete CMS (Content Management System).
    *   Create, Edit, Delete Blogs.
    *   Rich Text Editor (Quill.js) for writing blogs.
    *   Image Uploads via **ImageKit**.
    *   Manage Comments (Approve/Delete).
    *   View Dashboard Statistics (Total Blogs, Comments, etc.).
*   **AI Integration**:
    *   Powered by **Google Gemini** (for content assistance/generation).

## 🛠️ Tech Stack

*   **Frontend**: React.js (Vite), Tailwind CSS, React Router DOM, React Hot Toast.
*   **Backend**: Node.js, Express.js.
*   **Database**: MongoDB (Mongoose ODM).
*   **Services**:
    *   **ImageKit**: For image storage and optimization.
    *   **Google Auth**: For OAuth 2.0 login.
    *   **Google Gemini API**: For AI features.

## ⚙️ Installation & Setup

### Prerequisites

*   Node.js installed.
*   MongoDB Atlas account (or local MongoDB).
*   Google Cloud Console Project (for OAuth & Gemini).
*   ImageKit Account.

### 1. Clone the Repository

```bash
git clone <repository_url>
cd Blog-app/Quick_Blog
```

### 2. Backend Setup (Server)

Navigate to the server folder and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=3000

# Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/quickblog?appName=Cluster0

# Authentication
JWT_SECRET=your_super_secret_key_here
GOOGLE_CLIENT_ID=your-google-client-id-from-cloud-console

# Admin Credentials (for manual email login)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password

# Image Hosting (ImageKit)
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id

# AI (Google Gemini)
GEMIINI_API_KEY=your_gemini_api_key
```
*(Note: Ensure `GEMIINI_API_KEY` matches the spelling in the code).*

**Start the Server:**

```bash
npm run server
```

### 3. Frontend Setup (Client)

Open a **new terminal**, navigate to the client folder:

```bash
cd ../client
npm install
```

Create a `.env` file in the `client` directory:

```env
VITE_BASE_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=your-google-client-id-from-cloud-console
```

**Start the Client:**

```bash
npm run dev
```

Visit `http://localhost:5173` to view the app!



---
Developed with ❤️ using MERN Stack.
