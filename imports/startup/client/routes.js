import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import App from '../../ui/App.jsx';
import RegistrationForm from '../../ui/RegistrationForm.jsx';
import LoginForm from '../../ui/LoginForm.jsx';
import Contacts from '../../ui/Contacts.jsx';
import Chat from '../../ui/Chat.jsx';

FlowRouter.route('/', {
  triggersEnter: [ (context, redirect) => redirect('/login') ]
})

FlowRouter.route('/login', {
  name: 'Login',
  action: () => {
    mount(App, {
      main: <LoginForm />
    })
  }
})

FlowRouter.route('/register', {
  name: 'Registration',
  action: () => {
    mount(App, {
      main: <RegistrationForm />
    })
  }
})

FlowRouter.route('/contacts', {
  name: 'Contacts',
  action: () => {
    mount(App, {
      main: <Contacts />
    })
  }
})

FlowRouter.route('/chat/:userId', {
  name: 'Chat',
  action: params => {
    mount(App, {
      main: <Chat userId={params.userId}/>
    })
  }
})

// FlowRouter.route('/lists/:_id', {
//   name: 'Lists.show',
//   action() {
//     mount(AppContainer, {
//       main: <ListPageContainer/>,
//     });
//   },
// });
