import React from "react";


const Loader = ({ size = 16, color = "bg-purple-500" }) => {
    const ballStyle = `rounded-full animate-bounce ${color}`;

    return (
        <div className="flex items-center justify-center space-x-2 h-20">
      <span
          className={`${ballStyle}`}
          style={{ width: size, height: size, animationDelay: "-0.3s" }}
      ></span>
            <span
                className={`${ballStyle}`}
                style={{ width: size, height: size, animationDelay: "-0.15s" }}
            ></span>
            <span
                className={`${ballStyle}`}
                style={{ width: size, height: size }}
            ></span>
        </div>
    );
};

export default Loader;
