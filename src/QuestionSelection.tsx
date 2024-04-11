//where question selection code will go
export interface Job {
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
    name: string,
    body: string,
    relatedJobs: number[],      //the id of the related jobs goes here
    published: boolean
}

export interface DataStorage {
    BASIC_QUESTIONS: BasicQuestion[];
    DETAILED_QUESTIONS: DetailedQuestion[];
    JOBS: Job[];
}

function A_without_B(A: number[], B: number[]){
    const newA = A.filter(element => !B.includes(element))
    return [...newA];
}

function jobsInAgreement(data: DataStorage, basicQuestionId: number, userResponse: number): Job[]{ //call the output jobSetA
    const responseType = userResponse > 0 ? 1 : 0;
    return data.JOBS.filter(job => job.partitionVector[basicQuestionId] === responseType);
}

function jobsNotInAgreement(data: DataStorage, basicQuestionId: number, userResponse:number):Job[]{ //call the output jobSetB
    return jobsInAgreement(data, basicQuestionId, -1*userResponse);
}

function DetailedQuestionsInAgreement(data: DataStorage, basicQuestionId:number, userResponse:number): number[]{
    const jobSetA = jobsInAgreement(data, basicQuestionId,userResponse);
    var questionSet = new Set<number>();
    jobSetA.forEach(job => {
            job.relatedDetailedQuestions.forEach(question => questionSet.add(question))
    })
    return Array.from(questionSet); 
}

function DetailedQuestionsNotInAgreement(data: DataStorage, basicQuestionId: number, userResponse: number): number[]{
    return DetailedQuestionsInAgreement(data, basicQuestionId, -1*userResponse);
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
    const tempA = jobSetA.map(job => job.id);
    const tempB = jobSetB.map(job => job.id);

    const indexSetA = A_without_B(tempA,tempB);
    const indexSetB = A_without_B(tempB, tempA);
    
    const measureToBeRemoved = prevMeasure.reduce((acc, current, index): number => indexSetB.includes(index) ? acc + current : acc) * (1-userResponse)

    return prevMeasure.map(
            entry => (indexSetA.includes(entry) || indexSetB.includes(entry)) ? 
            (indexSetA.includes(entry)? entry + (1-userResponse)*measureToBeRemoved / indexSetA.length : userResponse*entry)
            : entry

    )
}

function constructFinalMeasure(data: DataStorage, responseVector: number[]){
    const baseMeasure = makeUniformMeasure(responseVector.length);
    var iterativeMeasure = [...baseMeasure];
    for(var i = 0; i < responseVector.length; i++){
        iterativeMeasure = updateMeasure(iterativeMeasure, responseVector[i], jobsInAgreement(data,i,responseVector[i]), jobsNotInAgreement(data,i,responseVector[i]));
    };
    return [...iterativeMeasure];
}





