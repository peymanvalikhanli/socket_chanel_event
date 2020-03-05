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

  click() {
    server_connection.register('mahsa', 'pm1212asssasn@gmail.com', '1234567890');
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
click1() {
    if (server_connection.check_login()) {
      server_connection.recovery_pass();
    } else {
      alert('not login login');
    }
    
  }

  render() {
    if (!this.state.text) {
      return null;
    }
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>{this.state.text}</Text>
        <Button title="Press me" onPress={() => this.click()} />
      </View>
    );
  }
}
