/**
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, Text, View, ScrollView, TextInput, Button, FlatList, TouchableOpacity} from 'react-native';
import Meteor, {withTracker} from 'react-native-meteor';

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

function Item({ id, title, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={[
        styles.item,
        selected ? { backgroundColor: '#E0E0E0' } : {},
      ]}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.title}>{">"}</Text>
    </TouchableOpacity>
  );
}

function ContactsScreen({ users, onSelectUserId }) {
  const [selectedId, setSelectedId] = React.useState('');

  const onSelect = id => {
    setSelectedId(id);
    setTimeout(() => onSelectUserId(id), 100)
  }

  const handleLogout = () => Meteor.logout()

  return (
    <View>
      <View style={styles.topBar}>
        <Button
          onPress={handleLogout}
          title="Log Out"
          color="#ff751a"
        />
      </View>
      <Separator />
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <Item
            id={item._id}
            title={item.username}
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
  topBar: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  item: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 32,
  },
});

export default withTracker(() => {
  const handle = Meteor.subscribe('directory');
  return {
    users: Meteor.collection('users').find({}),
    loading: !handle.ready()
  };
})(ContactsScreen);
