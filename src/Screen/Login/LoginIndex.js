import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import SignIn from './SignIn';
import SignUp from './SignUp';
import MainIndex from '../Main/MainIndex';
import Splash from './Splash';
import ForgetPass from './ForgetPass';

export default class LoginIndex extends Component {
    render() {
        return (
            <Appcantainer/>
        );
    }
}


const stuck = createStackNavigator({
    Splash:{
        screen:Splash
    },
    SignIn:{
        screen:SignIn
    },
    SingUp:{
        screen:SignUp
    },
   ForgetPass:{
        screen:ForgetPass
    },
    MainIndex:{
        screen:MainIndex
    },
},{
    headerMode:'none',
});


const Appcantainer = createAppContainer(stuck);
