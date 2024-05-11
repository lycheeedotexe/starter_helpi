import { openai } from "./submitKey";
import { Button, Form } from 'react-bootstrap';
import resultsDetailed from "../data/resultsDetailed.json"

import React, { useContext} from "react";
import { Job } from '../QuizFunctions/QuestionSelection'
import questions from "../data/questions.json";
import { getResponseDictionary } from "../QuizFunctions/getResponseVector";
import { DetailedResponsesContext } from "../contexts/DetailedResponsesContext";
import { recommendJobs } from "../QuizFunctions/QuestionSelection";

export type JobFieldDescr = string;

export function SubmitDetailed(): JSX.Element{
    const dataCopy = JSON.parse(JSON.stringify(questions));
    const {detailedResponses} = useContext(DetailedResponsesContext);
    const sampledKeys = Object.keys(detailedResponses).map(key => parseInt(key, 10));
    const responseDict = getResponseDictionary(detailedResponses);
    const recommendations = recommendJobs(dataCopy, responseDict, sampledKeys);

    const getResponseFunction = async() => {
        const response = await openai.chat.completions.create({
            messages: [{"role": "system", "content": `You are a robot career counselor named Perceptron, with the ability to peer into college student's souls and give the best career advice. Provide output in valid JSON. The data schema should be like this: ${resultsDetailed}`},
                {"role": "user", "content": `Generate JSON file for "${recommendations.map((j:Job) => (j.name + ", "))}" that includes the job title with the key "title", a short 1-3 sentence description of each job with the key "description", an entry salary with the key "entrySalary", a median salary with the key "medianSalary", and as an array a career path that tells the steps to achieving each job with the key "careerPath".`}],
            model: "gpt-4-turbo",
            response_format:{"type": "json_object"}
        })
        console.log(response);
        const results = response.choices[0].message.content
        if (results !== null) {
        console.log(results[0]);
        } else {
            console.log(resultsDetailed.CAREER_RESULTS);
        }
    }

    return (
        <div>
            <Form>
                <Form.Label>detailed response</Form.Label>
                <br></br>
                <Button className="Submit-Button" onClick={getResponseFunction}>Submit question</Button>
            </Form>
        </div>
    )
}