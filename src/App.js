import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Create from "./components/Create";
import Detail from "./components/Detail";
import Edit from "./components/Edit";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/users' element={<Home/>}/>
          <Route path='/users/create' element={<Create/>}/>
          <Route path='/users/view/:id' element={<Detail/>}/>
          <Route path='/users/edit/:id' element={<Edit/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
