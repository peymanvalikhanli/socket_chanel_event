import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, TextInput, } from 'react-native';
import { Button, Text, Icon, CheckBox } from 'native-base';


export default class Txtcomponent extends Component {

    constructor(props) {
        super(props)
          this.state={
              check:false,
              textdevoretion:''
          }
    }

check(){
    var textdecor = this.state.textdevoretion
    if(!textdecor){
        this.setState({
            textdevoretion:'line-through',
            check:true,

        })
    }else{
        this.setState({
            textdevoretion:'',
            check:false,
    
        })
    }

}

    render() {

        return (


            <View style={{ backgroundColor: '#fffff',flexDirection:'row',alignItems:'center',marginTop:10 }}>
                <CheckBox checked={this.state.check} onPress={()=>this.check()} style={{marginLeft:30}} color={'green'}/>
                <Text style={{paddingLeft:30,fontSize:18,textDecorationLine:this.state.textdevoretion}}>{this.props.text}</Text>
            </View>



        )
    }
}

