import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './components/Home';
import Question from "./components/Question";
import Answer from "./components/Answer";
import Winner from "./components/Winner";
import Nickname from "./components/Nickname";

function App() {
return(
  <div>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/Question" element={<Question />}/>
      <Route path="/Answer" element={<Answer />}/>
      <Route path="/Winner" element={<Winner />}/>
      <Route path="/Nickname" element={<Nickname />}/>
    </Routes>
  </div>
);
}

export default App;
