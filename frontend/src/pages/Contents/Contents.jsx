import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchallNoteByGroup } from '../../features/ContentDataSlice/ContentDataSlice';
import { motion, useAnimation } from 'motion/react'
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
  }, [dispatch, group]);

  const controls = useAnimation();

  useEffect(() => {
    let isMounted = true;

    const loop = async () => {
      while (isMounted) {
        // scroll from top to bottom
        await controls.start({
          y: ["0%", "-100%"],
          transition: {
            duration: contents.length * 7,
            ease: "linear",
          },
        });

        await controls.start({
          y: "0%",
          transition: { duration: 0 },
        });

        // wait 5s before repeating
        await new Promise((res) => setTimeout(res, 1000));
      }
    };

    loop();

    return () => {
      isMounted = false; // cleanup
    };
  }, [controls, contents]);


  return (
    <>
      {loading ? (
        <ContentSkeleton />
      ) : (
        <div className="relative min-h-screen overflow-hidden">
          {/* Background */}
          <div
            className="absolute inset-0 bg-gradient-to-b
       from-[#87CEFA] via-[#B0E0E6] to-[#E6F7FF]
       dark:from-[#0F172A] dark:via-[#1E293B] dark:to-[#334155] -z-20"
          />

          {/* Leaf */}
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

          {/* cheery */}
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
          <div className="relative z-10 max-w-[80%] mx-auto px-6 lg:px-12 overflow-hidden">
            <h1
              className="sticky top-0
     text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6
     text-[#B22222] dark:text-[#A3D977]
     text-center tracking-tight z-20
     px-6 py-3
     bg-gradient-to-r 
     from-transparent via-[#87CEFA]/80 to-transparent
     dark:from-transparent dark:via-[#1E293B]/80 dark:to-transparent
     backdrop-blur-sm"
            >
              Ayesha
            </h1>

            {contents?.length === 0 ? (
              <h1 className="text-lg md:text-xl lg:text-2xl text-[#2C3E50] dark:text-[#DCEFF5] font-medium text-center">
                No content !! Start adding some
              </h1>
            ) : (
              <motion.div animate={controls} className="flex flex-col gap-8 relative">
                {contents.concat(contents).map((note, index) => {
                  const isLeft = index % 2 === 0;
                  return (
                    <div
                      key={`${note._id}-${index}`}
                      className={`bg-[#FFFDF5] dark:bg-gray-900/80
          border-2 border-[#C59B3E] dark:border-[#D4AF37]
          shadow-lg dark:shadow-xl
          p-6 md:p-8 rounded-2xl
          w-full md:w-[80%]
          ${isLeft ? "self-start" : "self-end"}
          font-sans
          relative overflow-hidden`}
                      style={{
                        boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                        backgroundImage: "linear-gradient(to bottom, #FFFDF5 0%, #FFF7E6 100%)",
                      }}
                    >
                      {/* Top decorative line */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C59B3E] to-[#FFD580] rounded-t-xl" />

                      {/* Vine decorations */}
                      <div className="absolute top-0 left-0 w-6 h-6 -translate-x-2 -translate-y-2">🍃</div>
                      <div className="absolute top-0 right-0 w-6 h-6 translate-x-2 -translate-y-2">🍃</div>
                      <div className="absolute bottom-0 left-0 w-6 h-6 -translate-x-2 translate-y-2">🍃</div>
                      <div className="absolute bottom-0 right-0 w-6 h-6 translate-x-2 translate-y-2">🍃</div>

                      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-3 text-[#3B3B3B] dark:text-[#DCE775]">
                        {note?.title}
                      </h2>
                      <p className="text-base md:text-lg lg:text-xl text-[#4A4A4A] dark:text-[#E0E0C3] leading-relaxed whitespace-pre-line">
                        {note?.content}
                      </p>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Contents
