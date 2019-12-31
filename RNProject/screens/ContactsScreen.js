/**
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, Text, View, ScrollView, TextInput, Button, FlatList, TouchableOpacity} from 'react-native';
import Meteor, {withTracker} from 'react-native-meteor';
import { StackActions, NavigationActions } from 'react-navigation';

function Separator() {
  return (
    <View
      style={{
        backgroundColor: '#E0E0E0',
        height: 2,
      }}
    />
  );
}

function Contact({ user, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(user)}
      style={[
        styles.item,
        selected ? { backgroundColor: '#E0E0E0' } : {},
      ]}
    >
      <Text style={styles.title}>{user.username}</Text>
      <Text style={styles.title}>{">"}</Text>
    </TouchableOpacity>
  );
}

function ContactsScreen({ users, navigation }) {
  const [selectedId, setSelectedId] = React.useState('');

  const onSelect = (user) => {
    setSelectedId(user._id);
    setTimeout(() => {
      navigation.navigate('Chat', { user })
    }, 100)
  }

  const handleLogout = () => {
    Meteor.logout(err => {
      if (!err)
        navigation.dispatch(resetToLogin)
    })
  }

  return (
    <View>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <Contact
            user={item}
            selected={selectedId === item._id}
            onSelect={onSelect}
          />
        )}
        ItemSeparatorComponent={() => <Separator />}
        keyExtractor={item => item._id}
        extraData={selectedId}
      />
      <Separator />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 32,
  },
});

ContactsScreen = withTracker(() => {
  const handle = Meteor.subscribe('directory');
  return {
    users: Meteor.collection('users').find({}),
    loading: !handle.ready()
  };
})(ContactsScreen);

ContactsScreen.navigationOptions = ({ navigation }) => ({
  title: 'Contacts',
  headerLeft: null,
  headerRight: (
    <View style={{ marginRight: 10 }}>
      <Button
        onPress={() => {
          Meteor.logout(err => {
            if (!err)
              navigation.navigate('Login')
          })
        }}
        title="Log Out"
        color="#ff751a"
      />
    </View>
  ),
});

export default ContactsScreen;
