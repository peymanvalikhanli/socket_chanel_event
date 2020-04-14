import React, {Component} from 'react';
import { Container, Header, Content, Text, Left, Body, Right, Title, ListItem, Icon, Switch, Button } from "native-base";
import server_connection from '../../../../server_connection';

export default class Setting extends Component{
   

    constructor(){ 
        super();
    }
    render(){
      
        return(
            <Container>
            <Header>
          <Left/>
          <Body>
            <Title>Setting</Title>
          </Body>
          <Right />
        </Header>
            <Content padder>
            <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#FF9501" }}>
                <Icon active name="airplane" />
              </Button>
            </Left>
            <Body>
              <Text>Airplane Mode</Text>
            </Body>
            <Right>
              <Switch value={false} />
            </Right>
          </ListItem>
          <ListItem itemDivider>
              <Text></Text>
            </ListItem>  
          <ListItem icon onPress={()=>{server_connection.logout(this)}}>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }} >
                <Icon type="FontAwesome" name='sign-out' active  />
              </Button>
            </Left>
            <Body>
              <Text>Logout</Text>
            </Body>
            <Right>
              <Text></Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
            </Content>
          </Container>
        )
    }
}
