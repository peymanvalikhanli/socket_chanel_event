import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Container, Header, Content, Spinner, Text } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Logincss from './Logincss';

import server_connection from '../../../server_connection';


export default class splash extends Component {

  constructor(){
    super();
    // server_connection.check_login(this);   
  }


  render() {
    setTimeout(()=>{
      this.props.navigation.navigate('SignIn')
    //  server_connection.logout(); 
    // server_connection.check_login(this); 
  }
    ,2000);

    return (

      <LinearGradient colors={['#0000ff', '#fff', '#0000ff']} style={styles.linearGradient}>
        <View style={Logincss.imgtotal}>
          <Image source={require('../../Images/logo.png')} resizeMode='stretch' style={Logincss.imgsignup} />
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
  text: {
    fontFamily: 'A Sogand',
    fontSize: 40,
    textAlign: 'center',
    color: 'white'
  }

})