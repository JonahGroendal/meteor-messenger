import React, { useState } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Messages, { getConvoId } from '../api/messages.js';
import { Comment, Avatar, Input, Button } from 'antd';
import moment from 'moment';

const { TextArea } = Input;

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: 0
  },
  messages: {
    paddingLeft: '10px',
    paddingRight: '10px',
    display: 'flex',
    flexDirection: 'column-reverse',
    flexGrow: 1,
    overflowY: 'scroll'
  },
  input: {
    display: 'flex',
    padding: '10px'
  },
  button: {
    marginLeft: '10px'
  }
}

function Chat({ userId, users, messages, loading }) {
  const [textInput, setTextInput] = useState('');
  const newestMessage = React.createRef();

  const handleSend = () => {
    Meteor.call('messages.send', [userId, textInput]);
    setTextInput('');
    newestMessage.current.scrollIntoView(false);
  }

  return (
    <div style={styles.root}>
      <div style={styles.messages}>
        <div ref={newestMessage} />
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
      <div style={styles.input}>
        <TextArea
          value={textInput}
          onChange={e => setTextInput(e.target.value)}
          placeholder="Type a message"
          autoSize={{ minRows: 1, maxRows: 5 }}
        />
        <Button type="primary" onClick={handleSend} style={styles.button}>
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
    messages = Messages.find({ convoId }, {sort: {timestamp: -1}}).fetch();
  }
  return {
    loading,
    messages,
    users,
    userId
  };
})(Chat);
