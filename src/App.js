import './App.css';
import Films from "./components/Films/Films";
import {Routes,} from "react-router-dom";
import FilmPage from "./components/FilmPage/FilmPage1";
import {Route} from "react-router";
import React from "react";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route  path={'/:filmId'} element={  <FilmPage/>}>

                </Route>
                <Route path={'/'} element={ <Films/>}/>
            </Routes>
        </div>
    );
}

export default App;
