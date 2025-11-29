import React from 'react';

export const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-[200px] w-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
        </div>
    );
};

export const FullScreenLoading = () => {
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-violet-500"></div>
        </div>
    );
};
