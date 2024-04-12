import React from "react";
import questions from "../data/questions.json";
import { FormatQuestion } from "../components/formatQuestion";

interface BasicQuestionProp {
  id: number,
  name: string,
  body: string,
  published: boolean
}

const data = JSON.parse(JSON.stringify(questions))
const BasicQuestions = () => {
    
    return (
      <div>
        <h1>Basic Questions Quiz</h1>
        <div>
        <p>Basic Questions begin here</p> 
        {data.BASIC_QUESTIONS.map((q: BasicQuestionProp) => (
          <p>
          <FormatQuestion question={q} options={["Neutral","Strongly Disagree", "Disagree", "Agree", "Strongly Agree"]}></FormatQuestion>
          </p>
    ))};
        {/* {data.map((q:) => (
          <p>q.body</p>
        ))} */}
        {/* {data.BASIC_QUESTIONS.map((data: string, index:number) => (
          <p key={index}>
            <span>{data.body}</span>
          </p>
        ))} */}
        </div>
      </div>
    );
  };
  
  export default BasicQuestions;