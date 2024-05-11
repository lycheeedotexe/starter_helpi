import { FormatResult } from "../components/formatResults";

import resultsDetailed from "../data/resultsDetailed.json"

const ResultsPage = () => {

    return(
<div>
      <h1>Response Page</h1>
      <div>
      {resultsDetailed.CAREER_RESULTS.filter((j): boolean => j.title !== "Title").map((j) => (
            <FormatResult
                id={j.id}
                title = {j.title}
                description={j.description} 
                entrySalary={j.entrySalary} 
                medianSalary={j.entrySalary}
                education={j.careerPath}
            ></FormatResult>
        )
        )
      }
      </div>
</div>
    )
    

}
export default ResultsPage;
