import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast"; // <-- CRITICAL FIX: Added this import

const CommentTableItem = ({ comment, fetchComments }) => {
  const { createdAt } = comment;
  const BlogDate = new Date(createdAt);
  const { axios } = useAppContext();

  const approveComment = async () => {
    try {
      // FIX: Use comment._id instead of _id
      const { data } = await axios.post("/api/admin/approve-comment", {
        id: comment._id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchComments(); // Assuming fetchComments is available in scope and refreshes the list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteComment = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!confirmDelete) return;

    try {
      // FIX: Use comment._id instead of _id
      const { data } = await axios.post("/api/admin/delete-comment", {
        id: comment._id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchComments(); // Assuming fetchComments is available in scope and refreshes the list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr className="border-y border-gray-300">
      <td className="px-6 py-4">
        <b className="font-medium text-gray-600">Blog</b> :{" "}
        {comment.blog?.title} {/* Use optional chaining in case blog is null/undefined */}
        <br />
        <br />
        <b className="font-medium text-gray-600">Name</b> : {comment.name}
        <br />
        <b className="font-medium text-gray-600">Comment</b> : {comment.content}
      </td>

      <td className="px-6 py-4 max-sm:hidden">
        {BlogDate.toLocaleDateString()}
      </td>

      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4">
          {!comment.isApproved ? (
            <img
              onClick={approveComment}
              src={assets.tick_icon}
              className="w-5 hover:scale-110 transition-all cursor-pointer"
              alt="Approve Comment"
            />
          ) : (
            <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
              Approved
            </p>
          )}
          <img
            onClick={deleteComment}
            src={assets.bin_icon}
            alt="Delete Comment"
            className="w-5 hover:scale-110 transition-all cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;