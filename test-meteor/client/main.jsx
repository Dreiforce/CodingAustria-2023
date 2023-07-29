import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { App } from '/imports/ui/App';
import {UserView } from '/imports/ui/UserView'
import { Router } from 'meteor/iron:router'
import { AdminView } from '../imports/ui/AdminView';




Meteor.startup(() => {
  const container = document.getElementById('react-target');
  const root = createRoot(container);

  Router.route('/', function () {
    root.render(<App />);
  });
  
  
  Router.route('/admin', function () {
    root.render(<AdminView />);
  });
  
  Router.route('/u/:teamName', function () {
    root.render(<UserView teamName={this.params.teamName}/>);
  });

});
