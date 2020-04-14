import React, { Component, version } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Alert, TouchableHighlight, BackHandler, TextInput, FlatList, Dimensions, Image } from "react-native";
import { Container, Header, Content, Toast, Button, Root, Icon, Title, DatePicker, Accordion } from 'native-base';
import MainCss from '../MainCss';
import ImagePicker from 'react-native-image-picker';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import Modal from 'react-native-modal';
import server_connection from '../../../../server_connection';



const deviceHeight = (Dimensions.get("window").height)
const deviceWidth = (Dimensions.get("window").width)
const options = {
  videoQuality: 'medium',
  cameraType: 'back',
  tintColor: 'blue',
  mediaType: 'mixed',
};
export default class TaskListDone extends Component {
    constructor() {
        super();
        server_connection.contact_list(this.call_back_contact_list, this);
        this.state = {
          isModalVisible: false,
          ModalVisible: false,
          onBackdropPress: false,
          data: [],
          source: '',
          hideattachment: true,
          romel: []
        }
        this.state = { chosenDate: new Date() };
        // this.setDate = this.setDate.bind(this);
      }

    click() {
        this.setState({
            romel: this.state.romel + 1
        })
    }





    render() {

        return (
            <Container>
                <Content>
                <View>
                    <FlatList
                        data={this.state.romel}
                        renderItem={({ item }) =>
                            <Test item={item.name} />
                        }


                    />
                    <Button onPress={() => this.click()}>
                        <Text>click</Text>
                    </Button>
                </View>
                </Content>

            </Container>

        )
    }
}

