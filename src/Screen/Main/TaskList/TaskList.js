import React, { Component } from "react";
import { Text, View,TouchableOpacity,StyleSheet,Alert,TouchableHighlight} from "react-native";
import { Container, Header, Content, Toast, Button,Root } from 'native-base';





export default class TaskList extends Component {
   

  constructor(props) {
    super(props);
    this.state = {
      showToast: false
    };
  }
  render() {

    return (
       <Root>

        <Button onPress={()=> Toast.show({
            text: 'Wrong password!',
            buttonText: 'Okay'
          })}>
          <Text>Toast</Text>
        </Button>
    
    </Root>

    );
  }
}