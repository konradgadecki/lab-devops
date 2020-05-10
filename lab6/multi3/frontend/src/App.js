import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  handleClick = async () => {
    console.log("sending request to /api/...");
    const helloResponse = await axios.get('/apij');
    console.log(helloResponse);
  }
  
  onSubmit = async e => {
    e.preventDefault();
    const { cases, deaths } = this.state;
    if (cases === "" || deaths === "") {
      return;
    }
    const rate = {
      cases,
      deaths
    };

    await axios.post("http://localhost:5000/api/rate", rate);
  };

  onChangeForm = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  state = { cases : "", deaths: "" }

  render () {
    
    const { cases, deaths } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <dix>
            <button onClick={this.handleClick}>Send request to backend</button>

            <div>
          <div className="card mb-3">
            <div className="card-header">Count death rate</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="cases">Cases</label>
                  <input
                    type="text"
                    name="cases"
                    className="form-control form-control-lg"
                    placeholder="Enter cases..."
                    defaultValue={cases}
                    onChange={this.onChangeForm}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="deaths">Deaths</label>
                  <input
                    type="text"
                    name="deaths"
                    className="form-control form-control-lg"
                    placeholder="Enter deaths..."
                    defaultValue={deaths}
                    onChange={this.onChangeForm}
                  />
                </div>
                <input
                  type="submit"
                  value="Count rate"
                  className="btn btn-light btn-block"
                />
              </form>
            </div>
          </div>
        </div>
          </dix>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
