import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Card, CardItem, Icon, CheckBox} from 'native-base';
import MainCss from '../MainCss';

export default class GroupMemberComponent extends Component {
  constructor() {
    super();
    this.state = {
      check: false,
    };
  }

  check() {
    this.setState({
      check: !this.state.check,
    });
    // this.props.is_check = this.state.check;
    if (!this.state.check) {
      this.props.is_check();
    }else{
        this.props.is_not_check();
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.check()}>
        <Card>
          <CardItem>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                flex: 1,
              }}>
              <Image
                source={this.props.imgpro}
                resizeMode="stretch"
                style={{width: 50, height: 50}}
              />

              <Text
                style={{fontSize: 16, color: '#29487d', fontWeight: 'bold'}}>
                {this.props.name}
              </Text>
              {this.state.check && (
                <View style={MainCss.chatlistitem2}>
                  <Icon
                    name="checkcircleo"
                    type="AntDesign"
                    style={{color: 'green'}}
                  />
                </View>
              )}
            </View>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}
