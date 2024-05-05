import React, {useState , useEffect} from "react";
import questions from "../data/questions.json";
import { FormatQuestion } from "../components/formatQuestion";
import { UserResponsesType, useUserResponses } from "../contexts/UserResponsesContext";
import ProgressBar from "../components/progressBar";

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
    
  const {responses, setResponses} = useUserResponses();
  console.log(responses)
  const [progress, setProgress] = useState(0);
  console.log( "progress is",progress)
  
 
  
  const updateProgress = () => {
    const totalQuestions = data.BASIC_QUESTIONS.length;
    console.log("Total Questions:", totalQuestions);
    console.log("Current Responses:", responses);
  
    const answeredQuestionsCount = Object.values(responses)
      .filter(answer => answer && answer.trim() !== "" && answer !== "Choose an option...").length;
  
    console.log("Answered Questions Count:", answeredQuestionsCount);
    const newProgress = (answeredQuestionsCount / totalQuestions) * 100;
    console.log(`Updating progress: ${newProgress}% (${answeredQuestionsCount}/${totalQuestions} answered)`);
    setProgress(newProgress);
  };
  
  
  
  const handleChoiceChange = (id: number) => (value: string) => {
    setResponses((prev: UserResponsesType) => {
      const updatedResponses = {...prev, [id]: value.trim()};
      return updatedResponses; 
    });
  };
  useEffect(() => {
    updateProgress();  // Call updateProgress whenever responses change
  }, [responses])
                    

    return (
      <div>
        <h1>Basic Questions Quiz</h1>
        <ProgressBar progress={progress} progressText={``} />
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
    );
  };
  
  export default BasicQuestions;