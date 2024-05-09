import React, {useState, useEffect, useContext, useCallback} from "react";
import ProgressBar from "../components/progressBar";
import {DetailedQuestion, publishDetailedQuestions, Job} from '../QuizFunctions/QuestionSelection'
import { FormatQuestion } from "../components/formatQuestion";
import questions from "../data/questions.json";
import { getResponseVector, getResponseDictionary } from "../QuizFunctions/getResponseVector";
import {UserResponsesContext} from '../contexts/UserResponsesContext'
import { DetailedResponsesType, useDetailedResponses} from "../contexts/DetailedResponsesContext";
import { userResponseType } from "./BasicQuestions";
import { displayInfo } from "../QuizFunctions/consoleDisplays";
import { recommendJobs } from "../QuizFunctions/QuestionSelection";

const DetailedQuestions = () => {
    const [DetailedQuestions, setDetailedQuestions] = useState<DetailedQuestion[]>([]);
    const {responses} = useContext(UserResponsesContext);
    const [userResponses] = useState<userResponseType>({}); 
    const [progress, setProgress] = useState(0);
    console.log(userResponses);
    const data = JSON.parse(JSON.stringify(questions))
   // const handleChoiceChange = (id: number) => (value: string) => {
     // setUserResponse(prev => ({...prev, [id]:value }));
    //}

    /*
    new functions related to getting detailed questions responses
    */
    const {detailedResponses, setDetailedResponses} = useDetailedResponses();
    console.log(detailedResponses);
      
    useEffect(() => {
      const responseVec = getResponseVector(responses);
      //console.log("CLEARING LOCAL STORAGE");
      //localStorage.clear();
      console.log(`Responses are ${JSON.stringify(responses, null, 2)}`);
      displayInfo(responseVec);
      const sampledQuestions = publishDetailedQuestions(data, responseVec, 25);
      setDetailedQuestions(sampledQuestions);
      //we need to clear the locally store responses in this block of code so that we aren't saving responses to questions which we didn't 
      //actually serve the user
      //localStorage.setItem('detailedResponses', JSON.parse(JSON.stringify(defaultDetailedResponses)))

      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const handleDetailedChoiceChange = (id: number) => (value: string) => {
      setDetailedResponses((prev:DetailedResponsesType) => {
        const updatedResponses = {...prev, [id]:value.trim()};
        console.log('New Responses:', updatedResponses);
        console.log(`recommended jobs = ${recommendJobs(data, getResponseDictionary(updatedResponses), Object.keys(updatedResponses).map(key => parseInt(key, 10))).map((j:Job) => j.name)}`)
        return updatedResponses;
      });
  }





  const updateProgress = useCallback(() => {
    const totalQuestions = 25;
    console.log("Total Questions:", totalQuestions);
  
    const answeredQuestionsCount = Object.values(detailedResponses)
      .filter(answer => answer && answer.trim() !== "" && answer !== "Choose an option").length;
  
    const newProgress = (answeredQuestionsCount / totalQuestions) * 100;
    console.log(`Updating progress: ${newProgress}% (${answeredQuestionsCount}/${totalQuestions} answered)`);
    setProgress(newProgress);
  }, [detailedResponses]);
  

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
          onChoiceChange={handleDetailedChoiceChange(q.id)}
          ></FormatQuestion>
        </div>
  ))};
      </div>
    </div>
    );
  };
  
  export default DetailedQuestions;

