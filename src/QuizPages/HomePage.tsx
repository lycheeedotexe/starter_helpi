import React, { useDebugValue, useState } from "react";
import { Button } from "react-bootstrap";
import BasicQuestions from "../QuizPages/BasicQuestions";
import DetailedQuestions from "../QuizPages/DetailedQuestions";
import ResultsPage from "./ResultsPage";
import { useUserResponses } from '../contexts/UserResponsesContext';
import { useDetailedResponses } from "../contexts/DetailedResponsesContext";

export function HomePage(): JSX.Element{
  const [showHome, updateShowHome] = useState<boolean>(true);
  const [showDetailed, updateShowDetailed] = useState<boolean>(false);
  const [showBasic, updateShowBasic] = useState<boolean>(false);
  const [showResults, updateShowResults] = useState<boolean>(false);


  const { setResponses } = useUserResponses();
  const {setDetailedResponses} = useDetailedResponses();

  function goToDetailedQuestions() {
    updateShowHome(false); 
    updateShowBasic(false); 
    updateShowDetailed(true); 
    updateShowResults(false); 
}

  function resetResponses() {
    setResponses({});
    setDetailedResponses({}); // Assuming this resets to the initial state
  }

  function clearStorage() {
    localStorage.removeItem("detailedQuestions");
  }

  function clickHome() {
    resetResponses();
    clearStorage();
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
          <p>
            With so many careers to choose from do you have NO IDEA what you want to do? Our basic career quiz is right for you, click to get started!
            <p><center><Button className="button-53" role="button" onClick={clickBasic}>Basic Career Quiz</Button></center></p>
          </p>
          <p>
            Do you have an area of interest already but need help nailing it down? Then our detailed quiz is right for you click to get started!
            <p><center><Button className="button-53" role="button" onClick={clickDetailed}>Detailed Career Quiz</Button></center></p>
          </p>
          <div>
          </div>
        </>
      )}

      {showBasic && (
        <>
          <BasicQuestions />
          <Button onClick={goToDetailedQuestions}>Continue</Button>
          <Button onClick={clickHome}>Return Home</Button>
        </>
      )}

      {showDetailed && (
        <>
          <DetailedQuestions />
          <Button onClick={clickHome}>Return Home</Button>
          <p>See Results</p>
          <Button onClick={clickResults}>See My Results!</Button>
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
