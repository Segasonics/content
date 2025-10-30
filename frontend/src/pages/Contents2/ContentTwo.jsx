import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchallNoteByGroup } from "../../features/ContentDataSlice/ContentDataSlice";
import { motion } from "motion/react";
import { useLocation } from "react-router-dom";
import ContentSkeleton from "../../components/skeletons/ContentSkeleton";

const ContentTwo = () => {
  const dispatch = useDispatch();
  //getting the contents from the store
  const { contents, loading } = useSelector((state) => state.content);
  const location = useLocation();
  const group = location.pathname.split("/")[2];

  useEffect(() => {
    //dispatching fetchallnote to get all approved content
    dispatch(fetchallNoteByGroup(group));
    const interval = setInterval(() => {
      dispatch(fetchallNoteByGroup(group));
    }, 2 * 60 * 1000);

    return () => clearInterval(interval);
  }, [dispatch, group]);

  return (
    <>
      {loading ? (
        <ContentSkeleton />
      ) : (
        <div className="relative min-h-screen overflow-hidden font-serif">
          <div className="absolute inset-0 bg-gradient-to-b from-[#E6D4A1] via-[#CBB47A] to-[#9C7B3B] -z-20" />
          <div
            className="absolute inset-0 -z-10 opacity-30 mix-blend-multiply"
            style={{
              backgroundImage:
                "url('https://www.transparenttextures.com/patterns/papyrus.png')",
            }}
          />

          {/* <motion.div
            initial={{ opacity: 0, x: -30, y: -30 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute top-4 left-4 w-40 h-40 opacity-80 -z-10"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3068/3068965.png"
              alt="Ancient Pyramid"
              className="w-full h-full object-contain"
            />
          </motion.div> */}

          {/* Floating flames / torches */}
          {/* <div className="fixed bottom-6 right-6 w-44 h-44 -z-10">
                        {[
                            { size: "text-5xl", top: "10%", left: "20%", delay: 0 },
                            { size: "text-4xl", top: "40%", left: "60%", delay: 0.5 },
                            { size: "text-3xl", top: "70%", left: "30%", delay: 1 },
                            { size: "text-2xl", top: "20%", left: "75%", delay: 0.8 },
                        ].map((flame, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: 0, opacity: 0.75 }}
                                animate={{ y: [0, -6, 0], opacity: [0.75, 1, 0.75] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 4,
                                    ease: "easeInOut",
                                    delay: flame.delay,
                                }}
                                className={`${flame.size} absolute`}
                                style={{ top: flame.top, left: flame.left }}
                            >
                                🔥
                            </motion.div>
                        ))}
                    </div> */}

          {/* Scrollable content with sticky header */}
          <div className="relative z-10 max-w-[80%] mx-auto px-6 lg:px-12 overflow-hidden">
            <h1
              className="sticky top-0 text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6
          text-[#6A3E1B] text-center tracking-widest z-20
          px-6 py-3 bg-gradient-to-r from-transparent via-[#E6D4A1]/90 to-transparent
          backdrop-blur-sm drop-shadow-lg"
            >
              Ibrahim
            </h1>

            {contents?.length === 0 ? (
              <h1 className="text-lg md:text-xl lg:text-2xl text-[#4D2C14] font-medium text-center">
                No scrolls discovered! Begin to carve them...
              </h1>
            ) : (
              <motion.div
                animate={{ y: ["0%", "-100%"] }}
                transition={{
                  duration: contents.length * 7,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 1,
                }}
                className="flex flex-col gap-8"
              >
                {contents.concat(contents).map((note, index) => {
                  const isLeft = index % 2 === 0;
                  return (
                    <motion.div
                      key={`${note._id}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      className={`relative bg-[#FDF3E7]/95 border-2 border-[#9C7B3B] 
                    shadow-[0_8px_20px_rgba(0,0,0,0.4)] p-8 rounded-2xl
                    backdrop-blur-sm transition transform hover:-translate-y-1
                    w-full md:w-[80%] ${isLeft ? "self-start" : "self-end"}`}
                      style={{
                        backgroundImage:
                          "url('https://www.transparenttextures.com/patterns/old-wall.png')",
                        backgroundBlendMode: "multiply",
                      }}
                    >
                      {/* inner frame for parchment feel */}
                      <div className="absolute inset-0 border-[1.5px] border-[#6A3E1B] rounded-2xl opacity-40 pointer-events-none" />
                      <p className="text-xl md:text-2xl lg:text-3xl font-serif font-bold mb-4 text-[#6A3E1B] drop-shadow-sm">
                        {note?.content}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ContentTwo;
