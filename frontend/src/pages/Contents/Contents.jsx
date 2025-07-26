import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchallNote } from '../../features/ContentDataSlice/ContentDataSlice';


const Contents = () => {
    const dispatch =useDispatch()
    //getting the contents from the store
    const {contents} =useSelector((state)=>state.content);
    console.log(contents)
  
    useEffect(()=>{
        //dispatching fetchallnote to get all approved content
      dispatch(fetchallNote())
    },[dispatch])

  return (
    <>
      {/* Content */}
      <div className="relative z-10 pt-14 max-w-5xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Approved Notes
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contents?.length === 0 &&(
            <h1>No content !! Start adding some</h1>
          )}
          {contents?.map((note) => (
            <div
              key={note._id}
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl shadow-md p-4"
            >
              <h2 className="text-lg font-semibold mb-2">{note?.title}</h2>
              <p className="text-sm">{note?.content}</p>
            </div>
          ))}
        </div>
      </div>

    </>
  )
}

export default Contents
