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
import Select from "./pages/Select";
import { useEffect, useState } from "react";


import { socket } from './lib/netcode.js'

const ADMIN_ID = 'ADMIN'
var i = 0
var interval = undefined

// socket.on('connect', () => {
//   socket.emit('message', {
//     text: {test: "hallowelt"},
//     name: "admin",
//     id: `${socket.id}${Math.random()}`,
//     socketID: socket.id,
//   });
// })

function App() {

  var [connected, setConnected] = useState(false)

  var [userstate, setUserState] = useState({
    //map of username -> {state}
    "example": { userName: "example" }
  });

  const [tempString, setTemp] = useState("--.- °C")
  
  const fetchTemp = async ()=> {
   await fetch('http://localhost:3000/weather/v1/station/current/tawes-v1-10min')
   .then(async data => {
     const res = await data.json();
     const tl = res.features[0].properties.parameters["TL"]
     const tmep = tl.data[0] + " " + tl.unit
     console.log(JSON.stringify(tmep));
     setTemp(tmep)
   })
  }
 
   useEffect(() => {
     const intervalID = setInterval(async () => {
       fetchTemp()
     }, 180000)
 
     setTimeout(fetchTemp, 1000)
 
     return () => {
       clearInterval(intervalID)
     }
   })

  useEffect(() => {
    // no-op if the socket is already connected
    socket.connect();
    socket.on('connect', function() {
      setConnected(true)
    })

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    function onUpdateUserState(value) {

      console.log("upating state for client state" + JSON.stringify(value))

      var updated = {}
      updated[value.userName] = value.state
      setUserState({ ...userstate, ...updated });
    }

    socket.on('update_state', onUpdateUserState);

    return () => {
      socket.off('update_state', onUpdateUserState);
    };
  }, [userstate]);


  var enqueueMessage = () => {
    if(userstate["hallowelt"] == undefined) {
        userstate["hallowelt"] = {
          userName: "hallowelt",
          testA: "test"
        }
    }

    socket.emit('update_state', {
      text: { test: "hallowelt" },
      userName: userstate["hallowelt"].userName,
      state: userstate["hallowelt"],
      id: `${socket.id}${Math.random()}`,
      socketID: socket.id,
    });
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
        title = "err";
        metaDescription = "err";
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
      {/* <button id="enqueueButton" onClick={enqueueMessage}>Enqueue Message</button>

      {userstate.data ? (
        <p>Data from the message queue: {userstate.data}</p>
      ) : (
        <p>Loading...</p>
      )} */}

      <Routes>
        <Route path="/" element={<Select/>} />
        <Route path="/:userName/" element={<Home userstate={userstate} connected={connected} setUserState={setUserState} tempString={tempString}/>} />
        <Route path="/:userName/map" element={<Map1 userstate={userstate} connected={connected} tempString={tempString}/>} />
        <Route path="/admin" element={<Admin userstate={userstate} connected={connected} />} />
      </Routes></div>
  );
}
export default App;
