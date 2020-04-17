import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Platform,
  BackHandler,
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
import Modal from 'react-native-modal';
import MainCss from '../MainCss';
import SendPrivate from './SendPrivate';
import ReceivePrivate from './ReceivePrivate';
import ImagePicker from 'react-native-image-picker';
import {DocumentPicker, DocumentPickerUtil} from 'react-native-document-picker';
import server_connection from '../../../../server_connection';

let class_this = null;
let data;

const options = {
  videoQuality: 'medium',
  cameraType: 'back',
  tintColor: 'blue',
  mediaType: 'mixed',
};

export default class GroupChat extends Component {
  constructor() {
    super();
    this.state = {
      user_data: '',
      getData: null,
      isModalVisible: false,
      onBackdropPress: false,
      hide: false,
      hide2: true,
      hide3: true,
      disableinput: true,
      width: 200,
      txt: '',
      data: [],
      timer: '',
      index: 5,
    };

    class_this = this;
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
  call_back_chat_history(data, this_class) {
    var contact_list_data = [];
    if (data.data != undefined) {
      data.data.forEach(element => {
        contact_list_data.push({
          key: element.id,
          text: element.Content,
          image: '',
          date: element.created_at,
          user_id: element.From == this_class.state.user_data.key ? 2 : 1,
        });
      });
      this_class.setState({
        data: contact_list_data,
      });
    }
  }

  componentDidUpdate(prevProps) {}

  componentWillUnmount() {
    server_connection.chat_By = null;

    clearInterval(this.state.timer);
  }

  componentDidMount() {
    server_connection.chat_By = data.name.toString();
    let timer = setInterval(this.show_message, 1000);
    this.setState({timer: timer});
  }

  show_message() {
    let data = server_connection.chat_data;
    server_connection.chat_data = [];
    if (data.length > 0) {
      data.forEach(dd => {
        var t = {
          key: dd.id,
          text: dd.Content,
          image: '',
          date: dd.created_at,
          user_id: dd.From,
        };
        class_this.setState(rom => {
          return {
            data: [...rom.data, t],
            txt: '',
            disableinput: true,
            hide: false,
            hide2: true,
            hide3: true,
            width: 200,
          };
        });
      });

      //   setTimeout(() => {
      //    this.refs.fla.scrollToEnd();
      //   }, 300);
    }
  }

  textinput(txtchange) {
    this.setState({
      txt: txtchange,
    });
    if (txtchange.length > 0) {
      this.setState({
        disableinput: false,
        hide: true,
        hide2: false,
        hide3: false,
        width: 250,
      });
    } else {
      this.setState({
        disableinput: true,
        hide: false,
        hide2: true,
        hide3: true,
        width: 200,
      });
    }
  }
  camera() {
    ImagePicker.launchCamera(options, response => {
      const camera = {uri: response.uri};
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        var d = {
          key: 'v',
          camera: camera,
          user_id: 1,
          image: require('../../../Images/logo.png'),
        };
        this.setState(romm => {
          return {
            data: [...romm.data, d],
          };
        });
        console.warn(this.state.avatarSource);
        // setTimeout(() => {
        //   this.refs.fla.scrollToEnd();
        // }, 300);
      }
    });
  }
  galery() {
    ImagePicker.launchImageLibrary(options, response => {
      const galery = {uri: response.uri};
      var b = {
        key: 'm',
        galery: galery,
        user_id: 1,
        image: require('../../../Images/logo.png'),
      };

      this.setState(romm => {
        return {
          data: [...romm.data, b],
          isModalVisible: !this.state.isModalVisible,
        };
      });
      setTimeout(() => {
        this.refs.fla.scrollToEnd();
      }, 300);
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

  SingleAudioPicker() {
    try {
      DocumentPicker.show(
        {
          filetype: [DocumentPickerUtil.audio()],
        },
        (eror, res) => {
          if (res === null) {
            this.setState({
              isModalVisible: !this.state.isModalVisible,
            });
          } else {
            var f = {
              key: 'm',
              audio: res,
              user_id: 1,
              image: require('../../../Images/logo.png'),
            };

            this.setState(romm => {
              return {
                data: [...romm.data, f],
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

  clickinput() {
    var coment = this.state.txt;

    server_connection.send_message_group(
      this.state.user_data.key,
      coment,
      '',
      this.call_back_send_message,
      this,
    );
  }

  call_back_send_message(data, this_class) {
    console.log('send message: ', data);
    var t = {
      key: 'z',
      text: data.data.Content,
      image: '',
      date: data.data.created_at,
      user_id: 1,
    };
    this_class.setState(rom => {
      return {
        data: [...rom.data, t],
        txt: '',
        disableinput: true,
        hide: false,
        hide2: true,
        hide3: true,
        width: 200,
      };
    });
    setTimeout(() => {
      this_class.refs.fla.scrollToEnd();
    }, 300);
  }

  toggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      onBackdropPress: !this.state.onBackdropPress,
    });
  };
  renderItem = ({item}) => {
    if (item.user_id === 1) {
      return (
        <SendPrivate
          text={item.text}
          img={item.image}
          date={item.date}
          camera={item.camera}
          galery={item.galery}
          document={item.document}
        />
      );
    } else {
      return (
        <ReceivePrivate text={item.text} img={item.image} date={item.date} />
      );
    }
  };

  render() {
    data = this.props.navigation.state.params.pname;
    if (this.state.getData == null) {
      this.setState({user_data: data, getData: true});
      server_connection.GroupHistory(
        data.key,
        this.call_back_chat_history,
        this,
      );
    }
    return (
      <Container>
        <Header style={[MainCss.header, {backgroundColor: '#ebeef4'}]}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Icon
              name="arrowleft"
              type="AntDesign"
              style={{color: '#987a3b'}}
            />
          </TouchableOpacity>
          <Title style={{color: '#3B5998'}}>{data.name}</Title>
          <Text />
        </Header>

        <Image
          source={require('../../../Images/patern5.jpeg')}
          resizeMode="stretch"
          style={MainCss.backgroundImage}
        />
        <FlatList
          ref="fla"
          data={this.state.data}
          keyExtractor={(item, index) => item.key}
          renderItem={this.renderItem}
          onContentSizeChange={() => this.refs.fla.scrollToEnd()}
        />
        <View style={{flex: 1}}>
          <Modal
            isVisible={this.state.isModalVisible}
            onBackdropPress={this.toggleModal}
            backdropColor="white"
            style={{justifyContent: 'flex-end'}}
            backdropOpacity={0.1}
            animationInTiming={30}>
            <View style={MainCss.modalstyle}>
              <View style={MainCss.modalstyle2}>
                <View style={MainCss.modalstyle3}>
                  <View style={{alignItems: 'center', marginLeft: 10}}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={[MainCss.modaltouch, {backgroundColor: '#8c0073'}]}
                      onPress={() => this.SingleAudioPicker()}>
                      <Icon
                        name="headphones"
                        type="MaterialCommunityIcons"
                        style={{fontSize: 22, color: '#F5F5F5'}}
                      />
                    </TouchableOpacity>
                    <Text style={{color: '#696969'}}>audio</Text>
                  </View>
                  <View style={{alignItems: 'center', marginLeft: 10}}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={[MainCss.modaltouch, {backgroundColor: '#cf08f7'}]}
                      onPress={() => this.SingleFilePicker()}>
                      <Icon
                        name="file-document-outline"
                        type="MaterialCommunityIcons"
                        style={{fontSize: 22, color: '#F5F5F5'}}
                      />
                    </TouchableOpacity>
                    <Text style={{color: '#696969'}}>Document</Text>
                  </View>
                  <View style={{alignItems: 'center', marginLeft: 10}}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => this.galery()}
                      style={[
                        MainCss.modaltouch,
                        {backgroundColor: '#6e08c7'},
                      ]}>
                      <Icon
                        name="picture"
                        type="AntDesign"
                        style={{fontSize: 22, color: '#F5F5F5'}}
                      />
                    </TouchableOpacity>
                    <Text style={{color: '#696969'}}>Galery</Text>
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      marginLeft: 10,
                      marginTop: 10,
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => this.camera()}
                      style={[
                        MainCss.modaltouch,
                        {backgroundColor: '#a35c29'},
                      ]}>
                      <Icon
                        name="camera"
                        type="Feather"
                        style={{fontSize: 22, color: '#F5F5F5'}}
                      />
                    </TouchableOpacity>
                    <Text style={{color: '#696969'}}>Camera</Text>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <Footer style={MainCss.newchatprivateviewtotal}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => this.camera()}
            style={MainCss.footertouch}>
            <Icon name="camera" type="Feather" style={MainCss.footericon} />
          </TouchableOpacity>
          <View style={{height: 40, borderRadius: 15, width: this.state.width}}>
            <Input
              placeholder="Type a message"
              style={MainCss.inputfooter}
              value={this.state.txt}
              onChangeText={text => this.textinput(text)}
            />
          </View>
          {this.state.hide3 && (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={this.toggleModal}
              style={MainCss.footertouch}>
              <Icon
                name="attachment"
                type="Entypo"
                style={[MainCss.footericon, {fontSize: 21}]}
              />
            </TouchableOpacity>
          )}
          {this.state.hide2 && (
            <TouchableOpacity
              activeOpacity={0.5}
              style={[MainCss.footertouch, {backgroundColor: 'green'}]}>
              <Icon
                name="keyboard-voice"
                type="MaterialIcons"
                style={MainCss.footericon}
              />
            </TouchableOpacity>
          )}
          {this.state.hide && (
            <TouchableOpacity
              activeOpacity={0.5}
              disabled={this.state.disableinput}
              style={MainCss.footertouch}
              onPress={this.clickinput.bind(this)}>
              <Icon
                name="chevron-right"
                type="MaterialIcons"
                style={{fontSize: 40, color: '#3f51b5'}}
              />
            </TouchableOpacity>
          )}
        </Footer>
      </Container>
    );
  }
}
