import React, {Component} from 'react';
import {Text, View, Button, AsyncStorage} from 'react-native';
import server_connection from './server_connection';

import Echo from 'laravel-echo/dist/echo';
import io from 'socket.io-client';
let echo;
let class_this = null;
export default class HelloWorldApp extends Component {
  constructor(props) {
    super(props);
    this.state = {text: 'peyman ...'};
    class_this = this;
    // echo = new Echo({
    //   broadcaster: 'socket.io',
    //   host: 'http://164.138.18.90:6001',
    //   client: io,
    //   // auth: {
    //   //   headers: {
    //   //     Authorization: '5024144a6cc71e84989978bc0afc85ab',
    //   //   },
    //   //   // key:'',
    //   // },
    // });

    // echo
    //   .channel('laravel_database_channel-demo')
    //   .listen('PostCreatedEvent', function(e) {
    //     console.log('peyman logs : ', e);
    //     class_this.setState({
    //       text: JSON.stringify(e),
    //     });
    //   });
  }

  // componentDidMount() {
  //   this.setState({
  //     text: 'test connect'//JSON.stringify(e),
  //   });

  // }

  register_click() {
    server_connection.register(
      'mahsa',
      'peymanvalikhanli2012@gmail.com',
      '1234567890',
    );
  }
  login_click() {
    server_connection.login('msn@gmail.com', '12');
  }
  check_login_click() {
    if (server_connection.check_login()) {
      alert('is login');
    } else {
      alert('not login login');
    }
  }
  contactList_click() {
    if (server_connection.check_login()) {
      server_connection.contact_list();
    } else {
      alert('not login login');
    }
  }
  recovery_click() {
    server_connection.recovery_pass('peymanvalikhanli2012@gmail.com');
  }
  changepass_click() {
    server_connection.change_pass(
      'peymanvalikhanli2012@gmail.com',
      '1234567890',
      '1677',
    );
  }
  ChatHistory_click() {
    server_connection.ChatHistory(11);
  }
  CreateGroup_click() {
    server_connection.create_group("NEBKA", [2,3]);
  }

  render() {
    if (!this.state.text) {
      return null;
    }
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>{this.state.text}</Text>
        <Button title="Registry" onPress={() => this.register_click()} />
        <Button title="Recovery" onPress={() => this.recovery_click()} />
        <Button title="Change pass" onPress={() => this.changepass_click()} />
        <Button title="Check Login" onPress={() => this.check_login_click()} />
        <Button title="Chat History" onPress={() => this.ChatHistory_click()} />
        <Button title="Create Group" onPress={() => this.CreateGroup_click()} />
      </View>
    );
  }
}
