import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, } from 'react-native';
import { Card, CardItem, Icon, Container, Item, Toast, } from 'native-base';
import MainCss from '../MainCss';
import { withNavigation } from 'react-navigation';

class TaskListComponent extends Component {
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
     
    
                <TouchableOpacity onPress={() => this.check()} >
                    <Card>
                        <CardItem style={MainCss.chatlistcartitem}>
                            <View style={MainCss.chatlistitem1}>
                            <Image source={this.props.imgpro} resizeMode='stretch' style={{ width: 50, height: 50 }} />
                            </View>
                            <View>
                            <Text style={{ fontSize: 18,color:'#29487d',fontWeight:"bold" }}>{this.props.name}</Text>
                            </View>
                            <View style={MainCss.chatlistitem2}>
                                <Text style={{ fontSize: 15 }}>{this.props.date}</Text>
                            </View>
                            {this.state.check && 
                                
                                <Icon name="checkcircleo" type="AntDesign" style={{color: 'green', }} />
                               
                            }
                        
                        </CardItem>
                    </Card>

                </TouchableOpacity>
               
        
        );
    }
}

export default withNavigation(TaskListComponent)