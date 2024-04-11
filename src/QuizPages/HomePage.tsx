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
            <h1>Career Quiz Home Page</h1>
            <p>Are you lost in the sauce? Do you have NO IDEA what you want to do? Our basic career quiz is right for you, click to get started!</p>
            <Button onClick={clickBasic}>Basic</Button>
            <p>Do you have an area of interest already but need help nailing it down? Then our detailed quiz is right for you click to get started! </p>
            <Button onClick={clickDetailed}>Detailed</Button>
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