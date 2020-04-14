import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import ChatList from './ChatList';
import NewChat from './NewChat';
import NewGroupChat from './NewGroupChat';
import PrivateChatList from './PrivateChatList';
import PrivateChat from './PrivateChat';
const stuck = createStackNavigator(
  {
    ChatList: {
      screen: ChatList,
    },
    NewGroupChat: {
      screen: NewGroupChat,
    },
    NewChat: {
      screen: NewChat,
    },
    PrivateChat: {
      screen: PrivateChat,
    },
    PrivateChatList: {
      screen: PrivateChatList,
    },
  },
  {
    headerMode: 'none',
  },
);

stuck.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  console.log('(navigation.state', navigation.state);
  if (navigation.state.index >= 3) {
    tabBarVisible = false;
  }
  if (
    navigation.state.routes[navigation.state.routes.length - 1].routeName ==
    'PrivateChat'
  ) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

export default stuck;
