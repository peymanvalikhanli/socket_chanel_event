import React, {Component} from 'react';
import {View,Text,Image} from 'react-native';
import {Card,CardItem,Icon } from 'native-base';
import MainCss from '../MainCss';

export default class ChatListComponent extends Component{
    render(){
        return(
            <Card>
                <CardItem style={MainCss.chatlistcartitem}>
                    <View style={MainCss.chatlistitem1}>
                        <View style={{width:50,height:50,}}>
                            <Image source={this.props.image} resizeMode='stretch' style={{width:50,height:50}}/>
                        </View>
                        <Text style={{fontSize:18}}>{this.props.name}</Text>
                    </View>
                    <View style={MainCss.chatlistitem2}>
                        <Text style={{fontSize:15}}>{this.props.date}</Text>
                    </View>
                </CardItem>
            </Card>
        )
    }
}

