import { openai } from "./submitKey";
import { useState } from "react";
import { Button, Form } from 'react-bootstrap';

//silo's jobRecommendation function
import { recommendJobs } from "../QuizFunctions/QuestionSelection";
import questions from "../data/questions.json"
//import { getresponseDictionary } from "../QuizFunctions/getResponseVector"
//import { DetailedResponsesContext } from "../contexts/DetailedResponsesContexts"

export type JobFieldDescr = string;

export function SubmitBasic(): JSX.Element{
    const [gptResponse, setGptResponse] = useState<string | null>("no response");
    
    //silo's jobRecommendation function
    const dataCopy = JSON.parse(JSON.stringify(questions));
    //sampledKeys = object.keys(detailedResponses).map(key => parseInt(key,10));
    //const responseDict = getResponseDictionary(detailedResponses);
    //const recommendedJob = recommendJobs(dataCopy, responseDict, sampledKeys)

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