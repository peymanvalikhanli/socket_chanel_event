import React, {Component} from 'react';
import {
  ListItem,
  Item,
  Text,
  Input,
  Right,
  Left,
  Body,
  CheckBox,
  Button,
  Icon,
} from 'native-base';
import MainCss from '../../MainCss';
import {withNavigation} from 'react-navigation';

import lang from '../../../../model/lang/en.json';

class ChecklistItem extends Component {
  constructor() {
    super();
    this.state = {
      edit_mode: false,
      text: null,
      check: false,
    };
  }

  change_mode() {
    this.setState({
      edit_mode: !this.state.edit_mode,
    });
  }

  ChangeText(txt) {
    this.setState({
      text: txt,
    });
  }

  change_data_mode() {
    this.change_mode();
    if (this.props.onChangeText) {
      this.props.onChangeText(this.state.text);
    }
  }

  onDelete() {
    this.change_mode();
    if (this.props.onDelete) {
      this.props.onDelete();
    }
  }

  is_check() {
    this.setState({
      check: !this.state.check,
    });
    if (this.props.onChangeCheck) {
      this.props.onChangeCheck(this.state.check);
    }
  }

  render() {
    if (this.props.edit_mode) {
      this.setState({
        edit_mode: this.props.edit_mode,
      });
    }
    if (this.state.text == null && this.props.text) {
      this.setState({
        text: this.props.text,
      });
    }
    if (this.state.check == false && this.props.check) {
      this.setState({
        check: this.props.check,
      });
    }
    if (this.state.edit_mode) {
      return (
        <ListItem>
          <CheckBox
            checked={this.state.check}
            onPress={() => {
              this.is_check();
            }}
          />
          <Body>
            <Item regular>
              <Input
                placeholder={lang.AddItem}
                onBlur={() => this.change_data_mode()}
                value={this.state.text}
                onChangeText={txt => this.ChangeText(txt)}
                autoFocus={true}
              />
              <Button
                small
                transparent
                onPress={() => this.change_data_mode()}
                style={{marginTop: -10, marginBottom: -10, marginLeft: 10}}>
                <Icon
                  style={[MainCss.color_green]}
                  name="ios-checkmark"
                  type="Ionicons"
                />
              </Button>
            </Item>
          </Body>
          <Right>
            <Button
              small
              transparent
              onPress={() => this.onDelete()}
              style={{marginTop: -10, marginBottom: -10, marginLeft: 10}}>
              <Icon style={[MainCss.color_red]} name="trash" type="Entypo" />
            </Button>
          </Right>
        </ListItem>
      );
    } else {
      return (
        <ListItem>
          <CheckBox
            checked={this.state.check}
            onPress={() => {
              this.is_check();
            }}
          />
          <Body>
            <Text
              onPress={() => {
                this.change_mode();
              }}>
              {this.state.text}
            </Text>
          </Body>
        </ListItem>
      );
    }
  }
}

export default withNavigation(ChecklistItem);
