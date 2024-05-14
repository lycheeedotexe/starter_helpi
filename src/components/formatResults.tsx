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
                <Card.Header style={{ fontWeight: 'bold', color: '#597cf0', fontStyle: 'italic' ,  fontFamily: 'Comic Sans MS, cursive' }}>Your Job Results</Card.Header>
                <Card.Body>
                    <Card.Title style={{ fontWeight: 'bold', color: '#597cf0', fontStyle: 'italic' ,  fontFamily: 'Comic Sans MS, cursive' }}>Job Description</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item style={{ fontWeight: 'bold', color: '#f71460', fontStyle: 'italic' ,  fontFamily: 'Comic Sans MS, cursive' }}>{title}</ListGroup.Item>
                        <ListGroup.Item style={{  color: '#08c97f', fontStyle: 'italic' ,  fontFamily: 'Comic Sans MS, cursive' }}>{description}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>

            <Card className="text-center mt-3">
                <Card.Header style={{ fontWeight: 'bold', color: '#597cf0', fontStyle: 'italic' ,  fontFamily: 'Comic Sans MS, cursive' }}>Salary Information</Card.Header>
                <Card.Body>
                    <Card.Title style={{ fontWeight: 'bold', color: '#597cf0', fontStyle: 'italic' ,  fontFamily: 'Comic Sans MS, cursive' }}>Job Salary Range</Card.Title>
                    <Card.Text style={{color: '#08c97f',fontStyle: 'italic' ,  fontFamily: 'Comic Sans MS, cursive' }}>
                        Average Entry Salary: $ {entrySalary}
                        <br />
                        Average Median Salary: $ {medianSalary}
                    </Card.Text>
                    {/* BarGraph to visualize the salary */}
                    
                    <BarGraph data={salaryData} color="#b745f5" />
                </Card.Body>
            </Card>

            <Card className="text-center mt-3">
                <Card.Header style={{ fontWeight: 'bold', color: '#597cf0', fontStyle: 'italic' ,  fontFamily: 'Comic Sans MS, cursive' }}>Education Required</Card.Header>
                <Card.Body style={{color:'#08c97f', fontStyle: 'italic' ,  fontFamily: 'Comic Sans MS, cursive' }}>
                    <Card.Title style={{ fontWeight: 'bold', color: '#597cf0', fontStyle: 'italic' ,  fontFamily: 'Comic Sans MS, cursive' }}>Educational Qualifications</Card.Title>
                    <ListGroup variant="flush">
                        {education.map((edu, index) => (
                            <ListGroup.Item key={index} style={{color:'#08c97f', fontStyle: 'italic' ,  fontFamily: 'Comic Sans MS, cursive' }}>{edu}</ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card.Body>
            </Card>
            <br />
        </div>
    );
}


