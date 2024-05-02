import React, { useState } from "react";
import { BasicQuestion,DetailedQuestion } from "../QuizFunctions/QuestionSelection";
import { Form } from "react-bootstrap";


type questionType = BasicQuestion | DetailedQuestion;

export function FormatQuestion({
    question,
    options,
    onChoiceChange
}: {
    question: questionType;
    options: string[];
    onChoiceChange: (value: string) => void
}): JSX.Element {
    const [currentChoice, setCurrentChoice] = useState<string>(options[0]);

    function changeChoice(event: React.ChangeEvent<HTMLSelectElement>) {
        setCurrentChoice(event.target.value);
        onChoiceChange(event.target.value);
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