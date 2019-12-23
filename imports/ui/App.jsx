import 'antd/dist/antd.css';

import React from 'react';
import RegistrationForm from './RegistrationForm.jsx'
import { withTracker } from 'meteor/react-meteor-data';

function App(props) {
  return (
    <div>
      {props.main}
    </div>
  )
};

export default withTracker(props => {
  // props here will have `main`, passed from the router
  // anything we return from this function will be *added* to it
  return {};
})(App);
