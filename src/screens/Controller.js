import React from 'react';
import Home from './home/Home';
import Header from '../common/header/Header';
import { BrowserRouter as Router, Route} from 'react-router-dom';

const Controller = function (props) {
    const baseUrl = "/api/v1/";
    return(
        // <div>
        //     <Header heading="" log_value="login" />
        // </div>
        <Router>
            <div className="main-container">
                <Route exact path="/" render={(props) => <Home {...props} baseUrl={baseUrl}/>} />
            </div>
        </Router>
    )
}
export default Controller;