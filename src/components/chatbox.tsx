//implementation of chatbox feature
import { openai } from "../submitButtons/submitKey";
import { useState } from "react";
import { Button, Form } from 'react-bootstrap';

export function ChatBox(): JSX.Element{
    const [gptResponse, setGptResponse] = useState<string | null>();
    const [text, setText] = useState<string>("what does a software engineer do?");

    //records what the user types to send back to ChatGPT
    function changeText(event: React.ChangeEvent<HTMLInputElement>) {
        setText(event.target.value);
    }

    //API call
    const getResponseFunction = async() => {
        const response = await openai.chat.completions.create({
            messages: [{"role": "system", "content": "You are a robot career counselor named Perceptron, with the ability to peer into college student's souls and give the best career advice."},
                {"role": "user", "content": text}],
            model: "gpt-4-turbo"
        })
        setGptResponse(response.choices[0].message.content);
        console.log(response);
    }

    //the chatbox
    return (
        <div>
            <Form>
                <Form.Label>Have a career question? Ask here!</Form.Label>
                <Form.Control 
                    as="textarea" 
                    placeholder="Have a career question? Ask here!"
                    rows={3}
                    value={text}
                    onChange={changeText}></Form.Control>
                <br></br>
                <center><Button className="button-53" style={{backgroundColor: "#84A59D"}} onClick={getResponseFunction}>Submit my question</Button></center>
                <br></br>
                <Form.Label>AI Response:</Form.Label>
            <p style={{padding:"0 5% 0"}}>{gptResponse}</p>
            </Form>
        </div>
    )
}