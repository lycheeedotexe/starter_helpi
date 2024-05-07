import React, {useState, useEffect, useContext, useCallback} from "react";
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
    const {responses , setResponses} = useContext(UserResponsesContext);
    const [userResponses] = useState<userResponseType>({});
    const [progress, setProgress] = useState(0);
    console.log(userResponses);
    const data = JSON.parse(JSON.stringify(questions))
    const handleChoiceChange = (id: number) => (value: string) => {
      setResponses(prev => ({...prev, [id]: value.trim()}));
    };

    

    useEffect(() => {
      const responseVec = getResponseVector(responses);
      console.log(`Responses are ${JSON.stringify(responses, null, 2)}`);
      displayInfo(responseVec);
      const sampledQuestions = publishDetailedQuestions(data, responseVec, 25);
      setDetailedQuestions(sampledQuestions);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);




    const updateProgress = useCallback(() => {
      const totalQuestions = 25;
      console.log("Total Questions:", totalQuestions);
      console.log("Current Responses:", responses);
    
      const answeredQuestionsCount = Object.values(responses)
        .filter(answer => answer && answer.trim() !== "" && answer !== "Choose an option").length;
    
      console.log("Answered Questions Count:", answeredQuestionsCount);
      const newProgress = (answeredQuestionsCount / totalQuestions) * 100;
      console.log(`Updating progress: ${newProgress}% (${answeredQuestionsCount}/${totalQuestions} answered)`);
      setProgress(newProgress);
    }, [responses]); 
    
  

    useEffect(() => {
      updateProgress();  // Call updateProgress whenever responses change
    }, [updateProgress])

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