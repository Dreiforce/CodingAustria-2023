/* import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import AppRouter from './components/AppRouter'

const ADMIN_ID = 'ADMIN'
var i = 0

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
      body: JSON.stringify({ message: 'Hello World! ' + i++ }),
    });
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  const callDequeue = async () => {
    const response = await fetch(`/dequeue/${ADMIN_ID}`);
    const body = await response.json();
    return body;
  };

  setInterval(callDequeue, 1000);

  var enqueueMessage = (e) => {
    if (e.target.id === "enqueueButton") {
      callEnqueue()
      .catch(err => console.log(err));
    }
  }

  return (
    <div className="App">
      <AppRouter></AppRouter>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button id="enqueueButton" onClick={enqueueMessage}>Enqueue Message</button>
        <p>
        {state.data ? (
          <p>Data from the message queue: {state.data}</p>
        ) : (
          <p>Loading...</p>
        )}
        </p>
        <a className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
 */

import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Map1 from "./pages/Map1";
import { useEffect } from "react";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/map":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/map" element={<Map1 />} />
    </Routes>
  );
}
export default App;
