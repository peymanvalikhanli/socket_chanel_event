import React, {Component} from 'react';
import {
  Item,
  Text,
  Input,
  ListItem,
  Body,
  Button,
  Left,
  Icon,
} from 'native-base';
import MainCss from '../../MainCss';
import {withNavigation} from 'react-navigation';

import lang from '../../../../model/lang/en.json';

class ChecklistAddItem extends Component {
  constructor() {
    super();
    this.state = {
      show_form: false,
    };
  }

  change_mode() {
    this.setState({
      show_form: !this.state.show_form,
    });
  }
  
  Add_onPress() {
    this.change_mode();
    if (this.props.onPress_add) {
      this.props.onPress_add("test");
    }
  }

  render() {
    if (this.state.show_form) {
      return (
        <ListItem>
          <Body>
            <Item regular>
              <Input placeholder={lang.AddItem} />
            </Item>
            <Item style={[MainCss.top_margin]}>
              <Button small success rounded
              onPress={()=>this.Add_onPress()}>
                <Text>{lang.Add}</Text>
              </Button>
              <Button
                small
                rounded
                style={[MainCss.icon_margin, {backgroundColor: '#fe5e51'}]}
                onPress={() => this.change_mode()}>
                <Icon name="trash" type="Entypo" />
              </Button>
            </Item>
          </Body>
        </ListItem>
      );
    } else {
      return (
        <ListItem>
          <Left>
            <Button small light rounded onPress={() => this.change_mode()}>
              <Text>{lang.AddItem}</Text>
            </Button>
          </Left>
        </ListItem>
      );
    }
  }
}

export default withNavigation(ChecklistAddItem);
