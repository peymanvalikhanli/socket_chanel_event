import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, BackHandler, } from 'react-native';
import { Container, Header, Content, Title, Thumbnail, Icon, Spinner } from 'native-base';
import { TextField } from 'react-native-material-textfield';
import Logincss from './Logincss';
import server_connection from '../../../server_connection';

import lang from '../../model/lang/en.json';

export default class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            EorNeror: '',
            pass: '',
            passeror: '',
            eye: true,
            spiner: false
        };
    }

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

    user(usertext) {
        this.setState({
            user: usertext,
        });
    }

    pass(passtext) {
        this.setState({
            pass: passtext,
        });
    }

    login() {
        var user = this.state.user;
        var pass = this.state.pass;
        this.setState({
            EorNeror: '',
            passeror: ''
        })
        if (user === '') {
            this.setState({
                EorNeror: 'Enter the email',
                user: ''
            });
        } else if (pass.length < 6) {
            this.setState({
                passeror: 'Enter the password',
                pass: ''
            });
        } else {

            server_connection.login(user, pass, this.call_back_login, this);
            this.setState({
                spiner: true
            })

        }
    }

    call_back_login(data, this_class) {
        switch (data.act) {
            case "message":
                var text = JSON.stringify(data.data.text);
                switch (true) {
                    case text.includes("invalid Username"):
                           // TODO: romel set duplicate error   
                        alert(lang.invalidUsername);
                        return ( )=>{this.setState({
                            spiner:false
                        })}
                    case text.includes("invalid Password"):
                        // TODO: romel set duplicate error   
               
                        alert(lang.invalidPassword);
                    default:
                        alert("ok");
                }
                break;
            case "Login":
                this_class.setState({
                    n: this_class.props.navigation.navigate('ChatlistIndex')
                })
                break;
        }

    }

    eyepass() {
        this.setState({
            eye: !this.state.eye
        })
    }

    render() {
        return (
            <Container>
                <Header style={Logincss.header}>
                    <Text></Text>
                    <Title style={{ fontSize: 25, color: '#faa61a' }}>MEGABIZ</Title>
                    <Text></Text>
                </Header>
                <Content>
                    <View style={Logincss.imgtotal}>
                        <Image source={require('../../Images/logo.png')} resizeMode='stretch' style={Logincss.imgsignup} />
                    </View>
                    <View style={Logincss.texttotal}>
                        <TextField
                            value={this.state.user}
                            onChangeText={(txt) => this.user(txt)}
                            error={this.state.EorNeror}
                            baseColor='#000'
                            label='Email'
                            inputContainerStyle={Logincss.textinput} />
                        <View>
                            <TextField
                                value={this.state.pass}
                                onChangeText={(txt) => this.pass(txt)}
                                secureTextEntry={this.state.eye}
                                error={this.state.passeror}
                                baseColor='#000'
                                label='Password'
                                inputContainerStyle={Logincss.textinput} />
                            <TouchableOpacity activeOpacity={0.5} onPress={() => this.eyepass()} style={{ position: 'absolute', right: 0, top: 30 }}>
                                <Icon name="md-eye" type="Ionicons" />
                            </TouchableOpacity>
                        </View>
                        {this.state.spiner &&
                            <Spinner color="blue" style={{ position: 'absolute', alignSelf: 'center' }} />

                        }
                        <TouchableOpacity style={Logincss.btn} onPress={() => this.login()}>
                            <Text style={{ color: '#fff', fontSize: 18 }}>{lang.btn_login}</Text>
                        </TouchableOpacity>
                        <View style={Logincss.total}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('SingUp')}>
                                <Text style={Logincss.forgerpass}>{lang.btn_register}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgetPass')}>
                                <Text style={Logincss.register}>{lang.btn_forget_password}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}





