//import logo from './logo.svg';
import './App.css';
import {UserResponsesProvider} from './contexts/UserResponsesContext'
import {HomePage} from "./QuizPages/HomePage";
import banner from "./image assets/banner 3.png";
import { APIKey, openai } from './submitButtons/submitKey';
import { DetailedResponsesProvider } from './contexts/DetailedResponsesContext';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
function App() {
  const [keyGiven, setKeyGiven] = useState<boolean>(false);
  const [text, setText] = useState<string>("Please enter an OpenAI API Key below.");

  const checkKey = async() => {
    const response = await openai.chat.completions.create({
        messages: [{"role": "system", "content": "You are a robot career counselor named Perceptron, with the ability to peer into college student's souls and give the best career advice."},
            {"role": "user", "content": "What is your name?"}],
        model: "gpt-4-turbo"
    })
    if(response){
      setKeyGiven(true);
    } else {
      setText("Not a valid key, please try again!");
    }
    console.log(response);
}

  return (
    <UserResponsesProvider>
      <DetailedResponsesProvider>
    <div className="App">
      {keyGiven && (
        <>
          <header className='App-header'>
            <img src={banner} alt="Banner and Title" className='App-header-image'/>
          </header>
          <div className='App-body'>
            <HomePage></HomePage>
          </div>
          <APIKey></APIKey>
        </>
      )}
      {!keyGiven && (
        <>
        <p className='key'>
          {text}
          <br></br>
          <APIKey></APIKey>
          <br></br>
          <Button onClick={checkKey}>Check Key & Continue</Button>
        </p>
        </>
      )}
    </div>
    </DetailedResponsesProvider>
    </UserResponsesProvider>
    
  );
}

export default App;
