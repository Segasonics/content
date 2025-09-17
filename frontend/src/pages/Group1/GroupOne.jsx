import React, { useState } from 'react'
import { RetroGrid } from '../../components/magicui/retro-grid';
import { useDispatch } from 'react-redux';
import { createNote } from '../../features/ContentDataSlice/ContentDataSlice';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom';

const GroupOne = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const location = useLocation();

    const group = location.pathname.split("/")[1] //extract group from url

    const dispatch = useDispatch();
    //form handle submit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        //dispatching title and content
        const result = await dispatch(createNote({ title, content, group }));
        console.log(result)
        setTitle("");
        setContent("")
        //if successfull display success toast
        if (createNote.fulfilled.match(result)) {
            toast.success(result.payload.message || "Content created")
        } else {
            //else diplay error toast
            toast.error(result.payload.message || "Error while creating the note")
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#DCEFF5] dark:from-black dark:via-gray-900 dark:to-black">
            {/* Background grid */}
            <RetroGrid
                className="z-0"
                angle={60}
                cellSize={40}
                opacity={0.12}
                lightLineColor="#B22222"   
                darkLineColor="#4A90E2"   
            />

            {/* Form container */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    duration: 0.8,
                    ease: "easeOut",
                }}
                className="relative z-10 flex items-center justify-center min-h-screen px-4"
            >
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-8 rounded-2xl shadow-xl space-y-6 border border-gray-200 dark:border-gray-700"
                >
                    <h2 className="text-3xl font-extrabold text-center text-[#B22222] tracking-tight">
                        Ayesha
                    </h2>

                    {/* Title input */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-[#4A90E2] dark:text-[#A3D977]">
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter title"
                            className="w-full border border-[#A3D977] rounded-lg p-3 bg-gray-50 dark:bg-gray-800 text-[#333333] dark:text-[#DCEFF5] focus:outline-none focus:ring-2 focus:ring-[#4A90E2] transition"
                        />
                    </div>

                    {/* Content input */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-[#4A90E2] dark:text-[#A3D977]">
                            Content
                        </label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your note here..."
                            rows={5}
                            className="w-full border border-[#A3D977] rounded-lg p-3 bg-gray-50 dark:bg-gray-800 text-[#333333] dark:text-[#DCEFF5] focus:outline-none focus:ring-2 focus:ring-[#4A90E2] transition"
                        />
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        className=" cursor-pointer w-full bg-gradient-to-r from-[#B22222] to-[#C53030] text-[#DCEFF5] px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition shadow-md hover:shadow-lg"
                    >
                        Submit
                    </button>
                </form>
            </motion.div>
        </div>

    )
}

export default GroupOne
