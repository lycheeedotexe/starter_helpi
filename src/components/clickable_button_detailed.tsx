import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DetailedQuestions from '../QuizPages/DetailedQuestions';


const ClickableButtonDetailed = () => {
    const [showDetailedQuestions, setShowDetailedQuestions] = useState(false);
  
    return (
      <div>
        <Button onClick={() => setShowDetailedQuestions(true)}>Detailed Career Quiz</Button>
        {showDetailedQuestions && <DetailedQuestions />}
      </div>
    );
  };
  
  export default ClickableButtonDetailed;