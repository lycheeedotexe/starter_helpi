import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { BasicQuestion } from "../QuestionSelection";

export function FormatQuestion({
    question,
    options
}: {
    question: BasicQuestion
    options: string[];
}): JSX.Element {
    const [currentChoice, setCurrentChoice] = useState<string>(options[0]);

    function changeChoice(event: React.ChangeEvent<HTMLSelectElement>) {
        setCurrentChoice(event.target.value);
    }

    return (
        <div>
            <p>question.body</p>
            <Form.Group controlId="Options">
                <Form.Select value={currentChoice} onChange={changeChoice}>
                <option value="" selected>Choose an option...</option>
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
        </div>
    );
}
