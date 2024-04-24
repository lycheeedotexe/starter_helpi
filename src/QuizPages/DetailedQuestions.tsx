import React, {useState, useEffect} from "react";
import {DetailedQuestion, publishDetailedQuestions} from '../QuestionSelection'
import { FormatQuestion } from "../components/formatQuestion";
import questions from "../data/questions.json";
import { getResponseVector } from "../getResponseVector";

interface DetailedQuestionsProp {
  publishedDetailedQuestions: DetailedQuestion[];
}

const DetailedQuestions = () => {
    const [DetailedQuestions, setDetailedQuestions] = useState<DetailedQuestion[]>([]);
    const data = JSON.parse(JSON.stringify(questions))

    useEffect(() => {
      const questions = publishDetailedQuestions(data, getResponseVector(publishedDetailedQuestions), 25);

    }, []);
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