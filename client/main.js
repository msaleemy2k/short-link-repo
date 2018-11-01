import './main.html';
import {Meteor} from 'meteor/meteor';
import ReactDOM from 'react-dom';
import {Tracker} from 'meteor/tracker';
import {routes,onAuthChange} from '../import/routes/routes';
import '../import/startup/simple-schema-configuration.js';
import {Session} from 'meteor/session';

Tracker.autorun(() =>{
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);

});

Meteor.startup(() => {
  Session.set('showVisible',true);
ReactDOM.render(routes(),document.getElementById('app'));
}
);
