import React, { useState } from 'react';
import './App.css';
import { UserResponsesProvider } from './contexts/UserResponsesContext';
import { HomePage } from "./QuizPages/HomePage";
import banner from "./image assets/banner 3.png";
import { APIKey, openai } from './submitButtons/submitKey';
import { DetailedResponsesProvider } from './contexts/DetailedResponsesContext';
import { Button } from 'react-bootstrap';

function App() {
  const [keyGiven, setKeyGiven] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>("Please enter an OpenAI API Key here.");

  const checkKey = async () => {
    setIsLoading(true);  // Start loading
    try {
      const response = await openai.chat.completions.create({
        messages: [{"role": "system", "content": "You are a robot career counselor named Perceptron, with the ability to peer into college student's souls and give the best career advice."},
          {"role": "user", "content": "What is your name?"}],
        model: "gpt-4-turbo"
      });
      if(response) {
        setKeyGiven(true);
      } else {
        setText("Not a valid key, please try again!");
      }
      console.log(response);
    } catch (error) {
      console.error('Error checking API key:', error);
      setText("Failed to validate the key. Please check your network and try again.");
    }
    setIsLoading(false);  // Stop loading
  };

  return (
    <UserResponsesProvider>
      <DetailedResponsesProvider>
        <div className="App">
          {!keyGiven ? (
            <>
              {isLoading ? (
                <div className="loading-container" style={{textShadow:"none"}}>
                  <p className="style4">Verifying API Key</p> {}
                </div>
              ) : (
                <div><img src={banner} alt="Banner and Title" className='App-header-image' />
                <div className="key" style={{textShadow:"none"}}>
                  <div className="intro-text">
                  
                    <p className="style4">Welcome to A.I. Assisted Career Quiz! Our mission is to provide personalized career guidance using AI technology. To access our tailored advice, please enter your OpenAI API key below.</p>
                  </div>
                  <p className="style4">{text}</p>
                  <APIKey />
                  <Button onClick={checkKey}>Check Key & Continue</Button>
                </div>
                </div>
              )}
            </>
          ) : (
            <>
              <header className='App-header'>
                <img src={banner} alt="Banner and Title" className='App-header-image' />
              </header>
              <div className='App-body'>
                <HomePage />
              </div>
            </>
          )}
          {keyGiven && 
            <APIKey />
          }
        </div>
      </DetailedResponsesProvider>
    </UserResponsesProvider>
  );
}

export default App;

