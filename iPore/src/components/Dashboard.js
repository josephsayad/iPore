import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { logoutUser } from '../actions';
import { Card, CardSection, Button } from './common';

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
      <Card>
        <Text>Logged User: </Text>
        {this.userInformation()}
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Logout
          </Button>  
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { user } = auth;

  return { user };
};


export default connect(mapStateToProps, { logoutUser })(Dashboard);
