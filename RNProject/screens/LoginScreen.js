/**
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
import Meteor from 'react-native-meteor';

function LoginScreen({ navigation }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = () => {
    Meteor.loginWithPassword(username, password, err => {
      if (!err) {
        console.log('login successful')
        navigation.navigate('Contacts')
      }
      else {
        console.log(err.reason)
      }
    })
  }

  const handlePressRegister = () => {
    navigation.navigate('Register');
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
          onChangeText={setPassword}
          value={password}
          onSubmitEditing={handleSubmit}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Log In"
          onPress={handleSubmit}
          color="#ff751a"
        />
      </View>
      <View style={styles.createAccountContainer}>
        <Text style={styles.text}>Or </Text>
        <TouchableOpacity style={styles.touchable} onPress={handlePressRegister}>
          <Text style={styles.touchableText}>create an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

LoginScreen.navigationOptions = {
  header: null,
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
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
