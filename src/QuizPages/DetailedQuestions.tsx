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

    const updateProgress = () => {
      //make sure agrees with line49
      const totalQuestions = 50;
      console.log("Detailed Q length", totalQuestions);
     const answeredQuestionsCount= Object.values(responses)
      .filter(answer => answer !== "Choose an option..." && answer.trim() !== "").length; 
      const newProgress = (answeredQuestionsCount / totalQuestions) * 100;
      console.log(`Updating progress: ${newProgress}% (${answeredQuestionsCount}/${totalQuestions} answered)`);
      setProgress(newProgress);
    };

    useEffect(() => {
      updateProgress();  // Call updateProgress whenever responses change
    }, [responses])

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
      <ProgressBar progress={progress} progressText={``} />
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