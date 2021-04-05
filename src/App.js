
import './App.css';
import Row from "./Row";
import requests from './requests';

function App() {
  return (
    <div className="App">
      <h3 style={{color:"red"}}>Building Netflix Clone!</h3>
      <Row title="NETFLIX ORIGINALS" fetchURL={requests.fetchNetflixOriginals}/>
      <Row title="Trending Now" fetchURL={requests.fetchTrending}/>

    </div>
  );
}

export default App;
