import React, { useState } from "react";
import { Button } from "react-bootstrap";
import BasicQuestions from "../QuizPages/BasicQuestions";
import DetailedQuestions from "../QuizPages/DetailedQuestions";
import ResultsPage from "./ResultsPage";
import { useUserResponses } from '../contexts/UserResponsesContext';
import mascotPonder from "../image assets/mascot ponder 2 2.png"

import "../App.css";

export function HomePage(): JSX.Element{
  const [showHome, updateShowHome] = useState<boolean>(true);
  const [showDetailed, updateShowDetailed] = useState<boolean>(false);
  const [showBasic, updateShowBasic] = useState<boolean>(false);
  const [showResults, updateShowResults] = useState<boolean>(false);

  const { setResponses } = useUserResponses();

  function resetResponses() {
    setResponses({}); // Assuming this resets to the initial state
  }

  function clearStorage() {
    localStorage.removeItem("detailedQuestions");
  }

  function clickHome() {
    updateShowHome(true);
    updateShowBasic(false);
    updateShowDetailed(false);
    updateShowResults(false);
  }

  function clickBasic() {
    clearStorage();
    resetResponses();
    updateShowHome(false);
    updateShowBasic(true);
  }

  function clickDetailed() {
    localStorage.removeItem('detailedResponses');
    console.log("Printing local storage", JSON.parse(JSON.stringify(localStorage)));
    updateShowHome(false);
    updateShowDetailed(true);
  }

  function clickResults() {
    updateShowHome(false);
    updateShowResults(true);
  }

  return (
    <div>
      {showHome && (
        <>
          <h1>Career Guide</h1>
          <p className='style1'>
            With so many careers to choose from do you have NO IDEA what you want to do? Our basic career quiz is right for you, click to get started!
            <div><Button onClick={clickBasic}>Basic</Button></div>
          </p>
          <p className="style2">
            Do you have an area of interest already but need help nailing it down? Then our detailed quiz is right for you click to get started!
            <div><Button onClick={clickDetailed}>Detailed</Button></div>
          </p>
          <div>
            <p className='style3'>See Results</p>
            <Button onClick={clickResults}>Results</Button>
          </div>
        </>
      )}

      {showBasic && (
        <>
          <BasicQuestions />
          <Button onClick={clickHome}>Return Home</Button>
        </>
      )}

      {showDetailed && (
        <>
          <DetailedQuestions />
          <Button onClick={clickHome}>Return Home</Button>
        </>
      )}

      {showResults && (
        <>
          <ResultsPage />
          <Button onClick={clickHome}>Return Home</Button>
        </>
      )}
    </div>
  );
}
