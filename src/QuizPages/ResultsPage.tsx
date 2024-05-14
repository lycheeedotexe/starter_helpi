import React from "react";
import { FormatResult } from "../components/formatResults";
import resultsDetailed from "../data/resultsDetailed.json";

const ResultsPage = () => {
    return (
        <div>
            
            <div>
                {resultsDetailed.CAREER_RESULTS.filter(j => j.title !== "Title").map((j) => {
                    // Regex to extract dollar amounts correctly
                    const entryMatches = j.entrySalary.match(/\$\d{1,3}(,\d{3})*(\.\d{2})?/g) || [];
                    const medianMatches = j.medianSalary.match(/\$\d{1,3}(,\d{3})*(\.\d{2})?/g) || [];

                    // Convert matches to numbers by removing non-numeric characters except the decimal point
                    const entryValues = entryMatches.map(s => parseFloat(s.replace(/[^\d.]/g, '')));
                    const medianValues = medianMatches.map(s => parseFloat(s.replace(/[^\d.]/g, '')));

                    // Calculate average or use a single value
                    const entryAverage = entryValues.length > 0 ? entryValues.reduce((a, b) => a + b, 0) / entryValues.length : 0;
                    const medianAverage = medianValues.length > 0 ? medianValues.reduce((a, b) => a + b, 0) / medianValues.length : 0;

                    return <FormatResult
                        key={j.id}
                        id={j.id}
                        title={j.title}
                        description={j.description}
                        entrySalary={j.entrySalary}
                        medianSalary={j.medianSalary}
                        entrySalaryValue={entryAverage}  // Use calculated average
                        medianSalaryValue={medianAverage}  // Use calculated average
                        education={j.careerPath}
                    />;
                })}
            </div>
        </div>
    );
}

export default ResultsPage;





