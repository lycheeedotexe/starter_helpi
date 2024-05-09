import React, { useState } from "react";
import { Button } from "react-bootstrap";
//import { render, screen } from "@testing-library/react";
import BasicQuestions from "../QuizPages/BasicQuestions";
import DetailedQuestions from "../QuizPages/DetailedQuestions";
import { useUserResponses } from '../contexts/UserResponsesContext';

import "../App.css";

export function HomePage(): JSX.Element{
  const [showHome, updateShowHome] = useState<boolean>(true);
  const [showDetailed, updateShowDetailed] = useState<boolean>(false);
  const [showBasic, updateShowBasic] = useState<boolean>(false);
 // const [progress, setProgress] = useState(0);

  const {setResponses } = useUserResponses();
  const resetResponses = () => {
    setResponses({}); // Reset to initial state or however you've structured it
  };

  function clearStorage() {
    localStorage.removeItem("detailedQuestions"); // Modify this according to your storage use
  }

  function resetProgress() {
    setResponses({});
  }

  function clickHome() {
    clearStorage();
    resetResponses();
    updateShowHome(true);
    updateShowBasic(false);
    updateShowDetailed(false);
    resetProgress();
  }

  function clickBasic() {
    updateShowHome(false);
    updateShowBasic(true);
  }

  function clickDetailed() {
    updateShowHome(false);
    updateShowDetailed(true);
  }
    // Make sure to return some JSX here
    return (
      <div>
        <div>
        {showHome && (
          <>
            <p>With so many careers to choose from do you have NO IDEA what you want to do? Our basic career quiz is right for you, click to get started!
           <div> <Button onClick={clickBasic}>Basic</Button> </div> </p>
            <p>Do you have an area of interest already but need help nailing it down? Then our detailed quiz is right for you click to get started! 
           <div> <Button onClick={clickDetailed}>Detailed</Button> </div> </p>
          </>
        )}

        {showBasic && (
          <>
            <BasicQuestions></BasicQuestions>
            <Button onClick={clickHome}>Return Home</Button>
          </>
        )}

        {showDetailed && (
          <>
            <DetailedQuestions></DetailedQuestions>
            <Button onClick={clickHome}>Return Home</Button>
          </>
        )}
        </div>
      </div>
    );
  };