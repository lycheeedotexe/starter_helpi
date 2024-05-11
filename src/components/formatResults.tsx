//import React, { useState } from "react";
import { Card, ListGroup} from "react-bootstrap";
//import {Job} from "../QuizFunctions/QuestionSelection"
interface FormatResultsProps {
    id : number;
    title : string;
    description: string;
    entrySalary : string;
    medianSalary: string;
    education : string[];
}


export function FormatResult ({ id, title, description, entrySalary, medianSalary, education} : FormatResultsProps): JSX.Element {
    return(
        <div className="results-container">
            <Card className="text-center">
                <Card.Header>Your Job Results</Card.Header>
                <Card.Body>
                    <Card.Title>Job Description</Card.Title>
                    <ListGroup variant="flush">
                    <ListGroup.Item key={id}>{title}</ListGroup.Item>
                    <ListGroup.Item key={id}>{description}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>

            <Card className="text-center mt-3">
                <Card.Header>Salary Information</Card.Header>
                <Card.Body>
                    <Card.Title>Job Salary Range</Card.Title>
                    <Card.Text>
                        Entry salary: {entrySalary}
                        <br></br>
                        Median Salary: {medianSalary}
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card className="text-center mt-3">
                <Card.Header>Education Required</Card.Header>
                <Card.Body>
                    <Card.Title>Educational Qualifications</Card.Title>
                    <ListGroup variant="flush">
                    <ListGroup.Item key={id}>{education.map((x) => (
                        <p className="p2">{x}</p>
                    ) )}</ListGroup.Item>
                    </ListGroup>

                </Card.Body>
            </Card>
            <br></br>
        </div>

    );

}

