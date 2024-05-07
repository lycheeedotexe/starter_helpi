//import logo from './logo.svg';
import './App.css';
import {UserResponsesProvider} from './contexts/UserResponsesContext'
import {HomePage} from "./QuizPages/HomePage";
import { DetailedResponsesProvider } from './contexts/DetailedResponsesContext';

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function App() {

  return (
    <UserResponsesProvider>
      <DetailedResponsesProvider>
    <div className="App">
      <header className='App-header'>
        <img src={banner} alt="Banner and Title" className='App-header-image'/>
      </header>
      <div className='App-body'>
        <HomePage></HomePage>
        </div>
    <APIKey></APIKey>
    </div>
    </DetailedResponsesProvider>
    </UserResponsesProvider>
    
  );
}

export default App;
