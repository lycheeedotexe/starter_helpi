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
  let text = "Please enter an OpenAI API Key above."

  function changeKeyGiven() {
    setKeyGiven(true);
  }

  const checkKey = async() => {
    const response = await openai.chat.completions.create({
        messages: [{"role": "system", "content": "You are a robot career counselor named Perceptron, with the ability to peer into college student's souls and give the best career advice."},
            {"role": "user", "content": "What is your name?"}],
        model: "gpt-4-turbo"
    })
    if(response){
      changeKeyGiven();
    } else {
      text = "Not a valid key, please try again!"
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
        </>
        )}
    <APIKey></APIKey>
    {!keyGiven && (
      <>
      <br></br>
        <Button onClick={checkKey}>Continue</Button>
        <br></br>
        {text}
      </>
    )}
    </div>
    </DetailedResponsesProvider>
    </UserResponsesProvider>
    
  );
}

export default App;
