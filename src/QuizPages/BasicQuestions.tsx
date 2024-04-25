import React, {useState} from "react";
import questions from "../data/questions.json";
import { FormatQuestion } from "../components/formatQuestion";
import { UserResponsesProvider, UserResponsesType, useUserResponses } from "../contexts/UserResponsesContext";

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
    
  //const [userResponses, setUserResponse] = useState<userResponseType>({});
  const {responses, setResponses} = useUserResponses();

  const handleChoiceChange = (id: number) => (value: string) => {
      setResponses((prev:UserResponsesType) => {
        const updatedResponses = {...prev, [id]:value};
        console.log('New Responses:', updatedResponses);
        return updatedResponses;
        
      });
  }

    return (
      <UserResponsesProvider>
      <div>
        <h1>Basic Questions Quiz</h1>
        <div>
        <p>Basic Questions begin here</p> 
        {data.BASIC_QUESTIONS.map((q: BasicQuestionProp) => (
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
      </UserResponsesProvider>
    );
  };
  
  export default BasicQuestions;