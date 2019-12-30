/**
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, Text, View, TextInput, Button, FlatList} from 'react-native';
import Meteor, { withTracker } from 'react-native-meteor';

function Message({ text, isIncoming }) {
  return (
    <View style={[
      styles.messageRow,
      {justifyContent: isIncoming ? 'flex-start' : 'flex-end'}
    ]}>
      <View style={[
        styles.message,
        {
          backgroundColor: isIncoming ? '#E0E0E0' : '#ff751a',
          borderTopLeftRadius: isIncoming ? 5 : 12,
          borderTopRightRadius: isIncoming ? 12 : 5,
          borderBottomRightRadius: isIncoming ? 7 : 2,
          borderBottomLeftRadius: isIncoming ? 2 : 7,
        }
      ]}>
        <Text style={isIncoming ? {color: 'black'} : {color: 'white'}}>
          {text}
        </Text>
      </View>
    </View>
  )
}

function ChatScreen({loading, messages, users, userId}) {
  const [inputText, setInputText] = React.useState('');

  const messagesRef = React.useRef();

  const handleSend = () => {
    Meteor.call('messages.send', [userId, inputText]);
    setInputText('');
    messagesRef.current.scrollToOffset({ animated: true, offset: 0 });
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.titleText}>{users[userId]}</Text>
      </View>
      <View style={styles.messagesContainer}>
        <FlatList
          ref={messagesRef}
          inverted={true}
          data={messages}
          keyExtractor={(item, index) => item.timestamp.toString()}
          renderItem={({ item }) => (
            <Message
              text={item.text}
              isIncoming={item.author === userId}
            />
          )}
          ListHeaderComponent={() => <View style={{ height: 10 }}></View>}
        />
      </View>
      <View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={setInputText}
            value={inputText}
            onSubmitEditing={handleSend}
          />
          <View style={styles.buttonContainer}>
            <Button
              color="#ff751a"
              title="Send"
              onPress={handleSend}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  textInputContainer: {
    padding: 10,
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  buttonContainer: {
    width: 60,
    marginLeft: 10,
    justifyContent: 'center',
  },
  messageRow: {
    flexDirection: 'row',
  },
  message: {
    padding: 5,
    marginTop: 5,
    maxWidth: '70%',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  titleText: {
    fontSize: 22,
  }
});

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
    users[userId] = Meteor.collection('users').findOne({ _id: userId }).username;
    convoId = getConvoId(thisUser._id, userId);
    messages = Meteor.collection('messages').find({ convoId }, {sort: {timestamp: -1}});
  }
  return {
    loading,
    messages,
    users,
    userId
  };
})(ChatScreen);

function getConvoId(userId1, userId2) {
  const ids = [userId1, userId2]
  ids.sort()
  return ids.join('')
}
