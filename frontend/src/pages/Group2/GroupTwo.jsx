import React, { useState } from 'react'
import { RetroGrid } from '../../components/magicui/retro-grid';
import { useDispatch } from 'react-redux';
import { createNote } from '../../features/ContentDataSlice/ContentDataSlice';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion'

const GroupTwo = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

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
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FAD961] via-[#F7971E] to-[#C95B00] dark:from-[#1E293B] dark:via-[#334155] dark:to-[#475569]">
            {/* Background texture */}
            <div
                className="absolute inset-0 -z-10 opacity-10"
                style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/papyrus.png')" }}
            />

            {/* Form container */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 flex items-center justify-center min-h-screen px-4"
            >
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-xl bg-[#FFF5E6]/80 dark:bg-gray-900/80 backdrop-blur-md p-8 rounded-2xl shadow-xl space-y-6 border border-[#C59B3E]"
                >
                    <h2 className="text-3xl font-extrabold text-center text-[#966F2E] tracking-tight">
                        Add a Note
                    </h2>

                    {/* Title input */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-[#7A551E] dark:text-[#FAD961]">
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter title"
                            className="w-full border border-[#D4B382] rounded-lg p-3 bg-[#FFF5E6] dark:bg-gray-800 text-[#333333] dark:text-[#FAD961] focus:outline-none focus:ring-2 focus:ring-[#966F2E] transition"
                        />
                    </div>

                    {/* Content input */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-[#7A551E] dark:text-[#FAD961]">
                            Content
                        </label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your note here..."
                            rows={5}
                            className="w-full border border-[#D4B382] rounded-lg p-3 bg-[#FFF5E6] dark:bg-gray-800 text-[#333333] dark:text-[#FAD961] focus:outline-none focus:ring-2 focus:ring-[#966F2E] transition"
                        />
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#966F2E] to-[#C59B3E] text-[#FFF5E6] px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition shadow-md hover:shadow-lg"
                    >
                        Submit
                    </button>
                </form>
            </motion.div>
        </div>

    )
}

export default GroupTwo