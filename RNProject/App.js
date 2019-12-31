/**
 * @format
 * @flow
 */

// import 'react-native-gesture-handler';

import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import Meteor, { withTracker } from 'react-native-meteor';
import {createAppContainer, createStackNavigator} from 'react-navigation';
// import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './screens/LoginScreen.js';
import RegisterScreen from './screens/RegisterScreen.js';
import ContactsScreen from './screens/ContactsScreen.js';
import ChatScreen from './screens/ChatScreen.js';

const SERVER_IP_ADDR = process.env['SERVER_IP_ADDR']
console.log('SERVER_IP_ADDR', SERVER_IP_ADDR);
Meteor.connect(`ws://${SERVER_IP_ADDR}:3000/websocket`);

const MainNavigator = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
  Contacts: ContactsScreen,
  Chat: ChatScreen,
});

const App = createAppContainer(MainNavigator);

export default App;

// function App({ userId }) {
//   console.log('userId', userId)
//   const loggedIn = !!userId;
//   const [showRegisterScreen, setShowRegisterScreen] = React.useState(false);
//   const [targetUserId, setTargetUserId] = React.useState(null);
//
//   return (
//     <SafeAreaView style={styles.container}>
//       {!loggedIn
//         ? !showRegisterScreen
//           ? <LoginScreen onPressRegister={() => setShowRegisterScreen(true)}/>
//           : <RegisterScreen onPressLogIn={() => setShowRegisterScreen(false)}/>
//         : !targetUserId
//           ? <ContactsScreen onSelectUserId={setTargetUserId}/>
//           : <ChatScreen userId={targetUserId} onBack={() => setTargetUserId(null)}/>
//       }
//     </SafeAreaView>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
//
// export default withTracker(props => {
//   return {
//     userId: Meteor.userId()
//   }
// })(App)
