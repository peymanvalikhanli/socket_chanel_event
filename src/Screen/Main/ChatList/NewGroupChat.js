import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, Platform, TextInput } from 'react-native';
import { Container, Header, Content, Icon, Title, Card, Footer, Input, Thumbnail } from 'native-base';
import MainCss from '../MainCss';
import GroupMemberComponent from './GroupMemberComponent'

import server_connection from '../../../../server_connection';

export default class NewGroupChat extends Component {


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
                name: element.email,
                image: element.Avatar.includes("No Avatar")? require('../../../Images/logo.png'): require('../../../Images/logo.png'),
                date: ''
            });
        });
        this_class.setState({
            data: contact_list_data
        }); 
    }

    _renderItem = ({ item }) => (
        < GroupMemberComponent
            name={item.name}
            imgpro={item.image}
            date={item.date}


        />)
    render() {
        return (
            <Container>
                <Header style={MainCss.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon name="arrowleft" type="AntDesign" style={{ color: '#faa61a' }} />
                    </TouchableOpacity>
                    <Title>new Group Chat</Title>
                    <TouchableOpacity>
                        <Icon name="check-circle" type="Feather" style={{ color: '#faa61a' }} />
                    </TouchableOpacity>
                </Header>

                <Icon name="users" type="Entypo" style={{ alignSelf: 'center', color: 'rgb(150,150,150)', fontSize: 150, }} />
                <TextInput placeholder="Type group name" style={{ borderBottomColor: 'black', borderBottomWidth: 1, width: 200, alignSelf: 'center', height: 35, marginTop: 10 }} />

                <FlatList
                    data={this.state.data}
                    renderItem={this._renderItem} />

            </Container>
        )
    }
}