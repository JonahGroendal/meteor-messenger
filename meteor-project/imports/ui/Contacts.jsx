import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { List, Avatar, Button } from 'antd';

const styles={
  root: {
    padding: '10px'
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: '10px',
  },
  title: {
    fontSize: 20,
  },
  contact: {
    cursor: 'pointer'
  }
}

function Contacts(props) {
  const handleClickLogOut = () => {
    Meteor.logout(err => {
      if (!err)
        FlowRouter.go('/login')
    })
  }

  return (
    <div style={styles.root}>
      <div style={styles.topBar}>
        <p style={styles.title}>Contacts</p>
        <Button
          type="primary"
          style={styles.button}
          onClick={handleClickLogOut}
        >
          Log Out
        </Button>
      </div>
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
