import React, { useState } from "react";
import { RetroGrid } from "../../components/magicui/retro-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  createNote,
  generateContent,
} from "../../features/ContentDataSlice/ContentDataSlice";
import { Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Loader } from "lucide-react";

const GroupTwo = () => {
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { loading } = useSelector((state) => state.content);
  const location = useLocation();
  const group = location.pathname.split("/")[1]; //extract group from url
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(createNote({ content, group }));
    console.log(result);

    setContent("");

    if (createNote.fulfilled.match(result)) {
      toast.success(result.payload.message || "Content created");
      setSubmitted(true); // show success message
    } else {
      toast.error(result.payload.message || "Error while creating the note");
    }
  };

  const handleNoteGeneration = async () => {
    if (!title) {
      toast.error("Please enter a title");
      return;
    }
    try {
      const response = await dispatch(generateContent({ title }));
      if (generateContent.fulfilled.match(response)) {
        toast.success("Note generated successfully");
        setContent(response.payload);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to generate note");
    }
  };

  const handleChange = (e) => {
    const text = e.target.value;

    // Capitalize first letter of the text and after each period
    const formattedText = text.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) =>
      c.toUpperCase()
    );

    setContent(formattedText);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FAD961] via-[#F7971E] to-[#C95B00] dark:from-[#1E293B] dark:via-[#334155] dark:to-[#475569]">
      {/* Background texture */}
      <div
        className="absolute inset-0 -z-10 opacity-10"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/papyrus.png')",
        }}
      />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex items-center justify-center min-h-screen px-4"
      >
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl bg-[#FFF5E6]/80 dark:bg-gray-900/80 backdrop-blur-md p-8 rounded-2xl shadow-xl space-y-6 border border-[#C59B3E]"
          >
            <h2 className="text-3xl font-extrabold text-center text-[#966F2E] tracking-tight">
              Send a message for Ibrahim
            </h2>

            <div>
              {/* <label className="block mb-1 text-lg font-medium text-[#7A551E] dark:text-[#FAD961]">
                Content
              </label> */}
              <textarea
                value={content}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows={5}
                className="w-full border border-[#D4B382] rounded-lg p-3 bg-[#FFF5E6] dark:bg-gray-800 text-[#333333] dark:text-[#FAD961] focus:outline-none focus:ring-2 focus:ring-[#966F2E] transition"
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className={`
    relative flex items-center justify-center gap-2 w-full cursor-pointer
    bg-gradient-to-r from-[#966F2E] to-[#C59B3E]
    text-[#FFF5E6] px-4 py-3 rounded-xl font-semibold
    shadow-md transition-all duration-200
    hover:scale-[1.02] hover:shadow-lg hover:opacity-95
    disabled:opacity-60 disabled:cursor-not-allowed
  `}
            >
              {loading ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" aria-hidden="true" />
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Submit</span>
              )}
            </button>
          </form>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-xl bg-[#FFF5E6]/80 dark:bg-gray-900/80 backdrop-blur-md p-8 rounded-2xl shadow-xl text-center border border-[#C59B3E]"
          >
            <h2 className="text-2xl font-bold text-[#7A551E] dark:text-[#FAD961]">
              Your message has been successfully submitted and will appear soon.
            </h2>
            <button
              onClick={() => setSubmitted(false)}
              className="cursor-pointer mt-6 bg-gradient-to-r from-[#966F2E] to-[#C59B3E] text-[#FFF5E6] px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition shadow-md hover:shadow-lg"
            >
              Add Another Note
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default GroupTwo;
