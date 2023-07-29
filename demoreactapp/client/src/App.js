import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import AppRouter from './components/AppRouter'

const ADMIN_ID = 'ADMIN'

function App() {
  var [state, setState] = useState({
    data: null
  });

  const callEnqueue = async () => {
    const response = await fetch(`/enqueue/${ADMIN_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: 'Hello World!' }),
    });
    const body = await response.message;

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  useEffect(() => {
    callEnqueue()
      .then(res => setState({ data: res.message }))
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
