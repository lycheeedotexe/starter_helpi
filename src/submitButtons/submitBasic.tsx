import { openai } from "./submitKey";
import { useState } from "react";
import { Button, Form } from 'react-bootstrap';

export function SubmitBasic(): JSX.Element{
    const [gptResponse, setGptResponse] = useState<string | null>("no response");

    const [text, setText] = useState<string>("what does a software engineer do?");
    function changeText(event: React.ChangeEvent<HTMLInputElement>) {
        setText(event.target.value);
    }

    const getResponseFunction = async() => {
        const response = await openai.chat.completions.create({
            messages: [{"role": "system", "content": "You are a robot career counselor named Perceptron, with the ability to peer into college student's souls and give the best career advice."},
                {"role": "user", "content": text}],
            model: "gpt-4-turbo"
        })
        setGptResponse(response.choices[0].message.content);
    }

    return (
        <div>
            {gptResponse}
            <Form>
                <Form.Label>test</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={3}
                    value={text}
                    onChange={changeText}></Form.Control>
                <br></br>
                <Button className="Submit-Button" onClick={getResponseFunction}>Submit question</Button>
            </Form>
        </div>
    )
}