import React from "react";
import { FormatBasicResults } from "../components/formatBasicResults";
import resultsBasic from "../data/resultsBasic.json"

const BasicResultsPage = () => {   
    return ( 
        <div>
            {resultsBasic.BASIC_RESULTS.filter(j => j.description !== "Description").map((j) => {
                return <FormatBasicResults
                    id={j.id}
                    title={j.name}
                    description={j.description}
                ></FormatBasicResults>
                })}
    </div>)
}

export default BasicResultsPage;