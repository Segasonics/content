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
  }, [dispatch])

  return (
    <>
      {loading ? <ContentSkeleton /> :
        (<div className="relative z-10 pt-14 max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Approved Notes
      </h1>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {contents?.length === 0 && (
          <h1>No content !! Start adding some</h1>
        )}
        {contents?.map((note) => (
          <div
            key={note._id}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl shadow-md p-4"
          >
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,   // adjust speed
                ease: "easeOut", // smooth easing
              }}
              className="text-lg font-semibold mb-2"
            >
              {note?.title}
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
              className="text-sm"
            >
              {note?.content}
            </motion.p>
          </div>
        ))}
      </div>
    </div >)
}
    </>
  )
}

export default Contents
