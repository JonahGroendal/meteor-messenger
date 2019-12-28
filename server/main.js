import '../imports/api'

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  try {
    Accounts.createUser({
      username: 'user1',
      password: 'aaa'
    });
    Accounts.createUser({
      username: 'user2',
      password: 'aaa'
    });
    Accounts.createUser({
      username: 'user2',
      password: 'aaa'
    });
  } catch (error) {
    if (error.reason !== 'Username already exists.')
      throw error
  }
});
