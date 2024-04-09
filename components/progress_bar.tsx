
import React from "react";
export type ProgressBarProps = {
    progress: number;
    progressText?: string;
  };
  const ProgressBar = ({ progress, progressText = "" }: ProgressBarProps) => {
    // Make sure our value stays between 0 and 100.
    const _progress = Math.min(Math.max(0, progress), 100);
    return (
      <div className="flex flex-col items-end justify-start">
        <div className="w-full border-2 border-indigo-700 h-6 rounded-md">
          <div
            className="bg-indigo-500 h-full transition-all duration-250"
            style={{ width: `${_progress}%` }}
          ></div>
        </div>
        <span>{progressText}</span>
      </div>
    );
  };
  
  export default ProgressBar;