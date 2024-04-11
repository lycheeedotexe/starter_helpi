import React, { useState } from "react";
import { Button } from "react-bootstrap";
// import { ButtonToggle } from "./button_helper";

// interface HomeButtonProps {
//     showHome: boolean;
//     setShowHome: (updateHome: boolean) => void;
// }

// function clickHome({setShowHome}: HomeButtonProps): void {
//     setShowHome(true);
//     //setShowBasicQuestions(false);
//     //setShowDetailedQuestions(false);
// }

// function ClickHome({showHome, setShowHome}:HomeButtonProps) {
//     return (
//         <Button onClick={() => {setShowHome(!showHome);/*set to true*/}}>home</Button>
//     )
// }

export function HomeButton(): JSX.Element {
    const [showHome, setShowHome] = useState<boolean>(true);
    return (
        <div>
            {/* <ClickHome showHome={showHome} setShowHome={setShowHome}></ClickHome> */}
            <Button onClick={() => setShowHome(true)}>Home</Button>
            <span>home var: {showHome && "true"}</span>{/*delete later*/}
        </div>
    )
}

//export const homeVar = showHome;