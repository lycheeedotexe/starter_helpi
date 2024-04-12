//where question selection code will go
interface Job {
    id: number,
    name: string,
    relatedDetailedQuestions: number[], //the id of the related questions goes here
    partitionVector: number[]
}

export interface BasicQuestion {
    id: number,
    name: string,
    body: string,
    published: boolean,
}

export interface DetailedQuestion{
    id: number,
    //name: string,
    body: string,
    relatedJobs: number[],      //the id of the related jobs goes here
    published: boolean
}

interface DataStorage {
    BASIC_QUESTIONS: BasicQuestion[];
    DETAILED_QUESTIONS: DetailedQuestion[];
    JOBS: Job[];
}

function A_without_B(A: number[], B: number[]){
    /*
    returns an array of numbers containing only elements of A that are not in B
    */
    const newA = A.filter(element => !B.includes(element))
    return [...newA];
}

function jobsInAgreement(data: DataStorage, basicQuestionId: number, userResponse: number): Job[]{ //call the output jobSetA
    /*
    data: the JSON file containing all possible questions and jobs
    basicQuestionId: the ID of the basic question we want to use to partition the job set
    userResponse: a number between -1 and 1. 

    If the userResponse is negative, then the jobs in agreement with the user are the ones which are not in agreement with the question. 
    By definition, these are the Jobs whose ith component of the partition vector is a 0

    If the userResponse is positive, then the jobs in agreement are the ones whose ith component of the partition vector is a 1
    */
    const responseType = userResponse > 0 ? 1 : 0;
    return data.JOBS.filter(job => job.partitionVector[basicQuestionId] === responseType);
}

function jobsNotInAgreement(data: DataStorage, basicQuestionId: number, userResponse:number):Job[]{ //call the output jobSetB
    /*
    Since the basic questions split the jobs into two disjoint sets we can just reverse the sign of the user response to get 
    the jobs which are not in agreement with the user
    */
    return jobsInAgreement(data, basicQuestionId, -1*userResponse);
}

function DetailedQuestionsInAgreement(jobSet:Job[]): number[]{
    //const jobSetA = jobsInAgreement(data, basicQuestionId,userResponse);
    var questionSet = new Set<number>();
    jobSet.forEach(job => {
            job.relatedDetailedQuestions.forEach(questionId => questionSet.add(questionId))
    })
    return Array.from(questionSet); 
}

function makeUniformMeasure(numDetailedQuestions: number): number[]{
    const entryVal = 1/numDetailedQuestions;
    return new Array(numDetailedQuestions).fill(entryVal);
}

function updateMeasure(prevMeasure: number[], userResponse: number, jobSetA: Job[], jobSetB: Job[]): number[]{
    if(userResponse === 0){
        return [...prevMeasure];
    }
    else if(userResponse < 0){
        return updateMeasure(prevMeasure, -1*userResponse, jobSetA, jobSetB)
    }
    const tempA = DetailedQuestionsInAgreement(jobSetA);
    const tempB = DetailedQuestionsInAgreement(jobSetB);

    const indexSetA = A_without_B(tempA, tempB); 
    const indexSetB = A_without_B(tempB, tempA);
    
    const measureToBeRemoved = prevMeasure.reduce((acc, current, index): number => indexSetB.includes(index) ? acc + current : acc) * (1-userResponse)

    return prevMeasure.map(
            entry => (indexSetA.includes(entry) || indexSetB.includes(entry)) ? 
            (indexSetA.includes(entry)? entry + (1-userResponse)*measureToBeRemoved / indexSetA.length : userResponse*entry)
            : entry

    )
}

function constructFinalMeasure(data: DataStorage, responseVector: number[]){
    const baseMeasure = makeUniformMeasure(data.DETAILED_QUESTIONS.length);
    var iterativeMeasure = [...baseMeasure];
    for(var i = 0; i < responseVector.length; i++){
        iterativeMeasure = updateMeasure(iterativeMeasure, responseVector[i], jobsInAgreement(data,i,responseVector[i]), jobsNotInAgreement(data,i,responseVector[i]));
    };
    return [...iterativeMeasure];
}

function constructDistribution(measure: number[]){
    /* 
    measure is an array of numbers. measure[i] corresponds to the probability that detailed question i is chosen. We construct the distribution
    by mapping the sum of the elements A[0]+...+A[i] to B[i]
    */
    return measure.map((element, i) => measure.slice(0,i+1).reduce((sum, current) => sum + current, 0));
}

function sampleQuestion(data: DataStorage, dist: number[]){

    const r = Math.random();
    return dist.findIndex(element => element >= r );
}

export function publishDetailedQuestions(data: DataStorage, responseVector: number[], numQuestions: number): DataStorage{
    /*
        data: a copy of the JSON file where all of our questions are stored
        responseVector: a vector of numbers corresponding to the user responses to the detailed questions
        numQuestions: the number of detailed questions we want to include in our quiz
        
        This function uses the constructDistribution and constructFinalMeasure functions to obtain a probability 
        distribution on the set of detailed questions. It then generates random numbers and uses them to sample question
        IDs from the probability distribution until we reach the desired number of questions.

        It sets the published field of all the questions with a sampled ID to true, and then returns a filtered array
        where all the unpublished detailed questions are removed. This output is then fed to our DetailedQuestionsPage.tsx file.
    */
    const dist = constructDistribution(constructFinalMeasure(data, responseVector));
    const copyOfData = JSON.parse(JSON.stringify(data));
    var numSampled = 0;
    while(numSampled < numQuestions){
        const currentId = sampleQuestion(copyOfData, dist);
        const question = copyOfData.DETAILED_QUESTIONS.find((q: DetailedQuestion) => q.id === currentId);
        if(question && question.published === false){
            question.published = true;
            numSampled = numSampled + 1;
        }
    }
    return copyOfData.filter((q:BasicQuestion) => q.published === true);
}








