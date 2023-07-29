import React, { useState } from 'react';
import { Router } from 'meteor/iron:router'

export const UserView = ({ teamName }) => {


  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  };

  return (
    <div>
      <h1>i am {teamName} </h1>
      <button onClick={increment}>Click Me</button>
      <p>You've pressed the button {counter} times.</p>
    </div>
  );
};
