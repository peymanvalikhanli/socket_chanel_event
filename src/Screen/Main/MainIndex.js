import React from 'react';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import ChatListIndex from './ChatList/ChatListIndex';
import TaskListIndex from "./Task/index"; 

import Setting from './Setting/Setting';
import {Container, Header, Content, Icon} from 'native-base';


var button = createBottomTabNavigator({

    ChatlistIndex: {
        screen: ChatListIndex,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Icon name="wechat" type="FontAwesome" size={30} style={{color: tintColor}}/>
            ),
        },
    },
    
    TaskList: {
        screen: TaskListIndex,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Icon name="list-unordered" type="Octicons" size={30} style={{color: tintColor}}/>
            ),
        },
    },
    TaskListDone: {
        screen: TaskListIndex,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Icon name="checklist" type="Octicons" size={30} style={{color: tintColor}}/>
            ),
        },
    },
    CancelList: {
        screen: TaskListIndex,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Icon name="cancel" type="MaterialIcons" size={30} style={{color: tintColor}}/>
            ),
        },
    },
   Setting: {
        screen: Setting,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Icon name="cogs" type="FontAwesome" size={30} style={{color: tintColor}}/>
            ),
        },
    },



}, {
    tabBarOptions: {
        inactiveTintColor: '#c5cde2',
        showLabel: false,
        activeTintColor: '#9a3b59',
    },
});

export default createAppContainer(button);
