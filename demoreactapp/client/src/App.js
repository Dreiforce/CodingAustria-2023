import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import AppRouter from './components/AppRouter'

function App() {
  var [state, setState] = useState({
    data: null
  });

  const callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  useEffect(() => {
    callBackendAPI()
      .then(res => setState({ data: res.express }))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      <AppRouter></AppRouter>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        {state.data ? (
          <p>Data from the backend: {state.data}</p>
        ) : (
          <p>Loading...</p>
        )}
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

export default App;
