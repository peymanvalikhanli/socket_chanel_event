import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { Container, Header, Content, Icon, Title, Card, } from 'native-base';
import MainCss from '../MainCss';
import PravateChatListComponent from './PrivateChatListComponent';

import server_connection from '../../../../server_connection';


export default class PrivateChatList extends Component {

    constructor() {
        super();
        server_connection.contact_list(this.call_back_contact_list, this);
        this.state = {
         data: []
        }; 
    }

    call_back_contact_list(data, this_class) {
        console.log("contact list :", data);
        var contact_list_data = [];
        data.data.forEach(element => {
            contact_list_data.push({
                key: element.id,
                name: element.name,
                image: element.Avatar.includes("No Avatar")? require('../../../Images/logo.png'): require('../../../Images/logo.png'),
                date: ''
            });
        });
        this_class.setState({
            data: contact_list_data
        }); 
    }


    _renderItem = ({ item }) => (
        < PravateChatListComponent
            name={item.name}
            imgpro={item.image}
            date={item.date}
            d={item}

        />
    )
    render() {
        return (
            <Container>
                <Header style={MainCss.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon name="arrowleft" type="AntDesign" style={{ color: '#faa61a' }} />
                    </TouchableOpacity>
                    <Title>private Chat List</Title>
                    <Text></Text>
                </Header>

                <FlatList
                    data={this.state.data}
                    renderItem={this._renderItem} />


            </Container>
        );
    }
}

