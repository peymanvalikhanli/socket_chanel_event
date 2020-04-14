import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Button, Text, Icon } from 'native-base';
import Txtcomponent from './TextInput';

export default class AddItem extends Component {
        constructor(){
            super()
            this.state={
                txt: '',
                data:[{id:'1',txt:'salam'}]
            }
        }
        textinput(txtchange) {
            this.setState({
                txt: txtchange
            });
        }
        clickinput() {
           var textchange = this.state.txt
           var x ={
               id:'1',
               txt:textchange
           }
            this.setState(text=>{
              return { data:[...text.data,x]}
            });
        }


    render() {

        return (

            <View style={{backgroundColor:'white'}}>

  
            <View>
                <FlatList
                data={this.state.data}
                renderItem={({item})=>
                   <Txtcomponent text={item.txt}/>
                 }
                />
            </View>

            <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <TextInput multiline={true} placeholder="Add item..." placeholderTextColor={'black'} value={this.state.txt}
                underlineColorAndroid={'#00000'} 
                    onChangeText={text => this.textinput(text)} style={{ alignSelf: 'center', width: 300, paddingLeft: 10, fontSize: 18, }} />
                <TouchableOpacity style={{ marginTop: 15 }} onPress={()=>this.clickinput()}>
                    <Icon name="checkcircleo" type="AntDesign" style={{ fontSize: 30, color: 'green' }} />
                </TouchableOpacity>
            </View>

            </View>

        )
    }
}

