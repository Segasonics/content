import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchallNoteByGroup } from '../../features/ContentDataSlice/ContentDataSlice';
import { motion } from 'motion/react'
import { useLocation } from 'react-router-dom';
import ContentSkeleton from '../../components/skeletons/ContentSkeleton';

const ContentTwo = () => {
    const dispatch = useDispatch()
    //getting the contents from the store
    const { contents, loading } = useSelector((state) => state.content);
    const location = useLocation();
    const group = location.pathname.split('/')[2];
    useEffect(() => {
        //dispatching fetchallnote to get all approved content
        dispatch(fetchallNoteByGroup(group))
    }, [dispatch, group])

    return (
        <>
            {loading ? (
                <ContentSkeleton />
            ) : (
                <div className="relative min-h-screen pt-14 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#FAD961] via-[#F7971E] to-[#C95B00] dark:from-[#1E293B] dark:via-[#334155] dark:to-[#475569] -z-20" />

                    <div className="absolute inset-0 -z-10 opacity-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/papyrus.png')" }} />

                    <motion.div
                        initial={{ opacity: 0, x: -30, y: -30 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 1.2 }}
                        className="absolute top-0 left-0 w-32 h-32 opacity-70 -z-10"
                    >
                        <img
                            src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f53d.svg" // Changed to a pyramid emoji
                            alt="hieroglyph pyramid"
                            className="w-full h-full object-contain"
                        />
                    </motion.div>

                    <div className="fixed bottom-6 right-6 w-44 h-44 -z-10">
                        {[
                            { size: "text-5xl", top: "10%", left: "20%", delay: 0 },
                            { size: "text-4xl", top: "40%", left: "60%", delay: 0.5 },
                            { size: "text-3xl", top: "70%", left: "30%", delay: 1 },
                            { size: "text-2xl", top: "20%", left: "75%", delay: 0.8 },
                        ].map((sun, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: 0, opacity: 0.85 }}
                                animate={{ y: [0, -6, 0], opacity: [0.85, 1, 0.85] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 3.5,
                                    ease: "easeInOut",
                                    delay: sun.delay,
                                }}
                                className={`${sun.size} absolute`}
                                style={{ top: sun.top, left: sun.left }}
                            >
                                ☀️
                            </motion.div>
                        ))}
                    </div>

                    <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-10 text-[#C95B00] dark:text-[#FAD961] text-center tracking-wide">
                            Scrolls of the Ancients
                        </h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {contents?.length === 0 && (
                                <h1 className="text-lg md:text-xl lg:text-2xl text-[#824400] dark:text-[#FAD961] font-serif font-medium text-center">
                                    No hieroglyphs found! Begin to carve them...
                                </h1>
                            )}

                            {contents?.map((note) => (
                                <motion.div
                                    key={note._id}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.6 }}
                                    className="bg-[#FFF5E6]/80 dark:bg-gray-900/80 border border-[#FAD961] dark:border-[#C95B00] backdrop-blur-md shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 p-6 rounded-lg"
                                >
                                    <h2 className="text-lg md:text-xl lg:text-2xl font-serif font-semibold mb-3 text-[#C95B00] dark:text-[#FAD961]">
                                        {note?.title}
                                    </h2>
                                    <p className="text-sm md:text-base lg:text-lg text-[#333333] dark:text-[#FAD961] leading-relaxed font-serif">
                                        {note?.content}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ContentTwo
