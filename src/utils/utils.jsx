import React from "react";

const Loader = () => {
    return (
        <div className="flex items-center justify-center space-x-2 h-20">
            <span className="w-4 h-4 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-4 h-4 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-4 h-4 bg-purple-500 rounded-full animate-bounce"></span>
        </div>
    );
};

export default Loader;
