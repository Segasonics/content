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
        <div className="relative min-h-screen overflow-hidden bg-gray-100 dark:bg-black">
            {/* Background grid */}
            <RetroGrid
                className="z-0"
                angle={60}
                cellSize={40}
                opacity={0.2}
                lightLineColor="#a855f7"
                darkLineColor="#9333ea"
            />

            {/*  form */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    duration: 0.8,
                    ease: "easeOut",
                }}
                className="relative z-10 flex items-center justify-center min-h-screen px-4">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-xl bg-white p-6 rounded-lg shadow-md space-y-4"
                >
                    <h2 className="text-2xl font-bold text-gray-800">Add a Note</h2>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter title"
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Content
                        </label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your note here..."
                            rows={4}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition cursor-pointer"
                    >
                        Submit
                    </button>
                </form>
            </motion.div>
        </div>
    )
}

export default GroupTwo