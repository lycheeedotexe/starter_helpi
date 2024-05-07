import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
//import { chatgpt } from '../interfaces/chatgptProps';
import OpenAI from 'openai';

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

// export interface ChatGPTKey {
//     key: string;
// }

export function ChatGPT(): JSX.Element{
    // type APIKey = chatgpt;
    const [key, setKey] = useState<string>(keyData); //for api key input
    const [gptResponse, setGptResponse] = useState<string | null>("no response");
    
    //sets the local storage item to the api key the user inputed
    function handleSubmit() {
        localStorage.setItem(saveKeyData, JSON.stringify(key));
        window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
    }

    //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
    function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
        setKey(event.target.value);
    }



    //const  /*Configuration,*/ OpenAIApi = require('openai');
    //const { Configuration } = require('openai');
    // const configuration = new Configuration({
    //     apiKey: "",
    // })
    // const openai = new OpenAIApi(configuration);
    const openai = new OpenAI({
        apiKey: key,
        dangerouslyAllowBrowser: true
    });

    // const dotenv = require('dotenv');
    // const OpenAI = require('openai');

    // dotenv.config() // Load the environment
    // const openai = new OpenAI({ key: process.env.API_KEY });

    const [text, setText] = useState<string>("what does a software engineer do?");
    function changeText(event: React.ChangeEvent<HTMLInputElement>) {
        setText(event.target.value);
    }

    const getResponseFunction = async() => {
        const response = await openai.chat.completions.create({
            messages: [{"role": "system", "content": "You are a robot career counselor named Perceptron, with the ability to peer into college student's souls and give the best career advice."},
                {"role": "user", "content": text}],
            model: "gpt-4-turbo"
        })
        setGptResponse(response.choices[0].message.content);
    }



    return (
        <div>
            {gptResponse}
            <Form>
                <Form.Label>test</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={3}
                    value={text}
                    onChange={changeText}></Form.Control>
                <br></br>
                <Button className="Submit-Button" onClick={getResponseFunction}>Submit question</Button>
            </Form>
            <Form>
                <Form.Label>API Key:</Form.Label>
                <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
                <br></br>
                <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
            </Form>
        </div>
    )
}