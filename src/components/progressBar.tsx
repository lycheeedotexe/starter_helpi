import React from "react";

interface ProgressBarProps {
  progress: number;
  progressText: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, progressText }) => {
  const progressBarStyle = {
    width: `${progress}%`,
    backgroundColor: 'blue', 
    height: '25px', 
    
    lineHeight: '25px', 
    color: 'white', 
    borderRadius: '5px', 
    transition: 'width 0.5s ease-in-out' 
  };
  return (
    <div className="progress-bar-container" style={{ width: '100%', backgroundColor: '#ddd', borderRadius: '5px', overflow: 'hidden' }}>
      <div className="progress-bar" style={progressBarStyle}>
        {progressText}
      </div>
    </div>
  );
};

  
  export default ProgressBar;