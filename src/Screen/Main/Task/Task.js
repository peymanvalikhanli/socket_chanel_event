import React, {Component, version} from 'react';
import {TouchableOpacity, Alert, BackHandler, Dimensions} from 'react-native';
import {
  Container,
  Header,
  Footer,
  Content,
  Icon,
  Title,
  DatePicker,
  Picker,
  Accordion,
  List,
  ListItem,
  Item,
  Text,
  Left,
  Body,
  Right,
  Input,
  Button,
  Form,
  Label,
  CheckBox,
} from 'native-base';
import MainCss from '../MainCss';
import ImagePicker from 'react-native-image-picker';
import {DocumentPicker, DocumentPickerUtil} from 'react-native-document-picker';
import Modal from 'react-native-modal';
import server_connection from '../../../../server_connection';
import TaskListComponent from './TaskListComponent';
import ChecklistItem from './checklist_components/checklist_item_component';
import Checklist from './CheckList';

import lang from '../../../model/lang/en.json';
import checklist_item_component from './checklist_components/checklist_item_component';
import ChecklistAddItem from './checklist_components/add_item_component';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const options = {
  videoQuality: 'medium',
  cameraType: 'back',
  tintColor: 'blue',
  mediaType: 'mixed',
};
const dataArray = [
  {title: 'First Element', content: 'Lorem ipsum dolor sit amet'},
  {title: 'Second Element', content: 'Lorem ipsum dolor sit amet'},
  {title: 'Third Element', content: 'Lorem ipsum dolor sit amet'},
];
export default class Task extends Component {
  constructor() {
    super();
    server_connection.contact_list(this.call_back_contact_list, this);
    this.state = {
      isModalVisible: false,
      ModalVisible: false,
      onBackdropPress: false,
      data: [],
      source: '',
      hideattachment: false,
      number: [],
      chosenDate: new Date(),
      comentIcon: false,
      selected: 'key2',

      isModalVisible: false,
      isMemebersModalVisible: false,
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
  toggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      onBackdropPress: !this.state.onBackdropPress,
    });
  };
  toggleModal2 = () => {
    this.setState({
      ModalVisible: !this.state.ModalVisible,
      onBackdropPress: !this.state.onBackdropPress,
    });
  };
  camer;
  camera() {
    ImagePicker.launchCamera(options, response => {
      const camera = {uri: response.uri};
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        setTimeout(() => {
          this.setState({
            source: camera,
            ModalVisible: false,
            hideattachment: true,
          });
        }, 10);
      }
    });
  }
  SingleFilePicker() {
    try {
      DocumentPicker.show(
        {
          filetype: [DocumentPickerUtil.pdf()],
        },
        (eror, res) => {
          if (res === null) {
            this.setState({
              isModalVisible: !this.state.isModalVisible,
            });
          } else {
            var e = {
              key: 'm',
              document: res,
              user_id: 1,
              image: require('../../../Images/logo.png'),
            };
            this.setState(romm => {
              return {
                data: [...romm.data, e],
                isModalVisible: !this.state.isModalVisible,
              };
            });
            setTimeout(() => {
              this.refs.fla.scrollToEnd();
            }, 300);
          }
        },
      );
    } catch {
      console.warn('1');
    }
  }

  _renderItem = ({item}) => (
    <TaskListComponent
      style={{backgroundColor: 'red'}}
      name={item.name}
      imgpro={item.image}
      date={item.date}
      d={item}
    />
  );
  setDate(newDate) {
    this.setState({chosenDate: newDate});
  }

  click() {
    let b = this.state.number;
    b.push('1');
    this.setState({
      number: b,
    });
  }

  comment() {
    this.setState({
      comentIcon: !this.state.comentIcon,
    });
  }

  // label picker
  onValueChange(value) {
    this.setState({
      selected: value,
    });
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
          <Title style={{color: '#00000'}}>Task</Title>

          {this.state.comentIcon ? (
            <TouchableOpacity>
              <Icon name="check" type="AntDesign" style={{color: '#987a3b'}} />
            </TouchableOpacity>
          ) : (
            <Text />
          )}
        </Header>
        <Content>
          <List>
            <ListItem>
              <Item floatingLabel>
                <Label style={[MainCss.color_gray]}>{lang.tap_add_desc}</Label>
                <Input />
              </Item>
            </ListItem>
            <ListItem itemDivider />
            <ListItem>
              <Left>
                <Icon
                  style={[MainCss.color_gray]}
                  name="access-time"
                  type="MaterialIcons"
                />
                <DatePicker
                  defaultDate={this.state.chosenDate}
                  minimumDate={new Date(2018, 1, 1)}
                  maximumDate={new Date(2030, 12, 31)}
                  locale={'en'}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'default'}
                  placeHolderText={lang.due_date}
                  textStyle={[
                    MainCss.color_primary,
                    {marginTop: -10, marginBottom: -10},
                  ]}
                  placeHolderTextStyle={[
                    MainCss.color_gray,
                    {marginTop: -10, marginBottom: -10},
                  ]}
                  onDateChange={this.setDate}
                  disabled={false}
                />
              </Left>
              <Body />
              <Right />
            </ListItem>
            <ListItem
              onPress={() => {
                this.setState({isModalVisible: true});
              }}>
              <Left>
                <Icon
                  style={[MainCss.color_gray]}
                  name="ios-pricetag"
                  type="Ionicons"
                />
                <Text style={[MainCss.color_gray, MainCss.icon_margin]}>
                  {lang.Label}
                </Text>
              </Left>
              <Body />
              <Right />
            </ListItem>
            <ListItem
              onPress={() => {
                this.setState({isMemebersModalVisible: true});
              }}>
              <Left>
                <Icon
                  style={[MainCss.color_gray]}
                  name="user-o"
                  type="FontAwesome"
                />
                <Text style={[MainCss.color_gray, MainCss.icon_margin]}>
                  {lang.members}
                </Text>
              </Left>
              <Body />
              <Right />
            </ListItem>
            <ListItem>
              <Left>
                <Icon
                  style={[MainCss.color_gray]}
                  name="checkbox-marked-outline"
                  type="MaterialCommunityIcons"
                />
                <Text style={[MainCss.color_gray, MainCss.icon_margin]}>
                  {lang.chacklist}
                </Text>
              </Left>
              <Body />
              <Right />
            </ListItem>
            <ListItem itemDivider />
            <ListItem>
              <Left>
                <Icon
                  style={[MainCss.color_gray]}
                  name="attachment"
                  type="MaterialIcons"
                />
                <Text style={[MainCss.color_gray, MainCss.icon_margin]}>
                  {lang.add_attachments}
                </Text>
              </Left>
            </ListItem>
          </List>
          {/* check list */}
          <ListItem itemDivider />
          <List>
            
            <ListItem>
              <Left>
                <Icon
                  style={[MainCss.color_gray]}
                  name="checkbox-marked-outline"
                  type="MaterialCommunityIcons"
                />
                <Text style={[MainCss.color_gray, MainCss.icon_margin]}>
                  {lang.chacklist}
                </Text>
              </Left>
              <Right>
                <Icon style={[MainCss.color_red]} name="trash" type="Entypo" />
              </Right>
            </ListItem>

            <ChecklistItem edit_mode={false} text="test" />

            <ChecklistAddItem onPress_add={data => alert(data)} />
          </List>
          <List>
            <ListItem>
              <Left>
                <Icon
                  style={[MainCss.color_gray]}
                  name="checkbox-marked-outline"
                  type="MaterialCommunityIcons"
                />
                <Text style={[MainCss.color_gray, MainCss.icon_margin]}>
                  {lang.chacklist}
                </Text>
              </Left>
              <Right>
                <Icon style={[MainCss.color_red]} name="trash" type="Entypo" />
              </Right>
            </ListItem>

            <ChecklistItem edit_mode={false} text="test" />

            <ChecklistAddItem onPress_add={data => alert(data)} />
          </List>
          {/* modals page */}

          {/* label model */}
          <Modal isVisible={this.state.isModalVisible}>
            <Content style={{backgroundColor: '#ffffff'}}>
              <List>
                <ListItem>
                  <Left>
                    <Icon
                      style={[MainCss.color_gray]}
                      name="ios-pricetag"
                      type="Ionicons"
                    />
                    <Text style={[MainCss.color_gray, MainCss.icon_margin]}>
                      {lang.Label}
                    </Text>
                  </Left>
                  <Body />
                  <Right />
                </ListItem>
                <ListItem>
                  <Body style={{marginLeft: 10}}>
                    <Button
                      full
                      style={{backgroundColor: '#3b5998'}}
                      onPress={() => {
                        this.setState({isModalVisible: false});
                      }}>
                      <Text>{lang.Done}</Text>
                    </Button>
                  </Body>
                </ListItem>
                {/* <ListItem itemDivider /> */}
              </List>
              <List>
                <ListItem>
                  <CheckBox checked={false} />
                  <Body style={{marginLeft: 10}}>
                    <Button full style={{backgroundColor: '#f6db5f'}}>
                      <Text>Market</Text>
                    </Button>
                  </Body>
                </ListItem>
                <ListItem>
                  <CheckBox checked={false} />
                  <Body style={{marginLeft: 10}}>
                    <Button full style={{backgroundColor: '#ffb554'}}>
                      <Text />
                    </Button>
                  </Body>
                </ListItem>
                <ListItem>
                  <CheckBox checked={false} />
                  <Body style={{marginLeft: 10}}>
                    <Button full style={{backgroundColor: '#fe5e51'}}>
                      <Text />
                    </Button>
                  </Body>
                </ListItem>
                <ListItem>
                  <CheckBox checked={false} />
                  <Body style={{marginLeft: 10}}>
                    <Button full style={{backgroundColor: '#9e3d64'}}>
                      <Text />
                    </Button>
                  </Body>
                </ListItem>
                <ListItem>
                  <CheckBox checked={false} />
                  <Body style={{marginLeft: 10}}>
                    <Button full style={{backgroundColor: '#36abb5'}}>
                      <Text />
                    </Button>
                  </Body>
                </ListItem>
              </List>
            </Content>
          </Modal>

          {/* members model  */}
          <Modal isVisible={this.state.isMemebersModalVisible}>
            <Content style={{backgroundColor: '#ffffff'}}>
              <List>
                <ListItem>
                  <Left>
                    <Icon
                      style={[MainCss.color_gray]}
                      name="user-o"
                      type="FontAwesome"
                    />
                    <Text style={[MainCss.color_gray, MainCss.icon_margin]}>
                      {lang.members}
                    </Text>
                  </Left>
                  <Body />
                  <Right />
                </ListItem>
                <ListItem>
                  <Body style={{marginLeft: 10}}>
                    <Button
                      full
                      style={{backgroundColor: '#3b5998'}}
                      onPress={() => {
                        this.setState({isMemebersModalVisible: false});
                      }}>
                      <Text>{lang.Done}</Text>
                    </Button>
                  </Body>
                </ListItem>
              </List>
              <List />
            </Content>
          </Modal>
        </Content>
        <Footer style={MainCss.header}>
          <Item regular>
            <Input placeholder={lang.comment} />
            <Button
              transparent
              onPress={() => {
                alert('hi');
              }}>
              <Text>{lang.Save}</Text>
            </Button>
          </Item>
        </Footer>
      </Container>
    );
  }
}
