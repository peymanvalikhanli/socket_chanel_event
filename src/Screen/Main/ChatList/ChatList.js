import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, BackHandler } from 'react-native';
import { Container, Header, Content, Icon, Title, Card } from 'native-base';
import MainCss from '../MainCss';
import ChatListComponent from './ChatListComponent';


import server_connection from '../../../../server_connection';

export default class ChatList extends Component {

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', () => this.handleBackButtonClick());
    };

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', () => this.handleBackButtonClick());
    };
    handleBackButtonClick() {

        BackHandler.exitApp();
        return true;

    }


    constructor() {
        super();
        this.state = {
            data: [],
        };
        server_connection.group_list(this.call_back_group_list, this);

    }

    call_back_group_list(data, this_class) {
        console.log("group list  list :", data);
        var contact_list_data = this_class.state.data;
        if (data.data != undefined) {
            data.data.forEach(element => {
                contact_list_data.push({
                    key: "gr"+element.id,
                    name: element.name,
                    image: element.Avatar.includes("No Avatar") ? require('../../../Images/logo.png') : require('../../../Images/logo.png'),
                    date: element.date,
                });
            });
            this_class.setState({
                data: contact_list_data
            });
        }
        server_connection.Chat_list(this_class.call_back_chat_list, this_class);
    }

    call_back_chat_list(data, this_class) {
        console.log("chat list  list :", data);
        var contact_list_data = this_class.state.data;
        data.data.forEach(element => {
            contact_list_data.push({
                key: "ch"+element.id,
                name: element.name,
                image: element.Avatar.includes("No Avatar") ? require('../../../Images/logo.png') : require('../../../Images/logo.png'),
                date: element.date,
            });
        });
        this_class.setState({
            data: contact_list_data
        });
    }

    render() {
        return (
            <Container>
                <Header style={MainCss.header}>
                    <Text></Text>
                    <Title>Chat List</Title>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('NewChat')}>
                        <Icon name="plus" type="Entypo" style={{ color: "#faa61a" }} />
                    </TouchableOpacity>
                </Header>
                <Content style={{ backgroundColor: '#cccc' }}>
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) => <ChatListComponent
                            name={item.name}
                            image={item.image}
                            date={item.date}
                        />}
                    />
                </Content>
            </Container>
        );
    }
}

