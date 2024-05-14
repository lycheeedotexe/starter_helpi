import React from "react";
import { FormatBasicResults } from "../components/formatBasicResults";
import resultsBasic from "../data/resultsBasic.json"
import { ChatBox } from "../components/chatbox";

const BasicResultsPage = () => {   
    return ( 
        <div style={{textShadow:"none"}}>
            {resultsBasic.BASIC_RESULTS.filter(j => j.name !== "None").map((j) => {
                return <FormatBasicResults
                    id={j.id}
                    title={j.name}
                    description={j.description}
                ></FormatBasicResults>
                })}
            <ChatBox/>
        </div>)
}

export default BasicResultsPage;