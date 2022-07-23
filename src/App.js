import './App.css';
import Films from "./components/Films/Films";
import {Routes,} from "react-router-dom";
import FilmPage from "./components/FilmPage/FilmPage1";
import {Route} from "react-router";
import React from "react";
import Todos from "./components/Todos/Todos";

function App() {
    return (
        <div className="App">
            {/*<Routes>*/}
            {/*    <Route  path={'/:filmId'} element={  <FilmPage/>}>*/}

            {/*    </Route>*/}
            {/*    <Route path={'/'} element={ <Films/>}/>*/}
            {/*</Routes>*/}
            <Todos/>
        </div>
    );
}

export default App;
