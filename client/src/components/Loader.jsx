import React from "react";

const Loader = () => (
  <div
    role="status"
    aria-label="Loading..."
    className="flex flex-col justify-center items-center min-h-screen"
  >
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-primary"></div>
    <p className="mt-4 text-gray-600 text-sm">Loading, please wait...</p>
  </div>
);

export default Loader;
