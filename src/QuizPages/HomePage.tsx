import React from "react";
//import { render, screen } from "@testing-library/react";
import ClickableButtonDetailed from "../components/clickable_button_detailed";
import ClickableButtonBasic from "../components/clickable_button_basic"

const HomePage = () => {
    // Make sure to return some JSX here
    return (
      <div>
        <h1>Home Page</h1>
        <ClickableButtonBasic></ClickableButtonBasic>
        <ClickableButtonDetailed></ClickableButtonDetailed>
      </div>
    );
  };
  
  export default HomePage;