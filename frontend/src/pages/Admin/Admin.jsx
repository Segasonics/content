import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { approveNote, deleteNote, fetchallNote, pendingNote, rejectNote } from "../../features/ContentDataSlice/ContentDataSlice";



const Admin = () => {
  const pendingNotes = useSelector((state) => state.content?.pendingContent);
  const approvedNotes = useSelector((state) => state.content?.contents);
  console.log(approvedNotes)
  console.log(pendingNotes)
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
    <div className="min-h-screen bg-gray-100 p-8 pt-18">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Panel</h1>

      {/* Pending / Rejected */}
      <section className="max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Pending / Rejected Content</h2>
        <div className="grid gap-4">
          {pendingNotes?.length === 0 && (
            <p className="text-gray-500 text-center">No pending or rejected content.</p>
          )}
          {pendingNotes?.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
            >
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
                  Approve
                </button>
                <button
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
        </div>
      </section>

      {/* Approved Content */}
      <section className="max-w-2xl mx-auto mt-10">
        <h2 className="text-xl font-semibold mb-4">Approved Content</h2>
        <div className="grid gap-4">
          {approvedNotes?.length === 0 && (
            <p className="text-gray-500 text-center">No approved content yet.</p>
          )}
          {approvedNotes?.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm">{item.content}</p>
                <p className="text-sm mt-1 text-green-600">Status: Approved</p>
              </div>
              <button
                onClick={() => handleDelete(item._id)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Admin;

