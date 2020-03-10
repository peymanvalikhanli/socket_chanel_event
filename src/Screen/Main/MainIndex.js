import React from 'react';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import ChatListIndex from './ChatList/ChatListIndex';
import TaskList from './TaskList/TaskList';
import CancelList from './CancelList/CancelList';
import TaskListDone from './TaskListDone/TaskListDone';
import Seting from './Seting/Seting';
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
        screen: TaskList,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Icon name="list-unordered" type="Octicons" size={30} style={{color: tintColor}}/>
            ),
        },
    },
    TaskListDone: {
        screen: TaskListDone,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Icon name="checklist" type="Octicons" size={30} style={{color: tintColor}}/>
            ),
        },
    },
    CancelList: {
        screen: CancelList,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Icon name="cancel" type="MaterialIcons" size={30} style={{color: tintColor}}/>
            ),
        },
    },
   Seting: {
        screen: Seting,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Icon name="cogs" type="FontAwesome" size={30} style={{color: tintColor}}/>
            ),
        },
    },



}, {
    tabBarOptions: {
        inactiveTintColor: '#000',
        showLabel: false,
        activeTintColor: 'red',
    },
});

export default createAppContainer(button);
