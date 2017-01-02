import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Example from './Grid.js';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to Gbox</h2>
                </div>
                <Example/>
            </div>
        );
    }
}

export default App;
