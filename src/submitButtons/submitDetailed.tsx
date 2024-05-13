import { openai } from "./submitKey";
import { Button, Form } from 'react-bootstrap';
import resultsDetailed from "../data/resultsDetailed.json"
import { LoadingPage } from "../components/Loading";
import { useContext, useState} from "react";
import questions from "../data/questions.json";
import { getResponseDictionary } from "../QuizFunctions/getResponseVector";
import { DetailedResponsesContext } from "../contexts/DetailedResponsesContext";
import { recommendJobs } from "../QuizFunctions/QuestionSelection";

import ResultsPage from "../QuizPages/ResultsPage";

export function SubmitDetailed(): JSX.Element{
    const dataCopy = JSON.parse(JSON.stringify(questions));
    const {detailedResponses} = useContext(DetailedResponsesContext);
    const sampledKeys = Object.keys(detailedResponses).map(key => parseInt(key, 10));
    const responseDict = getResponseDictionary(detailedResponses);
    const recommendations = recommendJobs(dataCopy, responseDict, sampledKeys);
    const [loading, setLoading] = useState<boolean>(false);
    const [seeResults, setSeeResults] = useState<boolean>(false);

    const num = recommendations.length;
    console.log("number of jobs: " + num);

    const getResponseFunction = async() => {
        let recs;
        setLoading(true)
        if(num === 0) {
            const a = 1 + Math.floor(Math.random() * 50);
            let b = 1 + Math.floor(Math.random() * 50);
            let c = 1 + Math.floor(Math.random() * 50);
            while(b === a) {
                b = 1 + Math.floor(Math.random() * 50);
            }
            while(c === a || c === b) {
                c = 1 + Math.floor(Math.random() * 50);
            }
            recs = [questions.JOBS[a], questions.JOBS[b], questions.JOBS[c]];
        } else {
            recs = [...recommendations];
        }
        console.log(recs);
        for(var i = 0; i < recs.length; i++) {
            resultsDetailed.CAREER_RESULTS[i].title = recs[i].name;
            const question = [`Generate a 1-3 sentence job description for "${recs[i].name}".`,
                              `In one sentence, state the entry or starting salary as a dollar amount for "${recs[i].name}".`,
                              `In one sentence, state the median or average salary as a dollar amount for "${recs[i].name}".`,
                              `What is the career path or steps to becoming a "${recs[i].name}". Remove any * and # in the response.`
                            ]
            for(var j = 0; j < 4; j++) {
                const response = await openai.chat.completions.create({
                    messages: [{"role": "system", "content": "You are a robot career counselor named Perceptron, with the ability to peer into college student's souls and give the best career advice."},
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
        setLoading(false);
        setSeeResults(true);
    }

    return (
        <div>
            <Form>
                <br></br>
                <Button className="Submit-Button" onClick={getResponseFunction}>Submit question</Button>
                {!loading && seeResults &&
                    <ResultsPage></ResultsPage>
                }
            </Form>
        </div>
    );
}






