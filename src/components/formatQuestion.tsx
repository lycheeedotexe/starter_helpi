import React, { useState } from "react";
import { BasicQuestion } from "../QuestionSelection";
import { Form } from "react-bootstrap";

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
            <p>{question.body}</p>
            <Form.Group controlId="Options">
                <Form.Select value={currentChoice} onChange={changeChoice}>
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