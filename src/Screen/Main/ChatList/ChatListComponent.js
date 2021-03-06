import React, {Component} from 'react';
import {View,Text,Image,TouchableOpacity} from 'react-native';
import {Card,CardItem,Icon } from 'native-base';
import MainCss from '../MainCss';
import { withNavigation } from 'react-navigation';
 class ChatListComponent extends Component{

    open_chat(){
        if(this.props.date == 'Group'){
            this.props.navigation.navigate('GroupChat', { pname: this.props.d })
        }else{
            this.props.navigation.navigate('PrivateChat', { pname: this.props.d })
        }
    }

    render(){
        return(
            <TouchableOpacity onPress={() => this.open_chat()} >
            <Card>
                <CardItem style={MainCss.chatlistcartitem}>
                    <View style={MainCss.chatlistitem1}>
                        <View>
                            <Image source={this.props.image} resizeMode='stretch' style={{width:50,height:50}}/>
                        </View>
                    </View>
                    <View>
                    <Text style={{fontSize:18,color:'#29487d',fontWeight:'bold'}}>{this.props.name}</Text>
                    </View>
                    <View style={MainCss.chatlistitem2}>
                        <Text style={{fontSize:15}}>{this.props.date}</Text>
                    </View>
                </CardItem>
            </Card>
            </TouchableOpacity>
        )
    }
}

export default withNavigation(ChatListComponent)