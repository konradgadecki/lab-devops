import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor(props){
    super(props);
  
    this.state = {
      cases : "",
      deaths: "",
      hello_response: "",
      death_rate: "",
      history: [] 
    };
  }

  handleClick = async () => {
    console.log("sending request to /api/...");
    const helloResponse = await axios.get('/api/');
    this.setState({hello_response: helloResponse.data})
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

    const response = await axios.post("/api/rate", rate);
    console.log(response);

    this.setState({death_rate: response.data});
  };

  onChangeForm = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  fetchHistory = async () => {
    const response = await axios.get('/api/history');
    console.log(response);

    this.setState({history: response.data});
  }

  render () {
    
    const { cases, deaths } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <dix>
            <button onClick={this.handleClick}>Send request to backend</button>
            <br />
            <br />
              {this.state.hello_response}
            <br />
            <br />
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
            <br />
            {this.state.death_rate}

            <h4>History of fatality rate:</h4>
            <button type="button" onClick={this.fetchHistory}>Fetch</button>
            <br />
            {this.state.history.map((item, i) => <p key={i}>{item["rate"]}</p>)}
          </dix>
        </header>
      </div>
    );
  }
}

export default App;
