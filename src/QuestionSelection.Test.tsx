// sample.test.ts
import { publishDetailedQuestions} from './QuestionSelection';
import questions from './data/questions.json'

describe('generateDetailedQuestions', () => {
    it('should publish the correct number of questions', () => {
        //const mockData = JSON.parse(JSON.stringify(questions));
        const mockData = questions;

        const responseVector = [.1, 0.1, -0.1, 0.25, -0.1,.1, .5,.5,.5,-.25,-.25,.5,.5,.5,-.5]; //should be something related to computer programming
        const numQuestions = 25;

        const result = publishDetailedQuestions(mockData, responseVector, numQuestions);

        const publishedQuestions = result.DETAILED_QUESTIONS.filter(q => q.published);
        const publishedQuestionCount = publishedQuestions.length;
        expect(publishedQuestionCount).toBe(numQuestions);

        //Testing the effectiveness of the system
        publishedQuestions.forEach(question => {
            console.log(question.body);
        });
    });

    // Additional tests...
});
