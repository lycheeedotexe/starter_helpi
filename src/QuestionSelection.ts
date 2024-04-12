//where question selection code will go
interface Job {
    id: number,
    name: string,
    relatedDetailedQuestions: number[], //the id of the related questions goes here
    partitionVector: number[]
}

interface BasicQuestion {
    id: number,
    name: string,
    body: string,
    published: boolean,
}

interface DetailedQuestion{
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
    //console.log("The Random Number Generated was:")
    //console.log(r)
    return dist.findIndex(element => element >= r );
}

export function publishDetailedQuestions(data: DataStorage, responseVector: number[], numQuestions: number): DataStorage{
    const dist = constructDistribution(constructFinalMeasure(data, responseVector));
    console.log("The distribution is: ")
    console.log(dist)
    const copyOfData = JSON.parse(JSON.stringify(data));
    var numSampled = 0;
    //var loopBreak = 0;
    while(numSampled < numQuestions){
        const currentId = sampleQuestion(copyOfData, dist);
        const question = copyOfData.DETAILED_QUESTIONS.find((q: DetailedQuestion) => q.id === currentId);
        if(question && question.published === false){
            question.published = true;
            numSampled = numSampled + 1;
        }
        //loopBreak++;
        //if(loopBreak > 15){
        //    break;
        //}
        //console.log("Current ID is: ")
        //console.log(currentId)
        //console.log("LoopBreak counter is: ")
        //console.log(loopBreak)
    }
    return copyOfData;
}









