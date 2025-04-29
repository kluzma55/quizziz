import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './components/Home';
import Question from "./components/Question";
import Winner from "./components/Winner";
import Nickname from "./components/Nickname";
import Score from "./components/Score";

function App() {
return(
  <div>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/Question" element={<Question />}/>
      <Route path="/Winner" element={<Winner />}/>
      <Route path="/Nickname" element={<Nickname />}/>
      <Route path="/Score" element={<Score />}/>
    </Routes>
  </div>
);
}

export default App;
