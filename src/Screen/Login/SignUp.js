import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity,BackHandler } from 'react-native';
import { Container, Header, Content, Title, Thumbnail, Icon,Spinner} from 'native-base';
import { TextField } from 'react-native-material-textfield';
import Logincss from '../Login/Logincss';
import MainCss from '../Main/MainCss';
import server_connection from '../../../server_connection';

import lang from '../../model/lang/en.json'; 

export default class SignIn extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            usereror: '',
            EorN: '',
            EorNeror: '',
            password: '',
            passeror: '',
            repetpass: '',
            repetpasseror: '',
            txt: '',
            eye:true,
            eye2:true,
            spiner:false
        };
    }
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
    
    username(usertext) {
        this.setState({
            username: usertext,
        });
    }

    email(emailtext) {
        this.setState({
            EorN: emailtext,
        });
    }

    pass(passtext) {
        this.setState({
            password: passtext,
        });
    }
    repetpass(repetpasstext) {
        this.setState({
            repetpass: repetpasstext,
        });
    }
    login() {
        var name = this.state.username;
        var email = this.state.EorN;
        var pass = this.state.password;
        var repetpass = this.state.repetpass;
        // var dub =  server_connection.register(name, email, pass);
        // var dublicate = dub.includes('dublicate')
        this.setState({
            EorNeror: '',
            passeror: '',
            usereror: '',
            repeteror: ''
        });
        if (name === '') {
            this.setState({
                usereror: lang.usereror,
            });
        } else if (email === '') {
            this.setState({
                EorNeror: 'Enter the First Name',
            });
        } else if (pass.length < 6) {
            this.setState({
                passeror: 'Enter the password',
            });
        } else if (pass !== repetpass) {
            this.setState({
                repeteror: 'The password is not the same',
            
            });
        } else {
            server_connection.register(name, email, pass, this.call_back_reg , this);
            this.setState({
                spiner: true
            })        }

    }
     
    call_back_reg(data , this_class) {
        switch (data.act) {
            case "message":
                var text = JSON.stringify(data.data.text);
                switch (true) {
                    case text.includes("Duplicate"):
                       // TODO: romel set duplicate error   
                       this.setState({
                        spiner: false
                    })
                       alert(lang.duplicate);
                        break;
                    default:
                        alert(text);
                }
                break;
            case "Register":
                this_class.setState({
                    n:this_class.props.navigation.navigate('ChatlistIndex')
                })
                break;
        }
    }


    eyepass(){
        this.setState({
            eye:!this.state.eye
        })
    }

    eyepass2(){
        this.setState({
            eye2:!this.state.eye2
        })
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
                        <Image source={require('../../Images/logo.png')} resizeMode='stretch' style={Logincss.imgsignup} />
                    </View>
                    <View style={Logincss.texttotal}>
                        <TextField
                            value={this.state.username}
                            onChangeText={(txt) => this.username(txt)}
                            error={this.state.usereror}
                            baseColor='#000'
                            label={lang.FirstName}
                            inputContainerStyle={Logincss.textinput} />
                        <TextField
                            value={this.state.EorN}
                            onChangeText={(txt) => this.email(txt)}
                            error={this.state.EorNeror}
                            baseColor='#000'
                            label='Email'
                            inputContainerStyle={Logincss.textinput} />
                            <View>
                            {this.state.spiner &&
                            <Spinner color="blue" style={{ position: 'absolute', alignSelf: 'center',top:-20}} />

                        }
                            <TextField
                            value={this.state.password}
                            onChangeText={(txt) => this.pass(txt)}
                            secureTextEntry={this.state.eye}
                            error={this.state.passeror}
                            baseColor='#000'
                            label='Password'
                            inputContainerStyle={Logincss.textinput} />
                                       <TouchableOpacity activeOpacity={0.5} onPress={()=>this.eyepass()} style={{position:'absolute',right:0,top:30}}>
                            <Icon name="md-eye" type="Ionicons"/>
                            </TouchableOpacity>
                            </View>
                  
                           <View>
                           <TextField
                            value={this.state.repetpass}
                            onChangeText={(txt) => this.repetpass(txt)}
                            secureTextEntry={this.state.eye2}
                            error={this.state.repeteror}
                            baseColor='#000'
                            label='Repet Password'
                            inputContainerStyle={Logincss.textinput} />
                                       <TouchableOpacity activeOpacity={0.5} onPress={()=>this.eyepass2()} style={{position:'absolute',right:0,top:30}}>
                            <Icon name="md-eye" type="Ionicons"/>
                            
                            </TouchableOpacity>
                           </View>
                 
                        <Text>{this.state.txt}</Text>
                        <TouchableOpacity style={Logincss.btn} onPress={() => this.login()}>
                            <Text style={{ color: '#fff', fontSize: 18 }}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </Content>
            </Container>
        );
    }
}





