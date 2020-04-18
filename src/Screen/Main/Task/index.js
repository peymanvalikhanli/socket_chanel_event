import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import TaskList from './TaskList';
import NewTask from './NewTask';
import Task from './Task';

const stuck = createStackNavigator(
  {
    TaskList: {
      screen: TaskList,
    },
    NewTask: {
      screen: NewTask,
    },
    Task: {
      screen: Task,
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
    'Task'
  ) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

export default stuck;
