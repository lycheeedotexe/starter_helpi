import React, {useState, useEffect, useContext} from "react";
import {DetailedQuestion, publishDetailedQuestions} from '../QuestionSelection'
import { FormatQuestion } from "../components/formatQuestion";
import questions from "../data/questions.json";
import { getResponseVector } from "../getResponseVector";
import {UserResponsesContext} from '../contexts/UserResponsesContext'
import { userResponseType } from "./BasicQuestions";
import { displayInfo } from "../consoleDisplays";
const DetailedQuestions = () => {
    const [DetailedQuestions, setDetailedQuestions] = useState<DetailedQuestion[]>([]);
    const {responses} = useContext(UserResponsesContext);
    const [userResponses, setUserResponse] = useState<userResponseType>({});
    const data = JSON.parse(JSON.stringify(questions))

    const handleChoiceChange = (id: number) => (value: string) => {
      setUserResponse(prev => ({...prev, [id]:value }));
    }

    useEffect(() => {
      const responseVec = getResponseVector(responses);
      console.log(`Responses are ${JSON.stringify(responses, null, 2)}`);
      displayInfo(responseVec);
      const sampledQuestions = publishDetailedQuestions(data, responseVec, 25);
      setDetailedQuestions(sampledQuestions);
    }, []);

    return (
      <div>
      <h1>Detailed Questions Quiz</h1>
      <div>
      <p>Detailed Questions begin here</p> 
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