import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import LoginIndex from './src/Screen/Login/LoginIndex';



  let stuck = createStackNavigator({

   LoginIndex:{
        screen:LoginIndex
    },
},{
    headerMode:'none',
});


 export default createAppContainer(stuck);