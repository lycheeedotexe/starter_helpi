import React, { useState } from "react";
import ProgressBar from "../components/progressBar";
const DetailedQuestions = () => {
  const [progress, setProgress] = useState(0);
 
  const updateProgress = (newProgress: number) => {
    setProgress(oldProgress => Math.min(Math.max(0, oldProgress + newProgress), 100));
  }
  const handleProgressMade = () => {
    updateProgress(10);
  };
  
    return (
      <div>
        <h1>Detailed Questions</h1>

        <ProgressBar progress={progress} progressText={`${progress}%`} />
        <button onClick={handleProgressMade}>Next</button>
      </div>
    );
  };
  
  export default DetailedQuestions;