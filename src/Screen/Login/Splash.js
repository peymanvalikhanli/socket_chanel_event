import React, {Component} from 'react';
import {View, StyleSheet, Image, AsyncStorage} from 'react-native';
import {Container, Header, Content, Spinner, Text} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Logincss from './Logincss';

import server_connection from '../../../server_connection';

import PushNotification from 'react-native-push-notification';

import Echo from 'laravel-echo/dist/echo';
import io from 'socket.io-client';
let echo;

export default class splash extends Component {
  constructor() {
    super();
    server_connection.check_login(this, this.run_server_connection);
    AsyncStorage.setItem('user_message', "");
  }

  run_server_connection(this_class, data) {
    this_class.setState({
      n: this_class.props.navigation.navigate('ChatlistIndex'),
    });
    PushNotification.configure({
      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log('peyman test LOCAL NOTIFICATION ==>', notification);
        AsyncStorage.getItem('user_message', (err, result) => {
          console.log('recive message peyman : ', result);
          if (result != null) {
            result = JSON.parse(result); 
            result.forEach(element =>{
              console.log("show element: ", element); 
              if(notification.title == element.From){
                var data = {key:  element.data.From,
                  name: element.From,}; 
                this_class.props.navigation.navigate('PrivateChat', { pname: data })
              }
            }); 
            console.log('recive message peyman : ', result);
            return;
          }
        });
      },
      popInitialNotification: true,
      requestPermissions: true,
    });

    echo = new Echo({
      broadcaster: 'socket.io',
      host: 'http://164.138.18.90:6001',
      client: io,
      auth: {
        headers: {
          'X-CSRF-TOKEN': server_connection.user_token,
        },
      },
    });
    echo
      .channel(
        'laravel_database_private-message.' + server_connection.user_token,
      )
      .listen('PostCreatedEvent', function(e) {
        console.log('notification  logs : ', e);
        if (
          e.post.From != '' ||
          e.post.From != null ||
          e.post.From != undefined
        ) {
          if (server_connection.last_message_id != e.post.data.id) {
            console.log(
              'server_connection.chat_By.trim()',
              server_connection.chat_By,
            );
            console.log('e.post.From.trim()', e.post.From);
            if (server_connection.chat_By == null) {
              if (server_connection.chat_By != e.post.From) {
                PushNotification.localNotification({
                  autoCancel: true,
                  bigText: e.post.data.Content,
                  subText: 'MEGABIZ APP',
                  title: e.post.From,
                  message: e.post.data.Content,
                  vibrate: true,
                  vibration: 300,
                  playSound: true,
                  soundName: 'default',
                  actions: '["Open"]',
                });
                AsyncStorage.getItem('user_message', (err, result) => {
                 // console.error(err); 
                  if (result != null) {
                    result = JSON.parse(result); 
                    result.push(e.post);
                    AsyncStorage.setItem('user_message', JSON.stringify(result));
                    console.log("append user message ");
                    return;
                  }
                  AsyncStorage.setItem('user_message', JSON.stringify([e.post]));
                  console.log("save user message ");
                });
              } else {
                console.log('show text1:', e.post.data.Content);
              }
            } else {
              server_connection.chat_data.push(e.post.data);
              console.log('show text:', server_connection.chat_data);
            }
            server_connection.last_message_id = e.post.data.id;
          }
        }
      });
  }

  render() {

    return (
      <LinearGradient colors={['#fff', '#fff']} style={styles.linearGradient}>
        <View style={Logincss.imgtotal}>
          <Image
            source={require('../../Images/logo.png')}
            resizeMode="stretch"
            style={Logincss.imgsignup}
          />
        </View>
        <Spinner color="white" />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
  },
});
