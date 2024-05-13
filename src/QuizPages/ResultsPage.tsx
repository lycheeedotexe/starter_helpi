import React from "react";
import { FormatResult } from "../components/formatResults";
import resultsDetailed from "../data/resultsDetailed.json";

const ResultsPage = () => {
    return (
        <div>
            <h1>Response Page</h1>
            <div>
                {resultsDetailed.CAREER_RESULTS.filter(j => j.title !== "Title").map((j) => (
                    <FormatResult
                        key={j.id}
                        id={j.id}
                        title={j.title}
                        description={j.description}
                        entrySalary={j.entrySalary}
                        medianSalary={j.medianSalary}
                        // Assuming these values are numeric and properly parsed
                        entrySalaryValue={parseFloat(j.entrySalary.replace(/[^\d.-]/g, ''))}
                        medianSalaryValue={parseFloat(j.medianSalary.replace(/[^\d.-]/g, ''))}
                        education={j.careerPath}
                    />
                ))}
            </div>
        </div>
    );
}

export default ResultsPage;

