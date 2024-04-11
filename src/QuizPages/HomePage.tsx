import React from "react";
//import { render, screen } from "@testing-library/react";
import ClickableButtonDetailed from "../components/clickable_button_detailed";
import ClickableButtonBasic from "../components/clickable_button_basic";
import './HomePage.css';
import '../QuizPages/BasicQuestions';
import '../QuizPages/DetailedQuestions';

const HomePage = () => {
    // Make sure to return some JSX here
    return (
      <div>
        <h1>Career Quiz Home Page</h1>
        <div>
        <p>Are you lost in the sauce? Do you have NO IDEA what you want to do? Our basic career quiz is right for you, click to get started!</p>
        <ClickableButtonBasic></ClickableButtonBasic>
        </div>
        <div>
        <p>Do you have an area of interest already but need help nailing it down? Then our detailed quiz is right for you click to get started! </p>
        <ClickableButtonDetailed></ClickableButtonDetailed>
        </div>
      </div>
    );
  };
  
  export default HomePage;