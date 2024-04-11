//import { render, screen } from "@testing-library/react";
import ClickableButtonDetailed from "../components/clickable_button_detailed";
import ClickableButtonBasic from "../components/clickable_button_basic";
import {Home} from "../components/clickable_home_button";

export function HomePage(): JSX.Element {
    return (
      <div>
        <h1>Home Page</h1>
        <Home></Home>
        <ClickableButtonBasic></ClickableButtonBasic>
        <ClickableButtonDetailed></ClickableButtonDetailed>
      </div>
    );
  }