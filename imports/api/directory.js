import { Meteor } from 'meteor/meteor';

Meteor.publish('directory', function () {
  return Meteor.users.find({}, { username: true, _id: true });
});
