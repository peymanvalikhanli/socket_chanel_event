import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Platform,
  TextInput,
  BackHandler,
  Alert,
  NativeModules,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Icon,
  Title,
  Card,
  Footer,
  Input,
  Thumbnail,
} from 'native-base';
import MainCss from '../MainCss';
import GroupMemberComponent from './GroupMemberComponent';

import server_connection from '../../../../server_connection';

import lang from '../../../model/lang/en.json';

export default class NewGroupChat extends Component {
  constructor() {
    super();
    server_connection.contact_list(this.call_back_contact_list, this);
    this.state = {
      data: [],
      group_name: '',
      member_list: [],
    };
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () =>
      this.handleBackButtonClick(),
    );
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () =>
      this.handleBackButtonClick(),
    );
  }
  handleBackButtonClick() {
    this.props.navigation.goBack();
    return true;
  }
  call_back_contact_list(data, this_class) {
    console.log('contact list :', data);
    var contact_list_data = [];
    data.data.forEach(element => {
      contact_list_data.push({
        key: element.id,
        name: element.name,
        image: element.Avatar.includes('No Avatar')
          ? require('../../../Images/logo.png')
          : require('../../../Images/logo.png'),
        date: '',
      });
    });
    this_class.setState({
      data: contact_list_data,
    });
  }

  _renderItem = ({item}) => (
    <GroupMemberComponent
      name={item.name}
      imgpro={item.image}
      date={item.date}
      is_check={() => this.add_member(item.key)}
      is_not_check={() => this.remove_member(item.key)}
    />
  );

  group_name(txt) {
    this.setState({
      group_name: txt,
    });
  }

  add_member(id) {
    this.setState(state => {
      return {
        member_list: [...state.member_list, id],
      };
    });
  }

  remove_member(id) {
    const items = this.state.member_list;
    const filteredItems = items.filter(item => item !== id);
    this.setState({
      member_list: filteredItems,
    });
  }

  confirm() {
    const group_name = this.state.group_name;
    const member_list = this.state.member_list;

    if (group_name == '' || group_name == null) {
      Alert.alert(
        lang.validation_message,
        lang.enter_grup_name,
        [{text: lang.ok}],
        {cancelable: false},
      );
      return;
    }

    if (member_list.length <= 0) {
      Alert.alert(
        lang.validation_message,
        lang.select_member,
        [{text: lang.ok}],
        {cancelable: false},
      );
      return;
    }

    server_connection.create_group(
        group_name,
        member_list,
      this.call_back_create_group,
      this,
    );
  }

  call_back_create_group(responseJson, this_class) {

    var message = JSON.stringify(responseJson); 

    if (message.includes("Duplicate")){
        Alert.alert(
            lang.error_message,
            lang.duplicate_group,
            [{text: lang.ok}],
            {cancelable: false},
          );
          return;
    }

    alert(JSON.stringify(responseJson));
  }

  render() {
    return (
      <Container>
        <Header style={MainCss.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon
              name="arrowleft"
              type="AntDesign"
              style={{color: '#987a3b'}}
            />
          </TouchableOpacity>
          <Title>new Group Chat</Title>
          <TouchableOpacity onPress={() => this.confirm()}>
            <Icon
              name="check-circle"
              type="Feather"
              style={{color: '#987a3b'}}
            />
          </TouchableOpacity>
        </Header>

        <Icon
          name="users"
          type="Entypo"
          style={{
            alignSelf: 'center',
            color: 'rgb(150,150,150)',
            fontSize: 150,
          }}
        />
        <TextInput
          placeholder="Type group name"
          onChangeText={txt => this.group_name(txt)}
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            width: 200,
            alignSelf: 'center',
            height: 35,
            marginTop: 10,
          }}
        />

        <FlatList data={this.state.data} renderItem={this._renderItem} />
      </Container>
    );
  }
}
