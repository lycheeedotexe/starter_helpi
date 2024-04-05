//button for basic questions
//Create a clickable button for the basic career assessment that navigates to the basic career assessment page.

import React, { useState } from "react";
import { Button } from "react-bootstrap";
import BasicQuestions from '../QuizPages/BasicQuestions';


const ClickableButtonBasic = () => {
    const [showBasicQuestions, setShowBasicQuestions] = useState(false);
  
    return (
      <div>
        <Button onClick={() => setShowBasicQuestions(true)}>Basic Career Quiz</Button>
        {showBasicQuestions && <BasicQuestions />}
      </div>
    );
  };
  
  export default ClickableButtonBasic;


