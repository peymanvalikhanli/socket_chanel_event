import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Button, Text, Icon } from 'native-base';
import AddItem from './AddItem'

export default class CheckList extends Component {
    constructor() {
        super()
        this.state = {
            color: 'lightblue',
            additem: [],
            hide:false,
           
        }
    }

    click() {
        let d = this.state.additem
        d.push('1')
        this.setState({
            additem: d,
            hide:true
        })
    
    }

    render() {

        return (
            <View>
                <View style={{ marginTop: 10, backgroundColor: '#ffff', height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ paddingLeft: 20, flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="check-square" type="Feather" style={{ fontSize: 28 }} />
                        <TextInput placeholder="Check List" placeholderTextColor={'#404040'} style={{ width: 250, paddingLeft: 10, fontSize: 25, }} underlineColorAndroid={this.state.color} onChangeText={() => this.click()} />
                    </View>


         
                    <TouchableOpacity style={{ paddingRight: 20 }}  onPress={()=>this.click()}>
                        <Icon name="ios-add-circle-outline" type="Ionicons" style={{ fontSize: 25, color: '#00000' }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingRight: 20 }}>
                        <Icon name="delete" type="AntDesign" style={{ fontSize: 25, color: 'red' }} />
                    </TouchableOpacity>
                </View>

                    
                   {this.state.hide&&
                <FlatList
                        extraData={this.state}
                        data={this.state.additem}
                        renderItem={({ item }) => <AddItem />}
                    />


                   }




            </View>
        )
    }
}

