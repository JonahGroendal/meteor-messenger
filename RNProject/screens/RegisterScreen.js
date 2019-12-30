/**
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
import Meteor, { Accounts } from 'react-native-meteor';

export default function RegisterScreen({ onPressLogIn }) {
  const [username, setUsername] = React.useState('');
  const [password1, setPassword1] = React.useState('');
  const [password2, setPassword2] = React.useState('');

  const handleSubmit = () => {
    if (password1 === password2) {
      Accounts.createUser({
        username: username,
        password: password1
      }, err => {
        if (err)
          console.log(err.reason)
        else
          console.log('User created')
      })
    }
    else {
      console.log("passwords don't match")
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>Username</Text>
        <TextInput
          style={styles.textInput}
          autoCompleteType="username"
          onChangeText={setUsername}
          value={username}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Password</Text>
        <TextInput
          style={styles.textInput}
          autoCompleteType="password"
          secureTextEntry={true}
          onChangeText={setPassword1}
          value={password1}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Retype Password</Text>
        <TextInput
          style={styles.textInput}
          autoCompleteType="password"
          secureTextEntry={true}
          onChangeText={setPassword2}
          value={password2}
          onSubmitEditing={handleSubmit}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Create account"
          onPress={handleSubmit}
          color="#ff751a"
        />
      </View>
      <View style={styles.createAccountContainer}>
        <Text style={styles.text}>Or </Text>
        <TouchableOpacity style={styles.touchable} onPress={onPressLogIn}>
          <Text style={styles.touchableText}>log in to an existing account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    marginTop: 10
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  button: {
    marginTop: 20,
  },
  text: {
    // fontSize: 16,
  },
  touchable: {
    // backgroundColor: '#DDDDDD',
  },
  touchableText: {
    // fontSize: 16,
    color: '#ff751a',
  },
  createAccountContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
});
