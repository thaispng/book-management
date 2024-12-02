import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full w-full bg-transparent">
      <div className="w-16 h-16 border-4 border-amber-900 border-dotted rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
