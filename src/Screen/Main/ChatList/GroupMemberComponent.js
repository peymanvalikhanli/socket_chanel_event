import React, { Component } from 'react';
import { View, Text, Image,TouchableOpacity } from 'react-native';
import { Card, CardItem, Icon, CheckBox } from 'native-base';
import MainCss from '../MainCss';

export default class GroupMemberComponent extends Component {

    constructor() {
        super()
        this.state = {
            check: false
        }
    }

    check(){
        this.setState({
            check:!this.state.check
        })
    }
    
    render() {
        return (
            <TouchableOpacity onPress={()=>this.check()}>
            <Card>
                <CardItem style={MainCss.chatlistcartitem}>
                    <View style={MainCss.chatlistitem1}>
                        <View style={{ width: 50, height: 50, }}>
                            <Image source={this.props.imgpro} resizeMode='stretch' style={{ width: 50, height: 50 }} />
                        </View>
                        <Text style={{ fontSize: 15 }}>{this.props.name}</Text>
                        {this.state.check &&
                          <View style={MainCss.chatlistitem2}>
                          <Icon name="checkcircleo" type="AntDesign" style={{color: 'green', }} />
                      </View>
                      }
                    </View>
                 
                </CardItem>
            </Card>
            </TouchableOpacity>
        )
    }
}

