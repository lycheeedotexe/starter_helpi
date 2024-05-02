import { constructFinalMeasure, Job, DetailedQuestionsInAgreement} from './QuestionSelection';
import questions from '../data/questions.json'

export function displayInfo(responseVector: number[]) {
    console.log(`Responce vector is: ${responseVector}`)
    const dataCopy = JSON.parse(JSON.stringify(questions));
    const testMeasure = constructFinalMeasure(dataCopy, responseVector);
        //the jobs are split into clusters of 5 jobs each. So (5k + 1, ..., 5*k + 5) corresponds to a cluster of jobs
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

        const relatedQuestions = (k: number): number[] =>{
            const clusterID = (k-1) % 10;
            const clusterKeys = [5*clusterID + 1, 5* clusterID+2, 5*clusterID+3,5*clusterID+4,5*clusterID+5];
            return DetailedQuestionsInAgreement(dataCopy.JOBS.filter((j: Job) => clusterKeys.includes(j.id)));
    };

    //comfirming that the measure is a probability measure
    console.log(`measure says P(D) = ${testMeasure.reduce((acc, entry, index) => acc + entry, 0 )}`)
    console.log(`The test measure is: `)
    console.log(testMeasure);
    //We display the measure of the set of detailed questions related to each cluster. This corresponds to the probability of 
    //one of the questions related to the cluster being chosen for each sample we take. 
    const clusterProbability = (k: number): number=>{
        const questionIDs = relatedQuestions(k);
        return questionIDs.reduce((acc, i) => acc + testMeasure[i-1], 0.0);
    }
    for(var k = 1; k <= 10; k++){
        console.log(`Total probability of picking a question related to ${jobClusters[k]}`)
        console.log(clusterProbability(k))
    }
}

