import React from 'react'

const AdminPendingSkeleton = () => {
    return (
        <section className="max-w-2xl mx-auto">
            <div className="h-6 w-64 bg-gray-300 dark:bg-gray-700 rounded mb-4 animate-pulse" />

            <div className="grid gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center animate-pulse"
                    >
                        <div className="space-y-2">
                            <div className="h-5 w-40 bg-gray-300 dark:bg-gray-700 rounded" />
                            <div className="h-3 w-60 bg-gray-200 dark:bg-gray-600 rounded" />
                            <div className="h-3 w-24 bg-gray-200 dark:bg-gray-600 rounded" />
                        </div>

                        <div className="flex gap-2">
                            <div className="h-7 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
                            <div className="h-7 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
                            <div className="h-7 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default AdminPendingSkeleton
