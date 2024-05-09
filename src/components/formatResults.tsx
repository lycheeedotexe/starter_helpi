import React, { useState } from "react";
import { Card, ListGroup} from "react-bootstrap";

interface FormatResultsProps {
    jobs : string[];
    salary : number;
    education : string[];
}


export function displayResultInfo ({ jobs, salary, education} : FormatResultsProps): JSX.Element {
    return(
        <div className="results-container">
            <Card className="text-center">
                <Card.Header>Your Job Results</Card.Header>
                <Card.Body>
                    <Card.Title>Job Description</Card.Title>
                    <ListGroup variant="flush">
                        {jobs.map((job, index) => (
                            <ListGroup.Item key={index}>{job}</ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card.Body>
            </Card>

            <Card className="text-center mt-3">
                <Card.Header>Salary Information</Card.Header>
                <Card.Body>
                    <Card.Title>Job Salary Range</Card.Title>
                    <Card.Text>
                        ${salary.toLocaleString()} per annum
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card className="text-center mt-3">
                <Card.Header>Education Required</Card.Header>
                <Card.Body>
                    <Card.Title>Educational Qualifications</Card.Title>
                    <ListGroup variant="flush">
                        {education.map((edu, index) => (
                            <ListGroup.Item key={index}>{edu}</ListGroup.Item>
                        ))}      
                    </ListGroup>
                </Card.Body>
            </Card>
        </div>

    );

}

