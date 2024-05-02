import React, {useState, useEffect, useContext} from "react";
import ProgressBar from "../components/progressBar";
import {DetailedQuestion, publishDetailedQuestions} from '../QuizFunctions/QuestionSelection'
import { FormatQuestion } from "../components/formatQuestion";
import questions from "../data/questions.json";
import { getResponseVector } from "../QuizFunctions/getResponseVector";
import {UserResponsesContext} from '../contexts/UserResponsesContext'
import { userResponseType } from "./BasicQuestions";
import { displayInfo } from "../QuizFunctions/consoleDisplays";

const DetailedQuestions = () => {
    const [DetailedQuestions, setDetailedQuestions] = useState<DetailedQuestion[]>([]);
    const {responses} = useContext(UserResponsesContext);
    const [userResponses, setUserResponse] = useState<userResponseType>({}); 
    const [progress, setProgress] = useState(0);
    console.log(userResponses);
    const data = JSON.parse(JSON.stringify(questions))
    const handleChoiceChange = (id: number) => (value: string) => {
      setUserResponse(prev => ({...prev, [id]:value }));
    }

    const updateProgress = (newProgress: number) => {
      setProgress(oldProgress => Math.min(Math.max(0, oldProgress + newProgress), 100));
    }
    const handleProgressMade = () => {
      updateProgress(10);
    };

    useEffect(() => {
      const responseVec = getResponseVector(responses);
      console.log(`Responses are ${JSON.stringify(responses, null, 2)}`);
      displayInfo(responseVec);
      const sampledQuestions = publishDetailedQuestions(data, responseVec, 50);
      setDetailedQuestions(sampledQuestions);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
      <div>
      <h1>Detailed Questions Quiz</h1>
      
      <div>
      <p>Detailed Questions begin here</p> 
      <ProgressBar progress={progress} progressText={`${progress}%`} />
        <button onClick={handleProgressMade}>Next</button>
      {DetailedQuestions.map((q: DetailedQuestion) => (
        <div>
        <FormatQuestion 
          key={q.id}
          question={q} 
          options={["Neutral","Strongly Disagree", "Disagree", "Agree", "Strongly Agree"]}
          onChoiceChange={handleChoiceChange(q.id)}
          ></FormatQuestion>
        </div>
  ))};
      </div>
    </div>
    );
  };
  
  export default DetailedQuestions;