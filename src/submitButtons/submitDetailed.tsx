import { openai } from "./submitKey";
import { Button, Form } from 'react-bootstrap';
import resultsDetailed from "../data/resultsDetailed.json"

import React, { useContext} from "react";
import questions from "../data/questions.json";
import { getResponseDictionary } from "../QuizFunctions/getResponseVector";
import { DetailedResponsesContext } from "../contexts/DetailedResponsesContext";
import { recommendJobs } from "../QuizFunctions/QuestionSelection";

export function SubmitDetailed(): JSX.Element{
    const dataCopy = JSON.parse(JSON.stringify(questions));
    const {detailedResponses} = useContext(DetailedResponsesContext);
    const sampledKeys = Object.keys(detailedResponses).map(key => parseInt(key, 10));
    const responseDict = getResponseDictionary(detailedResponses);
    const recommendations = recommendJobs(dataCopy, responseDict, sampledKeys);
    let loading = "not done";

    const getResponseFunction = async() => {
        for(var i = 0; i < 3; i++) {
            resultsDetailed.CAREER_RESULTS[i].title = recommendations[i].name;
            const question = [`Generate a 1-3 sentence job description for "${recommendations[i].name}".`,
                              `In one sentence, state the entry or starting salary as a dollar amount for "${recommendations[i].name}".`,
                              `In one sentence, state the median or average salary as a dollar amount for "${recommendations[i].name}".`,
                              `What is the career path or steps to becoming a "${recommendations[i].name}".`
                            ]
            for(var j = 0; j < 4; j++) {
                const response = await openai.chat.completions.create({
                    messages: [{"role": "system", "content": "You are generating career report information that is being inputted into a JSON file."},
                        {"role": "user", "content": question[j]}
                    ],
                    model: "gpt-4-turbo",
                })
                console.log(response);
                if(response.choices[0].message.content !== null) {
                    if(j === 0){
                        resultsDetailed.CAREER_RESULTS[i].description = response.choices[0].message.content;
                    } else if(j === 1){
                        resultsDetailed.CAREER_RESULTS[i].entrySalary = response.choices[0].message.content;
                    } else if(j === 2){
                        resultsDetailed.CAREER_RESULTS[i].medianSalary = response.choices[0].message.content;
                    } else if(j === 3){
                        resultsDetailed.CAREER_RESULTS[i].careerPath = response.choices[0].message.content.replace("**","").split("\n");
                    }
                }
            }
        }
        console.log(resultsDetailed);
        loading = "done";
    }

    return (
        <div>
            <Form>
                <Form.Label>detailed response</Form.Label>
                <br></br>
                {loading}
                <br></br>
                <Button className="Submit-Button" onClick={getResponseFunction}>Submit question</Button>
            </Form>
        </div>
    )
}