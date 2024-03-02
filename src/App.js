import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Router, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Create from "./components/Create";
import Update from "./components/Update";
import Read from "./components/Read";
import 'bootstrap/dist/css/bootstrap.min.css';
import TransactionList from "./components/TransactionList";
function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/transactions' element={<TransactionList/>}></Route>
            <Route path='/create' element={<Create/>}></Route>
            <Route path='/update/:id' element={<Update/>}></Route>
            <Route path='/read/:id' element={<Read/>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
