import React, { useState } from "react";
import { blogCategories } from "../assets/assets";
import { motion } from "motion/react"; // Use correct import here!
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext();

  const filteredBlogs = () => {
    if (!blogs) return [];
    if (input === "") return blogs;

    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(input.toLowerCase()) ||
        blog.category.toLowerCase().includes(input.toLowerCase())
    );
  };

  return (
    <div>
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`cursor-pointer text-gray-500 ${menu === item && "text-white px-4 pt-0.5"
                }`}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full"
                />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Horizontal Slider Layout */}
      <div className="flex overflow-x-auto gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40 pb-8 snap-x snap-mandatory hide-scroll">
        {filteredBlogs()
          .filter((blog) => (menu === "All" ? true : blog.category === menu))
          .map((blog) => (
            <div key={blog._id} className="min-w-[300px] sm:min-w-[320px] max-w-[320px] shrink-0 snap-start flex-1">
              <BlogCard blog={blog} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default BlogList;
