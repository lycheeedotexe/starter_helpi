
import React, {useState, useEffect, useContext} from "react";
import {DetailedQuestion, publishDetailedQuestions, Job} from '../QuizFunctions/QuestionSelection'
import questions from "../data/questions.json";
import { getResponseVector, getResponseDictionary } from "../QuizFunctions/getResponseVector";
import {UserResponsesContext} from '../contexts/UserResponsesContext'
import { DetailedResponsesContext, DetailedResponsesType, useDetailedResponses} from "../contexts/DetailedResponsesContext";
import { userResponseType } from "./BasicQuestions";
import { displayInfo } from "../QuizFunctions/consoleDisplays";
import { recommendJobs } from "../QuizFunctions/QuestionSelection";
import { FormatResult } from "../components/formatResults";


const ResultsPage = () => {
    const dataCopy = JSON.parse(JSON.stringify(questions));
    const {detailedResponses} = useContext(DetailedResponsesContext);
    const sampledKeys = Object.keys(detailedResponses).map(key => parseInt(key, 10));
    const responseDict = getResponseDictionary(detailedResponses);
    const recommendations = recommendJobs(dataCopy, responseDict, sampledKeys);
    return(
<div>
      <h1>Response Page</h1>
      <div>
      {recommendations.map((j:Job) => (
            <FormatResult
                job={j} 
                description={`Desc of job ${j.id}`} 
                salary="50000" 
                education="bachelors"
            ></FormatResult>
        )
        )
      }
      </div>
</div>
    )
    

}
export default ResultsPage;
