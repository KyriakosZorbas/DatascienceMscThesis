
import React from 'react';
import {render} from 'react-dom';
import Map from './map';
import ReactDOM from "react-dom";
import OAuth2Login from './oauth2/OAuth2Login';
import Login from "./Login";
import './css/style.css';

// ReactDOM.render(<Map/>, document.getElementById('root'));

// const onSuccess = response => console.error(response);

const onFailure = response => console.error(response);
class App extends React.Component {

    resetMap() {
        // ReactDOM.render(<Map/>, document.getElementById('root'));

        ReactDOM.unmountComponentAtNode(document.getElementById('root'));
        render(<Map/>, document.getElementById('root'));

    }

    render() {

        function displayWindowSize(){

            var w = document.documentElement.clientWidth;
            var h = document.documentElement.clientHeight;
            if (w < 1800  && h < 850) {
                document.getElementById("root").style.height="87%";
                // document.getElementById("header").style.height="50px";
            }
            else{
                document.getElementById("root").style.height="96%";
                // document.getElementById("header").style.height="50px";
            }

        }
        window.addEventListener("resize", displayWindowSize);
        displayWindowSize();

        return (
            <Login/>
        )
    }
}

render(<App/>, document.getElementById('root'));

export default App

