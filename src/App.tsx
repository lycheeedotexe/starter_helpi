//import logo from './logo.svg';
import './App.css';
import {UserResponsesProvider} from './contexts/UserResponsesContext'
import {HomePage} from "./QuizPages/HomePage";
import banner from "./image assets/banner 3.png";
import { APIKey } from './submitButtons/submitKey';
import { DetailedResponsesProvider } from './contexts/DetailedResponsesContext';
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
