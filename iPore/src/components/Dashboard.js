import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { logoutUser } from '../actions';
import PipelineList from './PipelineList';
import { Card, CardSection, Button, FooterWithNativeBase } from './common';

class Dashboard extends Component {
  onButtonPress() {    
    this.props.logoutUser();
  }

  userInformation() {
    const { user } = this.props;

    if (user !== null) {
      return <Text>{user.loggedUser.email}</Text>;
    } 
    
    return <Text>User is logged off</Text>;
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
        <PipelineList />
        <Card>
          <Text>Logged User: </Text>
          {this.userInformation()}
          <CardSection>
            <Button onPress={this.onButtonPress.bind(this)}>
              Logout
            </Button>  
          </CardSection>
        </Card>
        <View>
          <FooterWithNativeBase 
            style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }} 
            parent={'dashboard'} 
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { user } = auth;

  return { user };
};

export default connect(mapStateToProps, { logoutUser })(Dashboard);
