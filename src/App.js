import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Router, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Create from "./components/Create";
import Update from "./components/Update";
import Read from "./components/Read";
// import Create from "./components/articles/Create";
// import Home from "./components/articles/Home";
// import Update from "./components/articles/Update";
import 'bootstrap/dist/css/bootstrap.min.css';
import Create_Article from "./components/articles/Create_Article";
import Update_Article from "./components/articles/Update_Article";
import Read_Article from "./components/articles/Read_Article";
function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/user/' element={<Home/>}></Route>
            <Route path='/user/create' element={<Create/>}></Route>
            <Route path='/user/update/:id' element={<Update/>}></Route>
            <Route path='/user/:id' element={<Read/>}></Route>

            <Route path='/user/:user_id/add-article' element={<Create_Article />}></Route>
            <Route path='/user/:user_id/view-article/:article_id' element={<Read_Article />}></Route>
            <Route path='/user/:user_id/edit-article/:article_id' element={<Update_Article />}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
