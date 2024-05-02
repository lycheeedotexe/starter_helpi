
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
   if(userResponse === 0){
     return data.JOBS;
   } 
   const responseType = userResponse > 0 ? 1 : -1;
    return data.JOBS.filter(job => job.partitionVector[basicQuestionId] === responseType);
}

function jobsNotInAgreement(data: DataStorage, basicQuestionId: number, userResponse:number):Job[]{ //call the output jobSetB
    /*
    Since the basic questions split the jobs into two disjoint sets we can just reverse the sign of the user response to get 
    the jobs which are not in agreement with the user
    */
    return jobsInAgreement(data, basicQuestionId, -1*userResponse);
}

export function DetailedQuestionsInAgreement(jobSet:Job[]): number[]{
    /*
    (jobSet: Job[]) Some subset of the job set. 

    returns the array of detailed questions which related to at least one job in jobSet.
    */
    var questionSet = new Set<number>();
    jobSet.forEach(job => {
            job.relatedDetailedQuestions.filter((questionId: number) => questionId > 50).forEach(questionId => questionSet.add(questionId))
    })
    return Array.from(questionSet); 
}

function makeUniformMeasure(numDetailedQuestions: number): number[]{
    /*
    returns a dictionary such that every key corresponds to 1/numDetailedQuestions
    */
    const entryVal = 1/numDetailedQuestions;
    return new Array(numDetailedQuestions).fill(entryVal);
}

function updateMeasure(prevMeasure: number[], userResponse: number, jobSetA: Job[], jobSetB: Job[]): number[] {
    /*
    (prevMeasure: number) is an array of numbers of size equal to the number of detailed questions
    and it is used to encode a probability measure. 

    (userResponse: number) is some userResponse

    (jobSetA: Job[]) is the set of jobs which are in agreement with the the user response to the question

    (jobSetB: Job[]) is the set of jobs which are not in agreement with the user response to the question

    To understand this function assume, r > 0 as if r = 0 then nothing is changed. If r < 0, then jobSetA(r) = jobSetB(-r), 
    so we can just call updateMeasure(prevMeasure, -userResponse, jobSetB, jobSetA) to obtain a case where r > 0.
    How the function works is for every question d in jobSetB we reduce the probability of d being chosen by constructing 
    a new measure and setting newMeasure({d}) = (1-r)*prevMeasure({d}). So if the user strongly agrees (r = 1), then we reduce 
    the probability of detailed quesitons in disagreement from being chosen to 0.

   Then, we look at the total probability removed from the questions not in agreement, divide that value by the number of 
    questions in agreement, and then update the measure of each question in agreement accordingly
    */
    if (userResponse === 0) {
        return [...prevMeasure];
    }
    if(userResponse < 0){
        return updateMeasure(prevMeasure, -1*userResponse, jobSetB, jobSetA);
    }

    const tempA = DetailedQuestionsInAgreement(jobSetA);
    const tempB = DetailedQuestionsInAgreement(jobSetB);

    const indexSetA = A_without_B(tempA, tempB);
    const indexSetB = A_without_B(tempB, tempA);

    const measureToBeRemoved = prevMeasure.reduce((acc, current, index) => {
        return indexSetB.includes(index + 1) ? acc + current : acc; 
    }, 0) * userResponse; 

    return prevMeasure.map((entry, index) => {
        if (indexSetA.includes(index + 1) || indexSetB.includes(index + 1)) {
            if (indexSetA.includes(index + 1)) {
                return entry + (measureToBeRemoved / indexSetA.length);
            } else {
                return entry * (1 - userResponse);
            }
        }
        return entry; 
    });
}

export function constructFinalMeasure(data: DataStorage, responseVector: number[]){
    /*
    (data: DataStorage) is the argument we use to pass the questions.json file
    (responseVector: number[]) is the argument we use to pass in the user responses to the basic questions

    This function first constructs a uniform measure on the set of detailed questions, then uses the updateMeasure function iteratively
    so that \mu_{i+1} = UpdateMeasure(\mu_{i}, responseVector[i], ...correspondingJobSets). The end result is a probability measure on 
    the set of detailed questions which should more accurately reflect the users interests.
    */
    const baseMeasure = makeUniformMeasure(data.DETAILED_QUESTIONS.length);
    var iterativeMeasure = [...baseMeasure];
    for(var i = 0; i < responseVector.length; i++){
        //console.log(`\n measure says P(D) = ${iterativeMeasure.reduce((acc, entry, index) => acc + entry, 0 )}\n`)
        iterativeMeasure = updateMeasure(iterativeMeasure, responseVector[i], jobsInAgreement(data,i,responseVector[i]), jobsNotInAgreement(data,i,responseVector[i]));
    };
    return [...iterativeMeasure];
}

export function constructDistribution(measure: number[]){
    /* 
    measure is an array of numbers. measure[i] corresponds to the probability that detailed question i is chosen. We construct the distribution
    by mapping the sum of the elements A[0]+...+A[i] to B[i]
    */
    return measure.map((element, i) => measure.slice(0,i+1).reduce((sum, current) => sum + current, 0));
}

function sampleQuestion(data: DataStorage, dist: number[]){

    const r = Math.random();
    return dist.findIndex(element => element >= r ) + 1;
}

export function publishDetailedQuestions(data: DataStorage, responseVector: number[], numQuestions: number): DetailedQuestion[]{
    /*
        (data: DataStorage) is the argument we use to pass the questions.json file
        (responseVector: number[]) is the argument we use to pass in the user responses to the basic questions
        (numQuestions: number) the number of detailed questions we want to include in our quiz
        
        This function uses the constructDistribution and constructFinalMeasure functions to obtain a probability 
        distribution on the set of detailed questions. It then generates random numbers and uses them to sample question
        IDs from the probability distribution until we reach the desired number of questions.

        It sets the published field of all the questions with a sampled ID to true, and then returns a filtered array
        where all the unpublished detailed questions are removed. This output is then fed to our DetailedQuestionsPage.tsx file.
    */
    const copyOfData = JSON.parse(JSON.stringify(data));
    const dist = constructDistribution(constructFinalMeasure(copyOfData, responseVector));
    var numSampled = 0;
    while(numSampled < numQuestions){
        const currentId = sampleQuestion(copyOfData, dist);
        const question = copyOfData.DETAILED_QUESTIONS.find((q: DetailedQuestion) => q.id === currentId);
        if(question && question.published === false){
            question.published = true;
            numSampled = numSampled + 1;
        }
    }
    return copyOfData.DETAILED_QUESTIONS.filter((q:DetailedQuestion) => q.published === true);
}
