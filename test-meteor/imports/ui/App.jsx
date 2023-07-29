import React from 'react';
import { UserView } from './UserView.jsx';
import { AdminView } from './AdminView.jsx';


export const App = () => (
  <div>
    <h1>Welcome to Meteor!</h1>
    <a href='/admin'>Admin</a><br></br>
    <a href='/u/TeamA'>Team A</a><br></br>
    <a href='/u/TeamB'>Team B</a><br></br>
  </div>
);

