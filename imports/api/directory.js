import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
  Meteor.publish('directory', function () {
    return Meteor.users.find({}, { username: true, _id: true });
  });
}
