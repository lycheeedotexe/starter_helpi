import {useContext} from "react";
import {UserResponsesContext} from '../contexts/UserResponsesContext'
import { constructFinalMeasure } from "../QuizFunctions/QuestionSelection";
import questions from "../data/questions.json"
import { getResponseVector } from "../QuizFunctions/getResponseVector";
import { DetailedQuestionsInAgreement, Job } from "../QuizFunctions/QuestionSelection";
import BarGraph from "../components/BarGraph";
import {DataItem} from "../components/BarGraph"
import { FormatBasicResults } from "../components/formatBasicResults";

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



const BasicResultsPage = () => {
    const dataCopy = JSON.parse(JSON.stringify(questions))
    const {responses} = useContext(UserResponsesContext);
    const responseVec = getResponseVector(responses);
    const measure = constructFinalMeasure(dataCopy,responseVec);

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
    const relatedJobs = clusterKeys.map((k:number) => dataCopy.JOBS[k]);

   
    const normalizedClusterProbability = (k: number): number =>{
        const clusterQuestionProbability = [1,2,3,4,5,6,7,8,9,10].map((n: number) => clusterProbability(n)).reduce((acc, entry)=> acc + entry, 0)
        return clusterProbability(k) / clusterQuestionProbability;
    }
    console.log(`clusterKeys = ${clusterKeys}`)
    console.log(`relatedJobs = ${relatedJobs}`)
    
    const dataforGraph = rankedClusters.map((k:number): DataItem => {
            const clusterData = {name:jobClusters[k], value:normalizedClusterProbability(k)}
            return clusterData;

    } )


    return(
        <div>
            <div>
                <h1>Your scores for all clusters: </h1>
                <BarGraph
                data={dataforGraph}
                color={'blue'}
                />

            </div>
             <h1>Your top cluster is {jobClusters[topClusterID]}. You may be well suited for the following careers</h1>
            {
            
            relatedJobs.map(j => <div>{j.name}</div>)}
        </div>

    );

}

export default BasicResultsPage;