import React, {Component} from 'react';
import {View, Text, TouchableOpacity,BackHandler} from 'react-native';
import {Icon, Container, Content, Header, Title} from 'native-base';
import MainCss from '../MainCss';


export default class NewChat extends Component {
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', () => this.handleBackButtonClick());
    };

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', () => this.handleBackButtonClick());
    };
    handleBackButtonClick() {

        this.props.navigation.goBack();
        return true;
    }
    render() {
        return (
            <Container>
                <Header style={MainCss.header}>
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                        <Icon name="arrowleft" type="AntDesign" style={{color: '#987a3b'}}/>
                    </TouchableOpacity>
                    <Title style={{color:'#00000'}}>Create New Chat</Title>
                    <Text></Text>
                </Header>
                    <View style={MainCss.totalnewchat}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('PrivateChatList')}>
                            <Icon name="user" type="Entypo"  style={{color: 'rgb(150,150,150)',fontSize:150,marginBottom:80}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('NewGroupChat')}>
                            <Icon name="users" type="Entypo" style={{color: 'rgb(150,150,150)',fontSize:150,marginBottom:60}}/>
                        </TouchableOpacity>
                    </View>
            </Container>
        );
    }
}


