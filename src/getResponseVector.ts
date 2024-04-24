import { userResponseType } from "./QuizPages/BasicQuestions";

export function getResponseVector(userResponses: userResponseType){
    const responseConverter: Record<string, number> = {
        "Strongly Agree": 1.0,
        "Agree": 0.75,
        "Somewhat Agree": 0.25,
        "Neutral": 0.0,
        "Somewhat Disagree": -0.25,
        "Disagree": -0.5,
        "Strongly Disagree": -1.0
    }
    return Object.keys(userResponses).sort().map(key => responseConverter[key]) 
    //the sort ensures that if the user responds to the basic quesiton in a non standard order the math will be the same as if they had answered them 1 through 7
}