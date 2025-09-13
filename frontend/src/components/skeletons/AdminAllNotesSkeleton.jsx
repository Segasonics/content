import React from 'react'

const AdminAllNotesSkeleton = () => {
    return (
        <section className="max-w-2xl mx-auto mt-10">
            {/* Section title */}
            <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-4 animate-pulse" />

            {/* Skeleton items */}
            <div className="grid gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center animate-pulse"
                    >
                        {/* Left side (title + content + status) */}
                        <div className="space-y-2">
                            <div className="h-5 w-40 bg-gray-300 dark:bg-gray-700 rounded" />
                            <div className="h-3 w-60 bg-gray-200 dark:bg-gray-600 rounded" />
                            <div className="h-3 w-28 bg-gray-200 dark:bg-gray-600 rounded" />
                        </div>

                        {/* Right side (delete button) */}
                        <div className="h-7 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default AdminAllNotesSkeleton
