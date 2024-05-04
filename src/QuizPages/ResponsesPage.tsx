import React, {useState, useEffect, useContext} from "react";
import {DetailedQuestion, publishDetailedQuestions, Job} from '../QuizFunctions/QuestionSelection'
import questions from "../data/questions.json";
import { getResponseVector } from "../QuizFunctions/getResponseVector";
import {UserResponsesContext} from '../contexts/UserResponsesContext'
import { DetailedResponsesContext, DetailedResponsesType, useDetailedResponses} from "../contexts/DetailedResponsesContext";
import { userResponseType } from "./BasicQuestions";
import { displayInfo } from "../QuizFunctions/consoleDisplays";
import { recommendJobs } from "../QuizFunctions/QuestionSelection";


const ResponsesPage = () => {
    const dataCopy = JSON.parse(JSON.stringify(questions));
    const {detailedResponses} = useContext(DetailedResponsesContext);
    const sampledKeys = Object.keys(detailedResponses).map(key => parseInt(key, 10));
    const responseVec = getResponseVector(detailedResponses);
    const recommendations = recommendJobs(dataCopy, responseVec, sampledKeys);
    return(
<div>
      <h1>Response Page</h1>
      {recommendations.map((j:Job) => (
        <div>
            <p>j.name</p>
        </div>
        )
        )
      }
</div>
    )
    

}
export default ResponsesPage;