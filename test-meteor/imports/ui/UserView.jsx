import React, { useState, useEffect } from 'react';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { Router } from 'meteor/iron:router'
import { LinksCollection, UserStateCollection } from '../api/links';

import { Meteor } from 'meteor/meteor';

export const UserView = ({ teamName }) => {



  console.log("init user view again")
  
 // initState = UserStateCollection.findOne({teamName: teamName})

  const [state, setState] = useState({
    teamName: teamName,
    "stateTestA": "PRESSED",
    "stateTestB": "UNKOWN"
  })

  useEffect(() => {
    console.log('pu^ssssssh state ' + JSON.stringify(state))
    Meteor.call('pushState', state)
  }, [state])

  const updateSomething = (changes) => {
    setState(previousState => {
      return { ...previousState, ...changes }
    });
  }

const toggle = (value) => {
  if(value === "OFF") {
    return "OK"
  } else {
    return "OFF"
  }
}

  const pressSmtn = (what) => {
    return () => {
      updt = {}
      updt[what] = toggle(state[what])
      updateSomething(updt)
    }
  }

  return (
    <div>
      <h1>i am {state.teamName} </h1>
      <button  onClick={pressSmtn("stateTestA")}>press A={state["stateTestA"]}</button>
      <button  onClick={pressSmtn("stateTestB")}>press B={state["stateTestB"]}</button>
    </div>
  );
};
