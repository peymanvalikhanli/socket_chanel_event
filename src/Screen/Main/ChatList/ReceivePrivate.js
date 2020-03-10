import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Container, Header, Content, Icon, Title, Card, Thumbnail } from 'native-base';
import MainCss from '../MainCss';

export default class ReceivePrivate extends Component {



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

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>

                <TouchableOpacity onPress={() => this.swipe()}  style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                    <View style={{marginTop:10}}>
                        <View>
                            {/* <Thumbnail source={this.props.img} resizeMode='stretch'/> */}
                            <View style={MainCss.text1receve}>
                                <Text style={{ marginTop: 5 }}>{this.props.text}</Text>
                                <Text style={{ marginTop: 20, fontSize: 10 }}>{this.props.date}</Text>
                            </View>
                        </View>
                    </View>

                    {this.state.forward &&
                <View style={{ flexDirection: 'row', justifyContent: 'space-between',  }}>
                    <TouchableOpacity>
                        <Icon name="forward" type="Entypo" style={{ color: 'green' }} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Icon name="delete" type="MaterialIcons" style={{ color: 'red' }} />
                    </TouchableOpacity>
                </View>

            }
                </TouchableOpacity>
         
                </View>
        )
    }
}

