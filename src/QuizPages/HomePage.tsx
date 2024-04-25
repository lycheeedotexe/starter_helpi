import React, { useState } from "react";
import { Button } from "react-bootstrap";
//import { render, screen } from "@testing-library/react";
import BasicQuestions from "../QuizPages/BasicQuestions";
import DetailedQuestions from "../QuizPages/DetailedQuestions";

export function HomePage(): JSX.Element{
  const [showHome, updateShowHome] = useState<boolean>(true);
  const [showDetailed, updateShowDetailed] = useState<boolean>(false);
  const [showBasic, updateShowBasic] = useState<boolean>(false);

  function clickHome() {
    updateShowHome(true);
    updateShowBasic(false);
    updateShowDetailed(false);
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
        {showHome && (
          <>
            <h1>Career Guide</h1>

            <p className='style1'>With so many careers to choose from do you have NO IDEA what you want to do? Our basic career quiz is right for you, click to get started!
           <div> <Button onClick={clickBasic}>Basic</Button> </div> </p>
            <p className="style2">Do you have an area of interest already but need help nailing it down? Then our detailed quiz is right for you click to get started! 
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
    );
  };