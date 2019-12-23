import 'antd/dist/antd.css';

import React from 'react';
// import Hello from './Hello.jsx';
// import Info from './Info.jsx';
import RegistrationForm from './RegistrationForm.jsx'
import { withTracker } from 'meteor/react-meteor-data';

function App(props) {
  console.log('Meteor.user()', props.user)
  return (
    <div>
      {props.main}
    </div>
  )
};
// <RegistrationForm />
// <h1>Welcome to Meteor!</h1>
// <Hello />
// <Info />

export default withTracker(props => {
  // props here will have `main`, passed from the router
  // anything we return from this function will be *added* to it
  return {
    user: Meteor.user(),
  };
})(App);
