import React, {useState} from "react";
import questions from "../data/questions.json";
import { FormatQuestion } from "../components/formatQuestion";

interface BasicQuestionProp {
  id: number,
  name: string,
  body: string,
  published: boolean
}

export type userResponseType = {
  [key: number]: string;
}

const data = JSON.parse(JSON.stringify(questions))
const BasicQuestions = () => {
    
  const [userResponses, setUserResponse] = useState<userResponseType>({});

  const handleChoiceChange = (id: number) => (value: string) => {
      setUserResponse(prev => ({...prev, [id]:value }));
  }

    return (
      <div>
        <h1>Basic Questions Quiz</h1>
        <div>
        <p>Basic Questions begin here</p> 
        {data.BASIC_QUESTIONS.map((q: BasicQuestionProp) => (
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
  
  export default BasicQuestions;