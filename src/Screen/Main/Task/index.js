import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import TaskList from './TaskList/TaskList';
import NewTask from './NewTask';

const stuck = createStackNavigator(
  {
    TaskList: {
      screen: TaskList,
    },
    NewTask: {
      screen: NewTask,
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
