import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { approveNote, deleteNote, fetchallNote, pendingNote, rejectNote } from "../../features/ContentDataSlice/ContentDataSlice";
import { motion } from 'framer-motion'
import AdminPanelSkeleton from "../../components/skeletons/AdminPanelSkeleton";
import { Link } from "react-router-dom";


const Admin = () => {
  const { contents, pendingContent, loading } = useSelector((state) => state.content);
  console.log(contents)
  console.log(pendingContent)
  const dispatch = useDispatch();
  //fetch all pending and rejectedNotes on render
  useEffect(() => {
    dispatch(pendingNote());
    dispatch(fetchallNote())
  }, [dispatch]);

  //function for deleting a note
  const handleDelete = (id) => {
    dispatch(deleteNote(id));
    dispatch(fetchallNote())//refresh notes 
    dispatch(pendingNote())// and pending notes on deletion
  }
  //function for approving the note
  const handleApprove = async (id) => {
    await dispatch(approveNote(id));
    dispatch(pendingNote()); // refresh list after approve
    dispatch(fetchallNote()); // reresh the approve notes
  };
  //function for rejecting the note
  const handleReject = async (id) => {
    await dispatch(rejectNote(id));
    dispatch(pendingNote()); // refresh list after reject
  };

  return (
    <>
      {loading ? <AdminPanelSkeleton /> : (
        <div className="min-h-screen bg-gray-100 p-8 pt-18">
          <h1 className="text-3xl font-bold text-center mb-6">Admin Panel</h1>

          {/* Pending / Rejected */}
          <section className="max-w-2xl mx-auto">
            <div className="flex items-center justify-end gap-3">
              <Link
                to="/group1/add"
                className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg shadow hover:bg-gray-800 transition"
              >
                + Ayesha
              </Link>
              <Link
                to="/group2/add"
                className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg shadow hover:bg-gray-800 transition"
              >
                + Ibrahim
              </Link>
            </div>

            <h2 className="text-xl font-semibold mb-4">Pending / Rejected Content</h2>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}    // smoothly move into place
              transition={{
                duration: 0.8,   // adjust speed
                ease: "easeOut",
              }}
              className="grid gap-4">
              {pendingContent?.map((item) => (
                <div
                  key={item._id}
                  className="bg-white p-4 rounded-lg shadow flex justify-between items-center relative"
                >
                  {/* Watermark */}
                  <span
                    className="absolute top-2 right-2 text-lg font-bold text-green-600 opacity-20 select-none pointer-events-none"
                  >
                    {item.group === "group1" ? "Ayesha" : "Ibrahim"}
                  </span>

                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.content}</p>
                    <p
                      className={`text-sm mt-1 ${item.status === "approved"
                        ? "text-green-600"
                        : item.status === "rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                        }`}
                    >
                      Status: {item.status}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(item._id)}
                      className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
                    >
                      {loading ? 'Approving...' : 'Approve'}
                    </button>
                    <button
                      disabled={loading}
                      onClick={() => handleReject(item._id)}
                      className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          </section>

          {/* Approved Content */}
          <section className="max-w-2xl mx-auto mt-10">
            <h2 className="text-xl font-semibold mb-4">Approved Content</h2>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="grid gap-4"
            >
              {contents?.length === 0 && (
                <p className="text-gray-500 text-center">No approved content yet.</p>
              )}
              {contents?.map((item) => (
                <div
                  key={item._id}
                  className="bg-white p-4 rounded-lg shadow flex justify-between items-center relative"
                >
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm">{item.content}</p>
                    <p className="text-sm mt-1 text-green-600">Status: Approved</p>
                  </div>

                  <button
                    disabled={loading}
                    onClick={() => handleDelete(item._id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                  >
                    {loading ? 'Deleting...' : 'Delete'}
                  </button>

                  {/* Subtle watermark in bottom-right corner */}
                  <span
                    className={`absolute bottom-2 right-2 text-xs font-bold opacity-20 select-none pointer-events-none ${item.group === 'group1' ? 'text-green-600' : 'text-yellow-600'
                      }`}
                  >
                    {item.group === 'group1' ? 'Ayesha' : 'Ibrahim'}
                  </span>
                </div>
              ))}

            </motion.div>
          </section>
        </div>
      )}
    </>
  );
};

export default Admin;

