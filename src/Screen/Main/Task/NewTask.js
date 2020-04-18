import React, {Component, version} from 'react';
import {TouchableOpacity, Dimensions} from 'react-native';
import {
  Container,
  Header,
  Content,
  Title,
  Body,
  Left,
  Right,
  Form,
  Item,
  Label,
  Input,
  Button,
  Text,
} from 'native-base';
import MainCss from '../MainCss';
import ImagePicker from 'react-native-image-picker';
import {DocumentPicker, DocumentPickerUtil} from 'react-native-document-picker';
import Modal from 'react-native-modal';
import server_connection from '../../../../server_connection';

import lang from '../../../model/lang/en.json';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const options = {
  videoQuality: 'medium',
  cameraType: 'back',
  tintColor: 'blue',
  mediaType: 'mixed',
};
export default class NewTask extends Component {
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
    };
    this.state = {chosenDate: new Date()};
  }

  createTask() {
    this.props.navigation.navigate('Task');
  }

  render() {
    return (
      <Container>
        <Header style={MainCss.header}>
          <Text />
          <Title style={{color: '#00000'}}>{lang.NewTask}</Title>
          <TouchableOpacity />
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>{lang.TaskName}</Label>
              <Input />
            </Item>
          </Form>
          <Body style={{marginTop: 15}}>
            <Button rounded success onPress={() => this.createTask()}>
              <Text>{lang.create}</Text>
            </Button>
          </Body>
        </Content>
      </Container>
    );
  }
}
