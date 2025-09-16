import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchallNoteByGroup } from '../../features/ContentDataSlice/ContentDataSlice';
import { motion } from 'motion/react'
import { useLocation } from 'react-router-dom';
import ContentSkeleton from '../../components/skeletons/ContentSkeleton';

const Contents = () => {
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
          {/* Background */}
          <div
            className="absolute inset-0 bg-gradient-to-b
               from-[#87CEFA] via-[#B0E0E6] to-[#E6F7FF]
               dark:from-[#0F172A] dark:via-[#1E293B] dark:to-[#334155] -z-20"
          />

          {/* Leaeve */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: -30 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute top-0 left-0 w-32 h-32 opacity-70 -z-10"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f33f.svg"
              alt="leaf branch"
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Sweet cherriot */}
          <div className="fixed bottom-6 right-6 w-44 h-44 -z-10">
            {[
              { size: "text-5xl", top: "10%", left: "20%", delay: 0 },
              { size: "text-4xl", top: "40%", left: "60%", delay: 0.5 },
              { size: "text-3xl", top: "70%", left: "30%", delay: 1 },
              { size: "text-2xl", top: "20%", left: "75%", delay: 0.8 },
            ].map((flower, i) => (
              <motion.div
                key={i}
                initial={{ y: 0, opacity: 0.85 }}
                animate={{ y: [0, -6, 0], opacity: [0.85, 1, 0.85] }}
                transition={{
                  repeat: Infinity,
                  duration: 3.5,
                  ease: "easeInOut",
                  delay: flower.delay,
                }}
                className={`${flower.size} absolute`}
                style={{ top: flower.top, left: flower.left }}
              >
                🌸
              </motion.div>
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-[80%] mx-auto px-6 lg:px-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-10
                   text-[#B22222] dark:text-[#A3D977] text-center tracking-tight">
              Ayesha
            </h1>

            {contents?.length === 0 ? (
              <h1 className="text-lg md:text-xl lg:text-2xl text-[#2C3E50] dark:text-[#DCEFF5] font-medium text-center">
                No content !! Start adding some
              </h1>
            ) : (
              <div className="flex flex-col gap-8">
                {contents.map((note, index) => {
                  const isLeft = index % 2 === 0;

                  return (
                    <motion.div
                      key={note._id}
                      initial={{ x: isLeft ? -40 : 40, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                      className={`bg-white/90 dark:bg-gray-900/90
                         border border-gray-200 dark:border-gray-700
                         backdrop-blur-md shadow-lg hover:shadow-2xl
                         transition transform hover:-translate-y-0.5
                         p-8 rounded-2xl
                         w-full md:w-[80%]
                         ${isLeft ? "self-start" : "self-end"}`}
                    >
                      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4
                             text-[#1E40AF] dark:text-[#A3D977]">
                        {note?.title}
                      </h2>
                      <p className="text-base md:text-lg lg:text-xl
                            text-gray-700 dark:text-gray-300 leading-relaxed">
                        {note?.content}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Contents
