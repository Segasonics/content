import React from "react";

const ApprovedContentSkeleton = () => {
  return (
    <div className=" bg-gray-100 p-2 animate-pulse">
      {/* Approved Content Section */}
      <section className="max-w-2xl mx-auto mt-10">
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

export default ApprovedContentSkeleton;
