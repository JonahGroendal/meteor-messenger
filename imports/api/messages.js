import { Mongo } from 'meteor/mongo';

const Messages = new Mongo.Collection('messages');

export default Messages;

export function getConvoId(userId1, userId2) {
  const ids = [userId1, userId2]
  ids.sort()
  return ids.join('')
}

if (Meteor.isServer) {
  Meteor.publish('messages', function(userId) {
    if (!this.userId)
      return this.ready();

    return Messages.find({
      convoId: getConvoId(this.userId, userId)
    });
  });
}

Meteor.methods({
  'messages.send': function([userId, text]) {
    Messages.insert({
      convoId: getConvoId(this.userId, userId),
      author: Meteor.userId(),
      timestamp: Date.now(),
      text,
    })
  }
})
