import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import BarGraph from "../components/BarGraph"; // Ensure this import path is correct

interface FormatResultsProps {
    id: number;
    title: string;
    description: string;
    entrySalary: string;
    medianSalary: string;
    entrySalaryValue: number; // Numeric value for the graph
    medianSalaryValue: number; // Numeric value for the graph
    education: string[];
}

export function FormatResult({
    id,
    title,
    description,
    entrySalary,
    medianSalary,
    entrySalaryValue,
    medianSalaryValue,
    education
}: FormatResultsProps): JSX.Element {
    // Prepare the data for the BarGraph
    const salaryData = [
        { name: "Entry Salary", value: entrySalaryValue },
        { name: "Median Salary", value: medianSalaryValue }
    ];

    return (
        <div className="results-container">
            <Card className="text-center">
                <Card.Header>Your Job Results</Card.Header>
                <Card.Body>
                    <Card.Title>Job Description</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>{title}</ListGroup.Item>
                        <ListGroup.Item>{description}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>

            <Card className="text-center mt-3">
                <Card.Header>Salary Information</Card.Header>
                <Card.Body>
                    <Card.Title>Job Salary Range</Card.Title>
                    <Card.Text>
                        Entry Salary: {entrySalary}
                        <br />
                        Median Salary: {medianSalary}
                    </Card.Text>
                    {/* BarGraph to visualize the salary */}
                    <BarGraph data={salaryData} color="#4a90e2" />
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
            <br />
        </div>
    );
}


