import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Navbar from "../components/Navbar";
import Moment from "moment";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Blog = () => {
  const { id } = useParams();
  const { axios } = useAppContext();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState(""); // Correctly declared 'name'
  const [content, setContent] = useState(""); // Correctly declared 'content'

  // Fetch blog by ID
  const fetchBlogData = async () => {
    try {
      const { data: blogData } = await axios.get(`/api/blog/${id}`); // Renamed 'data' to 'blogData' to avoid conflict
      blogData.success ? setData(blogData.blog) : toast.error(blogData.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const { data: commentsData } = await axios.post("/api/blog/comments", { blogId: id }); // Renamed 'data' to 'commentsData'
      if (commentsData.success) {
        setComments(commentsData.comments);
      } else {
        toast.error(commentsData.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data: addCommentData } = await axios.post("/api/blog/add-comment", { // Renamed 'data' to 'addCommentData'
        blog: id,
        name, // Use 'name' from state
        content, // Use 'content' from state
      });
      if (addCommentData.success) {
        toast.success(addCommentData.message);
        setName(""); // Reset 'name'
        setContent(""); // Reset 'content'
        fetchComments(); // Re-fetch comments to show the new one
      } else {
        toast.error(addCommentData.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, [id]); // Dependency array: re-run when 'id' changes

  if (!data) return <Loader />; // Show loader while blog data is fetching

  return (
    <div className="relative">
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-1 opacity-50"
      />
      <Navbar />

      {/* Blog Header */}
      <div className="text-center mt-20 text-gray-600">
        <p className="text-primary py-4 font-medium">
          Published on {Moment(data.createdAt).format("MMMM Do YYYY")}
        </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto">
          {data.title}
        </h1>
        <h2 className="my-5 max-w-lg truncate mx-auto">{data.subTitle}</h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">
          Michael Brown
        </p>
      </div>

      {/* Blog Content */}
      <div className="mx-5 md:mx-auto max-w-5xl my-10">
        <img src={data.image} alt="" className="rounded-3xl mb-5" />
        <div
          className="rich-text max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
      </div>

      {/* Comments Section */}
      <div className="mx-5 md:mx-auto max-w-3xl mt-14 mb-10">
        <p className="font-semibold mb-4">Comments: {comments.length}</p>
        <div className="flex flex-col gap-4">
          {comments.length > 0 ? (
            comments.map((item, idx) => (
              <div
                key={idx} // Using index as key is okay if items don't change order/get added/removed frequently
                className="bg-primary/2 border border-primary/5 p-4 rounded text-gray-600"
              >
                <div className="flex items-center gap-2 mb-2">
                  <img src={assets.user_icon} alt="" className="w-6" />
                  <p className="font-medium">{item.name}</p>
                </div>
                <div className="ml-8 grid grid-cols-[1fr_auto] gap-4 text-sm">
                  <p>{item.content}</p>
                  <span className="whitespace-nowrap text-xs text-gray-500">
                    {Moment(item.createdAt).fromNow()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>

      {/* Add Comment Form */}
      <div className="max-w-3xl mx-auto mb-20">
        <p className="font-semibold mb-4">Add your comment</p>
        <form
          onSubmit={addComment}
          className="flex flex-col items-start gap-4 max-w-lg"
        >
          <input
            type="text"
            placeholder="Name"
            required
            value={name} // Corrected: use 'name' state
            onChange={(e) => setName(e.target.value)} // Corrected: update 'name' state
            className="w-full p-2 border border-gray-300 rounded outline-none"
          />
          <textarea
            placeholder="Comment"
            required
            value={content} // Corrected: use 'content' state
            onChange={(e) => setContent(e.target.value)} // Corrected: update 'content' state
            className="w-full p-2 border border-gray-300 rounded outline-none h-48"
          />
          <button
            type="submit"
            className="bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer"
          >
            Submit
          </button>
        </form>

        {/* Share Buttons */}
        <div className="my-24 max-w-3xl mx-auto">
          <p className="font-semibold my-4">Share this blog on social media</p>
          <div className="flex gap-4">
            <img src={assets.facebook_icon} width={50} alt="Facebook" />
            <img src={assets.twitter_icon} width={50} alt="Twitter" />
            <img src={assets.googleplus_icon} width={50} alt="Google Plus" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;