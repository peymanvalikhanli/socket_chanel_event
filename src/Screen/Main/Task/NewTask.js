import React, {Component, version} from 'react';
import {TouchableOpacity, Dimensions, Alert} from 'react-native';
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
import server_connection from '../../../../server_connection';

import lang from '../../../model/lang/en.json';

export default class NewTask extends Component {
  constructor() {
    super();
    server_connection.contact_list(this.call_back_contact_list, this);
    this.state = {
      isModalVisible: false,
      ModalVisible: false,
      onBackdropPress: false,
      TaskName: '',
    };
  }

  createTask() {
    var TaskName =  this.state.TaskName; 
    if (TaskName == '' || TaskName == null) {
      Alert.alert(lang.error_message, lang.EnterNameTask, [{text: lang.ok}], {
        cancelable: false,
      });
      return;
    }
    server_connection.create_task(
      TaskName,
      this.call_back_create_task,
      this,
    );
  }

  call_back_create_task(responseJson, this_class) {
    var data = JSON.stringify(responseJson); 
    if(data.includes("id")){
    this_class.props.navigation.replace('Task',{task: responseJson});
    }else{
      Alert.alert(lang.error_message, lang.TryAgain, [{text: lang.ok}], {
        cancelable: false,
      });
      return;
    }
  }

  ChangeText(txt) {
    this.setState({
      TaskName: txt,
    });
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
              <Input onChangeText={txt => this.ChangeText(txt)} />
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
