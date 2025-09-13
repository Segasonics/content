// AdminPanelSkeleton.jsx
import React from "react";

const AdminPanelSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8 pt-18 animate-pulse">
      {/* Title */}
      <div className="h-8 w-56 bg-gray-300 dark:bg-gray-700 mx-auto mb-8 rounded" />

      {/* Pending / Rejected Section */}
      <section className="max-w-2xl mx-auto">
        <div className="h-6 w-64 bg-gray-300 dark:bg-gray-700 rounded mb-6" />
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center"
            >
              {/* Left Side */}
              <div className="space-y-2">
                <div className="h-5 w-40 bg-gray-300 dark:bg-gray-700 rounded" />
                <div className="h-3 w-60 bg-gray-200 dark:bg-gray-600 rounded" />
                <div className="h-3 w-24 bg-gray-200 dark:bg-gray-600 rounded" />
              </div>

              {/* Right Side (buttons) */}
              <div className="flex gap-2">
                <div className="h-7 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
                <div className="h-7 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
                <div className="h-7 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Approved Content Section */}
      <section className="max-w-2xl mx-auto mt-10">
        <div className="h-6 w-56 bg-gray-300 dark:bg-gray-700 rounded mb-6" />
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center"
            >
              {/* Left Side */}
              <div className="space-y-2">
                <div className="h-5 w-40 bg-gray-300 dark:bg-gray-700 rounded" />
                <div className="h-3 w-60 bg-gray-200 dark:bg-gray-600 rounded" />
                <div className="h-3 w-32 bg-gray-200 dark:bg-gray-600 rounded" />
              </div>

              {/* Right Side (delete button) */}
              <div className="h-7 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminPanelSkeleton;
