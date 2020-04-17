import React, {Component, version} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TouchableHighlight,
  BackHandler,
  TextInput,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Toast,
  Button,
  Root,
  Icon,
  Title,
  DatePicker,
  Accordion,
  Body,
  Left,
  Right,
} from 'native-base';
import MainCss from '../MainCss';
import ImagePicker from 'react-native-image-picker';
import {DocumentPicker, DocumentPickerUtil} from 'react-native-document-picker';
import Modal from 'react-native-modal';
import server_connection from '../../../../server_connection';

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

  render() {
    return (
      <Container>
        <Header style={MainCss.header}>
          <Text />
          <Title style={{color: '#00000'}}>New Task</Title>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('NewChat')}>
            <Icon name="plus" type="Entypo" style={{color: '#987a3b'}} />
          </TouchableOpacity>
        </Header>
        <Content>
          <View>
            <FlatList
              data={this.state.romel}
              renderItem={({item}) => <Test item={item.name} />}
            />
          </View>
        </Content>
      </Container>
    );
  }
}
