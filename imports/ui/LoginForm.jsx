import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { Accounts } from 'meteor/accounts-base';

const styles= {
  root: {
    padding: '10px'
  },
  form: {
    maxWidth: '400px'
  },
  button: {
    width: '100%'
  }
}

function LoginForm(props) {
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        Meteor.loginWithPassword(values.username, values.password, err => {
          if (!err)
            FlowRouter.go('/contacts')
          else
            console.log(err.reason)
        })
      }
    });
  };

  const { getFieldDecorator } = props.form;
  return (
    <div style={styles.root}>
      <Form onSubmit={handleSubmit} style={styles.form}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={styles.button}>
            Log in
          </Button>
          Or <a href="" onClick={() => FlowRouter.go('/register')}>register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Form.create({ name: 'login' })(LoginForm);
