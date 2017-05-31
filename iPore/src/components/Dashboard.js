import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import PipelineList from './PipelineList';
import { FooterWithNativeBase } from './common';

class Dashboard extends Component {
  userInformation() {
    const { user } = this.props;

    if (user !== null) {
      return <Text>{user.loggedUser.email}</Text>;
    } 
    
    return <Text>User is logged off</Text>;
  }

  render() {
    return (
      <View style={styles.viewStyles}>
        <PipelineList />
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

const styles = {
  viewStyles: {
    flex: 1, 
    flexDirection: 'column', 
    justifyContent: 'space-between'
  }
};

export default connect(mapStateToProps, {})(Dashboard);
