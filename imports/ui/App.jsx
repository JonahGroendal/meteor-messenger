import React from 'react';
import RegistrationForm from './RegistrationForm.jsx'
import { withTracker } from 'meteor/react-meteor-data';

const styles = {
  root: {
    height: '100%'
  }
}

function App(props) {
  return (
    <div style={styles.root}>
      {props.main}
    </div>
  )
};

export default withTracker(props => {
  // props here will have `main`, passed from the router
  // anything we return from this function will be *added* to it
  return {};
})(App);
