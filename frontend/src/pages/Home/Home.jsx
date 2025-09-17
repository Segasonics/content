import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Link } from "react-router-dom";

const Home = () => {
  const sections = [
    { name: "Group1", qrPath: "/group1/add", linkPath: "/content/group1" },
    { name: "Group2", qrPath: "/group2/add", linkPath: "/content/group2" },
  ];

  return (
    <div className="flex flex-col items-center gap-6 justify-center min-h-screen px-4 pt-16">
      <h1 className="text-3xl font-bold mb-6 text-center">Choose a Group</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {sections.map((section) => (
          <div
            key={section.name}
            className="flex flex-col items-center gap-4 bg-white shadow-md p-6 rounded-xl"
          >
            <h2 className="font-semibold text-lg">{section.name}</h2>
            {/* Link to view content */}
            <Link
              to={section.linkPath}
              className="mt-3 px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              Go to {section.name} Content
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
