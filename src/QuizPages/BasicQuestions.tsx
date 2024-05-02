import React, {useState} from "react";
import questions from "../data/questions.json";
import { FormatQuestion } from "../components/formatQuestion";
import { UserResponsesType, useUserResponses } from "../contexts/UserResponsesContext";
import ProgressBar from "../components/progressBar";

interface BasicQuestionProp {
  id: number,
  name: string,
  body: string,
  published: boolean
}

export type userResponseType = {
  [key: number]: string;
}

const data = JSON.parse(JSON.stringify(questions))
const BasicQuestions = () => {
    
  const {responses, setResponses} = useUserResponses();
  console.log(responses)
  const [progress, setProgress] = useState(0);
 
  const updateProgress = (newProgress: number) => {
    setProgress(oldProgress => Math.min(Math.max(0, oldProgress + newProgress), 100));
  }
  const handleProgressMade = () => {
    updateProgress(10);
  };

  const handleChoiceChange = (id: number) => (value: string) => {
      setResponses((prev:UserResponsesType) => {
        const updatedResponses = {...prev, [id]:value};
        console.log('New Responses:', updatedResponses);
        return updatedResponses;
        
      });
  }

    return (
      <div>
        <h1>Basic Questions Quiz</h1>
        <ProgressBar progress={progress} progressText={`${progress}%`} />
        <button onClick={handleProgressMade}>Next</button>
        <div>
        <p>Basic Questions begin here</p> 
        {data.BASIC_QUESTIONS.map((q: BasicQuestionProp) => (
          <div>
          <FormatQuestion 
            key={q.id}
            question={q} 
            options={[" ", "Neutral","Strongly Disagree", "Disagree", "Agree", "Strongly Agree"]}
            onChoiceChange={handleChoiceChange(q.id)}
            ></FormatQuestion>
          </div>
    ))};
        </div>
      </div>
    );
  };
  
  export default BasicQuestions;