import { userResponseType } from "../QuizPages/BasicQuestions";


const responseConverter: Record<string, number> = {
    "Strongly Agree": 1.0,
    "Agree": 0.75,
    "Somewhat Agree": 0.25,
    "Neutral": 0.0,
    "Somewhat Disagree": -0.25,
    "Disagree": -0.5,
    "Strongly Disagree": -1.0
}

export function getResponseVector(userResponses: userResponseType){
    const usableResponses = JSON.parse(JSON.stringify(userResponses));
    return Object.keys(usableResponses).sort().map(key => responseConverter[usableResponses[key]]) 
    //the sort ensures that if the user responds to the basic quesiton in a non standard order the math will be the same as if they had answered them 1 through 7
}

export function getResponseDictionary(userResponses: userResponseType): Record<number, number> {
    return Object.entries(userResponses).map(([key, value]) => [
        Number(key),
        responseConverter[value as string] || 0
    ]).reduce((acc, [key, value]) => {
        acc[key as number] = value as number;
        return acc;
    }, {} as Record<number, number>);
}