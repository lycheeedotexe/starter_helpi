// sample.test.ts
import { publishDetailedQuestions} from './QuestionSelection';
import questions from './data/questions.json'

describe('generateDetailedQuestions', () => {
    it('should publish the correct number of questions', () => {
        const mockData = JSON.parse(JSON.stringify(questions));

        const responseVector = [.5, 0.3, -1, 0.25, -0.1,.1, .5]; 
        const numQuestions = 25;

        const publishedQuestions = publishDetailedQuestions(mockData, responseVector, numQuestions);

        const publishedQuestionCount = publishedQuestions.length;
        expect(publishedQuestionCount).toBe(numQuestions);
        //Testing the effectiveness of the system
        publishedQuestions.forEach(question => {
            console.log(question.body);
        });
    });

    // Additional tests...
});
