import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import ChatList from './ChatList';
import NewChat from './NewChat';
import NewGroupChat from './NewGroupChat';
import PrivateChatList from './PrivateChatList';
import NewChatPrivate from './NewChatPrivate';
const stuck = createStackNavigator({

    ChatList:{
        screen:ChatList
    },
    NewGroupChat:{
        screen:NewGroupChat
    },
    NewChat:{
        screen:NewChat
    },
    NewChatPrivate:{
        screen:NewChatPrivate,
        
    },
    PrivateChatList:{
        screen:PrivateChatList
    },
    NewChatPrivate:{
        screen:NewChatPrivate,
        
    },
},{
    headerMode:'none',

});

stuck.navigationOptions=({navigation})=>{
    let tabBarVisible = true;
    if(navigation.state.index >= 3){
        tabBarVisible=false
    }
    return{
      tabBarVisible
    }
  }

export default stuck;
