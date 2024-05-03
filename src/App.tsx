import './App.css';
import {UserResponsesProvider} from './contexts/UserResponsesContext'
import {HomePage} from "./QuizPages/HomePage";
import banner from "./image assets/banner 3.png";
import {ChatGPT} from "./chatgpt/openaiImplementation";

function App() {
  return (
    <UserResponsesProvider>
    <div className="App">
      <header className='App-header'>
        <img src={banner} alt="Banner and Title" className='App-header-image'/>
      </header>
      <div className='App-body'>
        <HomePage></HomePage>
      </div>
      <div className='App-footer'>
        <ChatGPT></ChatGPT>
      </div>
    </div>
    </UserResponsesProvider>
  );
}

export default App;
