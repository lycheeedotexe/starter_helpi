import React, { useState } from "react";
import questions from "../data/questions.json";
import { FormatQuestion } from "../components/formatQuestion";
import ProgressBar from "../components/progressBar";

interface BasicQuestionProp {
  id: number,
  name: string,
  body: string,
  published: boolean
}

const data = JSON.parse(JSON.stringify(questions))
const BasicQuestions = () => {



  
  const [progress, setProgress] = useState(0);
 
  const updateProgress = (newProgress: number) => {
    setProgress(oldProgress => Math.min(Math.max(0, oldProgress + newProgress), 100));
  }
  const handleProgressMade = () => {
    updateProgress(10);
  };
  
    return (
      <div>
        <h1>Basic Questions Quiz</h1>
        <ProgressBar progress={progress} progressText={`${progress}%`} />
        <div>
        <p>Basic Questions begin here</p> 
        {data.BASIC_QUESTIONS.map((q: BasicQuestionProp) => (
          <p>
          <FormatQuestion question={q} options={["Neutral","Strongly Disagree", "Disagree", "Agree", "Strongly Agree"]}></FormatQuestion>
          </p>
    ))}
        </div>
        <button onClick={handleProgressMade}>Next</button>
      </div>
    );
  };
  
  export default BasicQuestions;