import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions';
import { Button, Icon } from 'native-base';

class LogoutButton extends Component {
  onButtonPress() {    
    this.props.logoutUser();
  }

  render() {
    return (
      <Button 
        style={styles.buttonStyle}
        onPress={this.onButtonPress.bind(this)}
      >
        <Icon name="ios-log-out" style={{ color: '#2876cc' }} />
      </Button>
    );
  }
}

const styles = {
  buttonStyle: {
    paddingBottom: 8, 
    height: 35,
    backgroundColor: '#ffffff',
    borderColor: '#2876cc',
    borderWidth: 1,
    marginLeft: 2
  }
};

export default connect(null, { logoutUser })(LogoutButton);
