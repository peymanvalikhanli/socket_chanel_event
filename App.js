import React, {Component} from 'react';
import {Text, View} from 'react-native';

// import Echo from 'laravel-echo/dist/echo';
// import Socketio from 'socket.io-client';
// import Echo from 'laravel-echo/dist/echo';
// import io from 'socket.io-client/dist/socket.io';

import Echo from 'laravel-echo/dist/echo';
import io from 'socket.io-client';
let echo;
let class_this = null; 
export default class HelloWorldApp extends Component {
  constructor(props) {
    super(props);
    this.state = {text: 'peyman ...'};
    class_this = this;
    echo = new Echo({
      broadcaster: 'socket.io',
      host: 'http://164.138.18.90:6001',
      client: io,
      // auth: {
      //   headers: {
      //     Authorization: '5024144a6cc71e84989978bc0afc85ab',
      //   },
      //   // key:'',
      // },
    });

    echo.channel('laravel_database_channel-demo').listen('PostCreatedEvent', function(e) {
      console.log('peyman logs : ', e);
     class_this.setState({
       text: JSON.stringify(e),
     });
   });
  }

  // componentDidMount() {
  //   this.setState({
  //     text: 'test connect'//JSON.stringify(e),
  //   });
   
  // }
  render() {
    if (!this.state.text) {
      return null;
    }
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>{this.state.text}</Text>
      </View>
    );
  }
}
