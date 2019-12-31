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

function ChatScreen({loading, messages, userId}) {
  const [inputText, setInputText] = React.useState('');

  const messagesRef = React.useRef();

  const handleSend = () => {
    Meteor.call('messages.send', [userId, inputText]);
    setInputText('');
    messagesRef.current.scrollToOffset({ animated: true, offset: 0 });
  }

  return (
    <View style={styles.container}>
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
  titleText: {
    fontSize: 22,
  }
});

ChatScreen = withTracker(props => {
  const user = props.navigation.getParam('user', undefined);
  const thisUser = Meteor.user();
  const messagesHandle = Meteor.subscribe('messages', user._id);
  const directoryHandle = Meteor.subscribe('directory')
  const loading = !messagesHandle.ready() || !directoryHandle.ready()
  let messages = [];
  const convoId = getConvoId(thisUser._id, user._id);
  if (!loading)
    messages = Meteor.collection('messages').find({ convoId }, {sort: {timestamp: -1}});

  return {
    loading,
    messages,
    userId: user._id,
  };
})(ChatScreen);

ChatScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam("user").username
});

export default ChatScreen;

function getConvoId(userId1, userId2) {
  const ids = [userId1, userId2]
  ids.sort()
  return ids.join('')
}
