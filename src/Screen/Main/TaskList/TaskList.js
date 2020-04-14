import React, { Component, version } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Alert, TouchableHighlight, BackHandler, TextInput, FlatList, Dimensions, Image } from "react-native";
import { Container, Header, Content, Toast, Button, Root, Icon, Title, DatePicker, Accordion } from 'native-base';
import MainCss from '../MainCss';
import ImagePicker from 'react-native-image-picker';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import Modal from 'react-native-modal';
import server_connection from '../../../../server_connection';
import TaskListComponent from "./TaskListComponent";
import Checklist from './CheckList';




const deviceHeight = (Dimensions.get("window").height)
const deviceWidth = (Dimensions.get("window").width)
const options = {
  videoQuality: 'medium',
  cameraType: 'back',
  tintColor: 'blue',
  mediaType: 'mixed',
};
const dataArray = [
  { title: "First Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
];
export default class TaskList extends Component {
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
      comentIcon:false
    }
    // this.state = { };
    // this.setDate = this.setDate.bind(this);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => this.handleBackButtonClick());
  };

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.handleBackButtonClick());
  };
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
  camer
  camera() {
    ImagePicker.launchCamera(options, response => {
      const camera = { uri: response.uri };
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        setTimeout(() => {
          this.setState({
            source: camera,
            ModalVisible: false,
            hideattachment: true
          })

        }, 10);
      }
      // var d = {
      //   key: 'v',
      //   camera: camera,
      //   user_id: 1,
      //   image: require('../../../Images/logo.png'),
      // };
      // this.setState(romm => {
      //   return {
      //     data: [...romm.data, d],
      //   };
      // });
      // console.warn(this.state.avatarSource);

      // }
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
  // call_back_contact_list(data, this_class) {
  //   console.log("contact list :", data);
  //   var contact_list_data = [];
  //   data.data.forEach(element => {
  //     contact_list_data.push({
  //       key: element.id,
  //       name: element.name,
  //       image: element.Avatar.includes("No Avatar") ? require('../../../Images/logo.png') : require('../../../Images/logo.png'),
  //       date: element.date
  //     });
  //   });
  //   this_class.setState({
  //     data: contact_list_data
  //   });
  // }


  _renderItem = ({ item }) => (
    < TaskListComponent
      style={{ backgroundColor: 'red' }}
      name={item.name}
      imgpro={item.image}
      date={item.date}
      d={item}

    />
  )
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  click() {
    let b = this.state.number
     b.push('1')
    this.setState({
      number:b
    })
  }


comment(){
  this.setState({
    comentIcon:!this.state.comentIcon
  })
}



  render() {

    return (
      <Container>
        <Header style={MainCss.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrowleft" type="AntDesign" style={{ color: '#987a3b' }} />
          </TouchableOpacity>
          <Title style={{ color: "#00000" }}>Task List</Title>
           
          
          {this.state.comentIcon ?
                    <TouchableOpacity>
                    <Icon name="check" type="AntDesign" style={{ color: '#987a3b' }} />
                  </TouchableOpacity>
                  :
                  <Text></Text>
          }
        </Header>
        <Content>
          <View style={{ backgroundColor: '#ccccc', borderColor: '#ccc', borderTopWidth: 2, borderBottomWidth: 2 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
              <Icon name="pencil-square-o" type="FontAwesome" style={{ paddingLeft: 10, fontSize: 25 }} />
              <TextInput placeholder="lable" placeholderTextColor={'black'} style={{ paddingLeft: 10, fontSize: 18, }} />
            </View>

            <TouchableOpacity style={{ flexDirection: 'row', height: 50, alignItems: 'center', }} onPress={() => this.toggleModal()}>
              <Icon name="user" type="Feather" style={{ paddingLeft: 10, fontSize: 25 }} />
              <Text style={{ paddingLeft: 10, fontSize: 18, }}> Members...</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
              <Icon name="home" style={{ paddingLeft: 10, fontSize: 25 }} />
              <DatePicker
                defaultDate={this.state.chosenDate}
                minimumDate={new Date(2018, 1, 1)}
                maximumDate={new Date(2030, 12, 31)}
                locale={"en"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Date"
                textStyle={{ color: "green", opacity: 0.1 }}
                placeHolderTextStyle={{ color: "black" }}
                onDateChange={this.setDate}
                disabled={false}
              />
              <Text>
                Date: {this.state.chosenDate.toString().substr(4, 12)}
              </Text>
            </View>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', height: 50 }} onPress={() => this.toggleModal2()}>
              <Icon
                name="attachment"
                type="Entypo"
                style={{ paddingLeft: 10, fontSize: 25 }}
              />
              <Text style={{ paddingLeft: 10, fontSize: 18, }}>Attachment</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', height: 50 }} onPress={() => this.click()}>
              <Icon
                name="attachment"
                type="Entypo"
                style={{ paddingLeft: 10, fontSize: 25 }}
              />
              <Text style={{ paddingLeft: 10, fontSize: 18, }}>Check List</Text>
            </TouchableOpacity>


          </View>

          {this.state.hideattachment &&
            <View style={{ backgroundColor: '#fffff', height: 200, borderColor: '#ccc', borderBottomWidth: 2 }}>
              <View style={{ marginTop: 10, flexDirection: 'row', borderColor: '#ccc', borderBottomWidth: 2, height: 50, alignItems: 'center', flexWrap: 'wrap' }}>
                <Icon
                  name="attachment"
                  type="Entypo"
                  style={{ paddingLeft: 10 }}
                />
                <Text style={{ paddingLeft: 10, fontSize: 20, }}>Attachment</Text>
              </View>

              <Image source={this.state.source} style={{ width: deviceWidth / 2, height: 200 }} resizeMode="stretch" />
            </View>
          }
          <View style={{ backgroundColor: 'lightblue', }}>
            <FlatList
               extraData={this.state}
              data={this.state.number}
              renderItem={({ item }) =>
                <Checklist item={item.name} />
              }
            />
          </View>

          <View style={{ marginTop: 10, justifyContent:'space-evenly',flexDirection: 'row',  alignItems: 'center',alignSelf:'center', }}>
            <TouchableOpacity style={{ marginTop: 15,paddingRight:10 }}>
              <Icon name="comment-o" type="FontAwesome" style={{ fontSize: 30, color: 'rgb(150,150,150)' }} />
            </TouchableOpacity>
            <TextInput multiline={true} placeholder="Add comment..." onChangeText={()=>this.comment()} placeholderTextColor={'black'} style={{ alignSelf: 'center', width: 300, paddingLeft: 10, fontSize: 18, }} underlineColorAndroid={'black'}  />

          </View>

          <Modal
            deviceHeight={deviceHeight}
            isVisible={this.state.isModalVisible}
            onBackdropPress={this.toggleModal}
            backdropOpacity={0.5}
            animationInTiming={30}>
            <View style={{ height: 300, backgroundColor: '#ffff', borderRadius: 5 }}>
              <FlatList
                data={this.state.data}
                renderItem={this._renderItem} />
              <TouchableOpacity style={{ alignSelf: 'flex-end', paddingRight: 10, marginBottom: 15 }}>
                <Text style={{ fontSize: 20, color: '#29487d', marginTop: 20 }}>Done</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <Modal
            deviceHeight={deviceHeight}
            isVisible={this.state.ModalVisible}
            onBackdropPress={this.toggleModal2}
            backdropOpacity={0.5}
            animationInTiming={30}>
            <View style={{ height: 300, backgroundColor: '#ffff', borderRadius: 5 }}>
              <Text style={{ fontSize: 25, color: 'black', paddingLeft: 30, marginTop: 20 }}>Attach from...</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.camera()}
                style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}
              >
                <Icon
                  name="camera"
                  type="Feather"
                  style={{ fontSize: 25, color: 'black', paddingLeft: 30 }}
                />
                <Text style={{ fontSize: 22, color: 'black', paddingLeft: 20 }}>Take photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}
                onPress={() => this.SingleFilePicker()}>
                <Icon
                  name="file-document-outline"
                  type="MaterialCommunityIcons"
                  style={{ fontSize: 25, color: 'black', paddingLeft: 30 }}
                />
                <Text style={{ fontSize: 22, color: 'black', paddingLeft: 20 }}>File</Text>

              </TouchableOpacity>


            </View>
          </Modal>
        </Content>


      </Container>


    );
  }
}