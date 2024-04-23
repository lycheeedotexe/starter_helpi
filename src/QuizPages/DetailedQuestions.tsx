import React from "react";
import {DetailedQuestion, publishDetailedQuestions} from '../QuestionSelection'
import { FormatQuestion } from "../components/formatQuestion";

interface DetailedQuestionsProp {
  publishedDetailedQuestions: DetailedQuestion[];
}

const DetailedQuestions = () => {
    return (
      <div>
      <h1>Detailed Questions Quiz</h1>
      <div>
      <p>Detailed Questions begin here</p> 
      {publishedDetailedQuestions.map((q: DetailedQuestionsProp) => (
        <p>
        <FormatQuestion 
          key={q.id}
          question={q} 
          options={["Neutral","Strongly Disagree", "Disagree", "Agree", "Strongly Agree"]}
          onChoiceChange={handleChoiceChange(q.id)}
          ></FormatQuestion>
        </p>
  ))};
      </div>
    </div>
    );
  };
  
  export default DetailedQuestions;