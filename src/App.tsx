import React, { useState } from 'react';
//import logo from './logo.svg';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import {UserResponsesProvider} from './contexts/UserResponsesContext'
import {HomePage} from "./QuizPages/HomePage";
import { ChatGPT } from './chatGPT';


function App() {

  return (
    <UserResponsesProvider>
    <div className="App">
      <header className="App-header">
        <HomePage></HomePage>
      </header>
    <ChatGPT></ChatGPT>
    </div>
    </UserResponsesProvider>
  );
}

export default App;
