import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Card, CardItem, Icon, Container, SwipeRow, Button, } from 'native-base';
import MainCss from '../MainCss';

export default class SendPrivate extends Component {

    constructor() {
        super()
        this.state = {
            forward: false,
            right: 0
        }
    }



    swipe() {
        if (this.state.right === 0) {
            this.setState({
                right: 50,
                forward: true
            })
        } else {
            this.setState({
                right: 0,
                forward: false
            })
        }


    }


    render() {

        return (

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', lex: 1 }}>

                {this.state.forward &&
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 60, marginLeft: 5 }}>
                        <TouchableOpacity>
                            <Icon name="forward" type="Entypo" style={{ color: 'green' }} />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Icon name="delete" type="MaterialIcons" style={{ color: 'red' }} />
                        </TouchableOpacity>
                    </View>

                }
                <TouchableOpacity onPress={() => this.swipe()}>
                    <View style={[MainCss.containersend, { marginRight: this.state.right }]}>
                        <View style={MainCss.fistusersend}>
                            {this.props.text ?
                                <View style={MainCss.text1send}>

                                    <Text style={{ marginTop: 5 }}>{this.props.text}</Text>
                                    <Text style={{ marginTop: 20, fontSize: 10 }}>{this.props.date}</Text>
                                </View> :

                                this.props.camera ?
                                    <View>
                                        <Image source={this.props.camera} style={{ width: 250, height: 250, }} />
                                        <Text style={{ marginTop: 20, fontSize: 10 }}>{this.props.date}</Text>
                                    </View>
                                    :
                                    this.props.galery ?
                                        <View>
                                            <Image source={this.props.galery} style={{ width: 250, height: 250, }} />
                                            <Text style={{ marginTop: 20, fontSize: 10 }}>{this.props.date}</Text>
                                        </View>
                                        :
                                        this.props.document ?
                                            <View>
                                                {this.props.document}
                                            </View>
                                            :
                                            <View>
                                                {this.props.audio}
                                            </View>
                            }


                        </View>

                    </View>
                </TouchableOpacity>



            </View>

        )
    }
}
