//import React, { useState } from "react";
import { Card, ListGroup} from "react-bootstrap";
import {Job} from "../QuizFunctions/QuestionSelection"
interface FormatResultsProps {
    job : Job;
    description: string;
    salary : string;
    education : string;
}


export function FormatResult ({ job, description, salary, education} : FormatResultsProps): JSX.Element {
    return(
        <div className="results-container">
            <Card className="text-center">
                <Card.Header>Your Job Results</Card.Header>
                <Card.Body>
                    <Card.Title>Job Description</Card.Title>
                    <ListGroup variant="flush">
                    <ListGroup.Item key={job.id}>{job.name}</ListGroup.Item>
                    <ListGroup.Item key={job.id}>{description}</ListGroup.Item>
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
                    <ListGroup.Item key={job.id}>{education}</ListGroup.Item>
                    </ListGroup>

                </Card.Body>
            </Card>
        </div>

    );

}

