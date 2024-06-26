import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import BasicQuestions from "../QuizPages/BasicQuestions";
import DetailedQuestions from "../QuizPages/DetailedQuestions";
import { useUserResponses } from '../contexts/UserResponsesContext';
import { useDetailedResponses } from "../contexts/DetailedResponsesContext";

export function HomePage(): JSX.Element{
  const [showHome, updateShowHome] = useState<boolean>(true);
  const [showDetailed, updateShowDetailed] = useState<boolean>(false);
  const [showBasic, updateShowBasic] = useState<boolean>(false);


  const { setResponses } = useUserResponses();
  const {setDetailedResponses} = useDetailedResponses();

  useEffect(() => {
    // Clears local storage, console, and responses when the component mounts
    console.clear(); 
    clearStorage(); 
    resetResponses();
    setDetailedResponses({});
    // had to be enlist-disbale due to the fact that its only intended to run once. If it ran multiple times would not properly work
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 
  
//functions that changes what pages are shown based on what button was clicked
  function goToDetailedQuestions() {
    updateShowHome(false); 
    updateShowBasic(false); 
    updateShowDetailed(true); 
}

  function resetResponses() {
    setResponses({});
    setDetailedResponses({}); 
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
  }

  function clickBasic() {
    clearStorage();
    resetResponses();
    updateShowHome(false);
    updateShowBasic(true);
  }

  function clickDetailed() {
    clearStorage();
    //localStorage.removeItem('detailedResponses');
    console.log("Printing local storage", JSON.parse(JSON.stringify(localStorage)));
    updateShowHome(false);
    updateShowDetailed(true);
  }

  return (
    //routing for our main pages: home, basic, and detailed
    <div>
      {showHome && (
        <>
          <p style={{ fontFamily: 'Comic Sans MS, cursive'}}>
          Our Basic Quiz will help you select a field of study based on your responses. From there, you can choose to see your field of study by clicking the 'Get my Results!' button or, if you prefer, obtain a specific job recommendation select the 'Continue to Detailed Quiz!' button upon compleation. Either way, click the 'Basic Career Quiz' button below to get started.
            <p><center><Button className="button-53" role="button" onClick={clickBasic}>Basic Career Quiz</Button></center></p>
          </p>
          <p style={{ fontFamily: 'Comic Sans MS, cursive'}}>
          Our Detailed Quiz is designed to help you select very specific careers. While we recommend starting with our 'Basic Quiz' and selecting 'Continue to Detailed Quiz' upon completion for more tailored questions, you are more than welcome to jump ahead if you prefer.
            <p><center><Button className="button-53" role="button" onClick={clickDetailed}>Detailed Career Quiz</Button></center></p>
          </p>
          <div>
          </div>
        </>
      )}

      {showBasic && (
        <>
          <BasicQuestions />
          <p style={{paddingTop: "20%"}}><center><Button className="button-53" 
                     onClick={goToDetailedQuestions}
                     style={{transform: "rotate(1deg)"}}>Continue to Detailed Quiz!</Button></center></p>
          <p><center><Button className="button-53" onClick={clickHome}>Return Home</Button></center></p>
        </>
      )}

      {showDetailed && (
        <>
          <DetailedQuestions />
          <p style={{paddingTop: "10%"}}>
          <center><Button className="button-53" onClick={clickHome}>Return Home</Button></center>
          </p>
        </>
      )}
    </div>
  );
}

     