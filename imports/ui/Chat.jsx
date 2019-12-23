import React, { useState } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Messages, { getConvoId } from '../api/messages.js';
import { Comment, Avatar, Input, Button } from 'antd';
import moment from 'moment';

const { TextArea } = Input;

function Chat({ userId, users, messages, loading }) {
  const [textInput, setTextInput] = useState('');
  const handleSend = () => {
    Meteor.call('messages.send', [userId, textInput]);
    setTextInput('');
  }

  return (
    <div>
      <div>
        {messages.map((message, i) => (
          <Comment
            key={i}
            author={users[message.author]}
            avatar={
              <Avatar>{users[message.author].charAt(0).toUpperCase()}</Avatar>
            }
            content={
              <p>{message.text}</p>
            }
            datetime={
              <span>{moment(message.timestamp).fromNow()}</span>
            }
          />
        ))}
      </div>
      <div>
        <TextArea
          value={textInput}
          onChange={e => setTextInput(e.target.value)}
          placeholder="Type a message"
          autoSize={{ minRows: 1, maxRows: 5 }}
          style={{ maxWidth: '80%' }}
        />
        <Button type="primary" onClick={handleSend}>
          Send
        </Button>
      </div>
    </div>
  )
}

export default withTracker(({ userId }) => {
  const messagesHandle = Meteor.subscribe('messages', userId);
  const directoryHandle = Meteor.subscribe('directory')
  const thisUser = Meteor.user();
  const loading = !messagesHandle.ready() || !directoryHandle.ready()
  let convoId;
  let messages = [];
  const users = {};
  if (!loading) {
    users[thisUser._id] = thisUser.username;
    users[userId] = Meteor.users.findOne({ _id: userId }).username;
    convoId = getConvoId(thisUser._id, userId);
    messages = Messages.find({ convoId }).fetch();
  }
  return {
    loading,
    messages,
    users,
    userId
  };
})(Chat);
