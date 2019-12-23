import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { List, Avatar } from 'antd';

function Contacts(props) {
  return (
    <List
      itemLayout="horizontal"
      dataSource={props.users}
      renderItem={user => (
        <List.Item onClick={() => FlowRouter.go(`/chat/${user._id}`)}>
          <List.Item.Meta
            avatar={<Avatar size="large" icon="user" />}
            title={user.username}
          />
        </List.Item>
      )}
    />
  )
}

export default withTracker(() => {
  const handle = Meteor.subscribe('directory');
  return {
    users: Meteor.users.find({}).fetch(),
    loading: !handle.ready()
  };
})(Contacts);
