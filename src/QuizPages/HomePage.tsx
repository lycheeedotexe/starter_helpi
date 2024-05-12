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
          <h1>Career Guide</h1>
          <p className='style1'>
          Our Basic Quiz will help you select a field of study based on your responses. From there, you can choose to see your recommended field of study by selecting the 'Results' button or, if you prefer, obtain a specific job recommendation select our 'Continue' button. Either way, click the 'Basic' button below to get started
            
            <div><Button onClick={clickBasic}>Basic</Button></div>
          </p>
          <p className="style2">
          Our Detailed Quiz is designed to help you select very specific careers. While we recommend starting with our 'Basic Quiz' and selecting 'Continue' upon completion for more tailored questions, you are more than welcome to jump ahead if you prefer.
            <div><Button onClick={clickDetailed}>Detailed</Button></div>
          </p>
          <div>
            <div>
            <p className='style3'>See Results</p>
            <Button onClick={clickResults}>Results</Button>
            </div>
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
