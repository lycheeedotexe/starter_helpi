// import { openai } from "./submitKey";
// import { useState } from "react";
// import { Button, Form } from 'react-bootstrap';

// export type JobFieldDescr = string;

// export function SubmitBasic(): JSX.Element{
//     const [gptResponse, setGptResponse] = useState<string | null>("no response");

//     const [text, setText] = useState<string>("what does a software engineer do?");
//     function changeText(event: React.ChangeEvent<HTMLInputElement>) {
//         setText(event.target.value);
//     }

//     const getResponseFunction = async() => {
//         const response = await openai.chat.completions.create({
//             messages: [{"role": "system", "content": "You are a robot career counselor named Perceptron, with the ability to peer into college student's souls and give the best career advice."},
//                 {"role": "user", "content": text}],
//             model: "gpt-4-turbo"
//         })
//         setGptResponse(response.choices[0].message.content);
//         console.log(response);
//     }

//     return (
//         <div>
//             {gptResponse}
//             <Form>
//                 <Form.Label>test</Form.Label>
//                 <Form.Control 
//                     as="textarea" 
//                     rows={3}
//                     value={text}
//                     onChange={changeText}></Form.Control>
//                 <br></br>
//                 <center><Button className="button-53" style={{backgroundColor: "#84A59D"}} onClick={getResponseFunction}>Submit question</Button></center>
//             </Form>
//         </div>
//     )
// }
import {useContext, useState} from "react";
import {UserResponsesContext} from '../contexts/UserResponsesContext'
import { constructFinalMeasure } from "../QuizFunctions/QuestionSelection";
import questions from "../data/questions.json"
import { getResponseVector } from "../QuizFunctions/getResponseVector";
import { DetailedQuestionsInAgreement, Job } from "../QuizFunctions/QuestionSelection";
import { openai } from "../submitButtons/submitKey"
import { Button } from "react-bootstrap"
import resultsBasic from "../data/resultsBasic.json"
import BasicResultsPage from "../QuizPages/BasicResultsPage";
import { LoadingPage } from "../components/Loading";

const jobClusters: Record<number, string> = {
    1:"Technology",
    2:"Healthcare",
    3:"Business",
    4:"Engineering",
    5:"Arts, Media, Communication",
    6:"Education",
    7:"Legal and Government",
    8:"Science and Research",
    9:"Trades and Construction",
    10:"Hospitality and Tourism"
}



export function SubmitBasic(): JSX.Element{
    const dataCopy = JSON.parse(JSON.stringify(questions))
    const {responses} = useContext(UserResponsesContext);
    const responseVec = getResponseVector(responses);
    const measure = constructFinalMeasure(dataCopy,responseVec);
const [isLoading, setIsLoading] = useState<boolean>(false);


    const relatedQuestions = (k: number): number[] =>{
        const clusterID = (k-1) % 10;
        const clusterKeys = [5*clusterID + 1, 5* clusterID+2, 5*clusterID+3,5*clusterID+4,5*clusterID+5];
        return DetailedQuestionsInAgreement(dataCopy.JOBS.filter((j: Job) => clusterKeys.includes(j.id)));
    };
    const clusterProbability = (k: number): number=>{
        const questionIDs = relatedQuestions(k);
        return questionIDs.reduce((acc, i) => acc + measure[i-1], 0.0);
    }
    const rankedClusters = [1,2,3,4,5,6,7,8,9,10].sort((a,b) => clusterProbability(b) - clusterProbability(a)); //sorts in reverse
    const topClusterID = rankedClusters[0];
    console.log(`topClusterID = ${topClusterID}`)
    const clusterKeys = [5*topClusterID + 1, 5* topClusterID+2, 5*topClusterID+3,5*topClusterID+4,5*topClusterID+5];
    const relatedJobs = clusterKeys.map((k:number) => dataCopy.JOBS[k-1]);
    console.log(dataCopy.JOBS[0]);
    console.log(`clusterKeys = ${clusterKeys}`)
    console.log(`relatedJobs = ${relatedJobs}`)

    const [seeResults, setSeeResults] = useState<boolean>(false);

    const getResponseFunction = async() => {
        setIsLoading(true);
        for(var i = 0; i<relatedJobs.length; i++) {
            resultsBasic.BASIC_RESULTS[i].id = relatedJobs[i].id;
            resultsBasic.BASIC_RESULTS[i].name = relatedJobs[i].name;
            const response = await openai.chat.completions.create({
                messages: [{"role": "system", "content": "You are a robot career counselor named Perceptron, with the ability to peer into college student's souls and give the best career advice."},
                    {"role": "user", "content": `Generate a 1-3 sentence job description for "${relatedJobs[i].name}".`}],
                model: "gpt-4-turbo"
            })
            if(response.choices[0].message.content !== null) {
                resultsBasic.BASIC_RESULTS[i].description = response.choices[0].message.content;
            }
            console.log(response);
        }
        setSeeResults(true);
        setIsLoading(false);
    }

    // const getResponseFunction = async() => {
    //     for(var i = 0; i< 3; i++) {
    //         const title = await openai.chat.completions.create({
    //             messages: [{"role": "system", "content": "You are part of a code function that gives the name of a recommended career."},
    //                 {"role": "user", "content": `List just one job title for "${topClusterID}" that you did not state before in this list.`}],
    //             model: "gpt-4-turbo"
    //         })
    //         resultsBasic.BASIC_RESULTS[i].id = i;
    //         const jobTitle = title.choices[0].message.content
    //         if(jobTitle !== null) {
    //             resultsBasic.BASIC_RESULTS[i].name = jobTitle;
    //         }
    //         const response = await openai.chat.completions.create({
    //             messages: [{"role": "system", "content": "You are a robot career counselor named Perceptron, with the ability to peer into college student's souls and give the best career advice."},
    //                 {"role": "user", "content": `Generate a 1-3 sentence job description for "${jobTitle}".`}],
    //             model: "gpt-4-turbo"
    //         })
    //         if(response.choices[0].message.content !== null) {
    //             resultsBasic.BASIC_RESULTS[i].description = response.choices[0].message.content;
    //         }
    //         console.log(response);
    //     }
    //     setSeeResults(true);
    // }


        return (
        <div>
            <Button onClick={getResponseFunction}>Get my results!</Button>
            {isLoading ? (
                <LoadingPage />  // Display the loading page when isLoading is true
            ) : (
                seeResults && (
                    <>
                        <h1>Your potential career field is {jobClusters[topClusterID]}. You may be well suited for the following careers:</h1>
                        <BasicResultsPage></BasicResultsPage>
                    </>
                )
            )}
        </div>
    );

}