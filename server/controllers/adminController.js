import jwt from 'jsonwebtoken';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import User from '../models/User.js';

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET);

    // Check if the admin is registered in the database to fetch their real profile name/image
    let adminUser = await User.findOne({ email });
    if (adminUser) {
      res.json({ success: true, token, user: { _id: adminUser._id, name: adminUser.name, email: adminUser.email, role: 'admin', image: adminUser.image } });
    } else {
      res.json({ success: true, token, user: { email, name: "System Admin", role: "admin" } });
    }

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export const getAllBlogsAdmin = async (req, res) => {
  try {
    let query = {};
    if (req.role !== 'admin') {
      query.author = req.userId;
    }
    const blogs = await Blog.find(query).sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export const getAllComments = async (req, res) => {
  try {
    let query = {};
    if (req.role !== 'admin') {
      query.author = req.userId;
    }
    const comments = await Comment.find(query).populate("blog").populate('author', 'name image').sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export const getDashboard = async (req, res) => {
  try {
    let query = {};
    if (req.role !== 'admin') {
      query.author = req.userId;
    }

    const recentBlogs = await Blog.find(query).sort({ createdAt: -1 }).limit(5);
    const blogs = await Blog.countDocuments(query);
    const comments = await Comment.countDocuments(req.role === 'admin' ? {} : { author: req.userId });
    const drafts = await Blog.countDocuments({ ...query, isPublished: false });

    const dashboardData = {
      blogs,
      comments,
      drafts,
      recentBlogs
    };
    res.json({ success: true, dashboardData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndDelete(id);
    res.json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndUpdate(id, { isApproved: true });
    res.json({ success: true, message: "Comment approved successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

