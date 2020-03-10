import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Container, Header, Content, Title, Thumbnail,Icon} from 'native-base';
import {TextField} from 'react-native-material-textfield';
import MainCss from '../Main/MainCss';
import Logincss from '../Login/Logincss';


export default class ForgetPass extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            EorNeror: '',
        };
    }

    user(usertext) {
        this.setState({
           user: usertext,
        });
    }


    forgetpass() {
        var user = this.state.user;
        this.setState({
            user: '',
        });
        if (user === '') {
            this.setState({
                EorNeror: 'Enter the email',
            });
        
        } else {
        }
    }


    render() {
        return (
            <Container>
             <Header style={MainCss.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon name="arrowleft" type="AntDesign" style={{ color: '#faa61a' }} />
                    </TouchableOpacity>
                    <Title>MEGABIZ</Title>
                    <Text></Text>

                </Header>
                <Content>
                    <View style={Logincss.imgtotal}>
                        <Image source={require('../../Images/logo.png')} resizeMode='stretch' style={Logincss.imgsignup}/>
                    </View>
                    <View style={Logincss.texttotal}>
                        <TextField
                            value={this.state.EorN}
                            onChangeText={(txt) => this.user(txt)}
                            error={this.state.EorNeror}
                            baseColor='#000'
                            label='Email'
                            inputContainerStyle={Logincss.textinput}/>
                    </View>
                    <TouchableOpacity style={Logincss.btn} onPress={() => this.forgetpass()}>
                            <Text style={{color: '#fff', fontSize: 18}}>Enter</Text>
                        </TouchableOpacity>
                </Content>
            </Container>
        );
    }
}





