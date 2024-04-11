import React, { useState } from "react";
import { Button } from "react-bootstrap";

interface HomeButtonProps {
    showHome: boolean;
    setShowHome: (updateHome: boolean) => void;
}

// function clickHome({setShowHome}: HomeButtonProps): void {
//     setShowHome(true);
//     //setShowBasicQuestions(false);
//     //setShowDetailedQuestions(false);
// }

function HomeButton({showHome, setShowHome}:HomeButtonProps) {
    return (
        <Button onClick={() => {setShowHome(!showHome);}}>home</Button>
    )
}

export function Home(): JSX.Element {
    const [showHome, setShowHome] = useState<boolean>(true);
    return (
        <HomeButton showHome={showHome} setShowHome={setShowHome}></HomeButton>
    )
}