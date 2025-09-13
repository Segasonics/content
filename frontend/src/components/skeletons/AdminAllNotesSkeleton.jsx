import React from 'react'

const AdminAllNotesSkeleton = () => {
    return (
        <section className="max-w-5xl mx-auto mt-10 px-4 sm:px-6">
            {/* Section title */}
            <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-6 animate-pulse" />

            {/* Skeleton items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col sm:flex-row justify-between items-start sm:items-center animate-pulse"
                    >
                        {/* Left side (title + content + status) */}
                        <div className="space-y-2 flex-1 w-full sm:w-auto">
                            <div className="h-5 w-40 bg-gray-300 dark:bg-gray-700 rounded" />
                            <div className="h-3 w-full max-w-xs bg-gray-200 dark:bg-gray-600 rounded" />
                            <div className="h-3 w-32 bg-gray-200 dark:bg-gray-600 rounded" />
                        </div>

                        {/* Right side (delete button) */}
                        <div className="h-7 w-20 bg-gray-300 dark:bg-gray-700 rounded mt-4 sm:mt-0 sm:ml-4" />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default AdminAllNotesSkeleton
