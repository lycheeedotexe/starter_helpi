import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { BasicQuestion, DetailedQuestion } from "../QuestionSelection";

type questionType = BasicQuestion | DetailedQuestion;

interface FormatQuestionProps {
    question: questionType;
    options: string[];
    onChoiceChange: (value: string) => void;
}

export function FormatQuestion({ question, options, onChoiceChange }: FormatQuestionProps): JSX.Element {
    const [currentChoice, setCurrentChoice] = useState<string>("");

    function changeChoice(event: React.ChangeEvent<HTMLSelectElement>) {
        setCurrentChoice(event.target.value);
        if (event.target.value !== "") {
            onChoiceChange(event.target.value);
        }
    }

    return (
        <div>
            <p>{question.body}</p>
            <Form.Group controlId="Options">
                <Form.Select value={currentChoice} onChange={changeChoice}>
                <option value="" disabled selected>Choose an option...</option>
                    {options.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </Form.Select>
            </Form.Group>
        </div>
    );
}





