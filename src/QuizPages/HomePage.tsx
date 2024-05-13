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
    updateShowDetailed(false);
    updateShowBasic(false);
  }

  return (
    <div>
      {showHome && (
        <>
          <p>
          Our Basic Quiz will help you select a field of study based on your responses. From there, you can choose to see your field of study or, if you prefer, obtain a specific job recommendation select the 'Continue' button upon compleation. Either way, click the 'Basic' button below to get started.
            <p><center><Button className="button-53" role="button" onClick={clickBasic}>Basic Career Quiz</Button></center></p>
          </p>
          <p>
          Our Detailed Quiz is designed to help you select very specific careers. While we recommend starting with our 'Basic Quiz' and selecting 'Continue' upon completion for more tailored questions, you are more than welcome to jump ahead if you prefer.
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

     