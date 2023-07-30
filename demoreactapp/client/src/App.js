/* import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import AppRouter from './components/AppRouter'


function App() {
  
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
import Admin from "./pages/Admin";
import { useEffect,useState } from "react";

import socketIO from 'socket.io-client';

const ADMIN_ID = 'ADMIN'
var i = 0
var interval = undefined

const socket = socketIO.connect('http://localhost:3000');  
socket.on('connect', () => {
  
  socket.emit('message', {
    text: {test: "hallowelt"},
    name: "admin",
    id: `${socket.id}${Math.random()}`,
    socketID: socket.id,
  });
})

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

  const onMessage = (message) => {
      setState({data: message})
  }

  const callDequeue = async () => {
    const response = await fetch(`/dequeue/${ADMIN_ID}`);
    const body = await response.json();
    if(body.empty === false) {
      onMessage(body.message)
    }
  };

  if(interval !== undefined) clearInterval(interval);
  // interval = setInterval(callDequeue, 1000);

  var enqueueMessage = (e) => {
    if (e.target.id === "enqueueButton") {
      callEnqueue()
      .catch(err => console.log(err));
    }
  }



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
      default:
        title="err";
        metaDescription="err";
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
    <div>
              <button id="enqueueButton" onClick={enqueueMessage}>Enqueue Message</button>
        
        {state.data ? (
          <p>Data from the message queue: {state.data}</p>
        ) : (
          <p>Loading...</p>
        )}
        
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/map" element={<Map1 />} />
      <Route path="/admin" element={<Admin />} />
    </Routes></div>
  );
}
export default App;
