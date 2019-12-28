import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { List, Avatar } from 'antd';

const styles={
  root: {
    padding: '10px'
  },
  contact: {
    cursor: 'pointer'
  }
}

function Contacts(props) {
  return (
    <div style={styles.root}>
      <List
        itemLayout="horizontal"
        dataSource={props.users}
        renderItem={user => (
          <List.Item
            style={styles.contact}
            onClick={() => FlowRouter.go(`/chat/${user._id}`)}
          >
            <List.Item.Meta
              avatar={<Avatar size="large" icon="user" />}
              title={user.username}
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default withTracker(() => {
  const handle = Meteor.subscribe('directory');
  return {
    users: Meteor.users.find({}).fetch(),
    loading: !handle.ready()
  };
})(Contacts);
