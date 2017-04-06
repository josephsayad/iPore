import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { clearRegisterForm, newEmailChanged, newPasswordChanged, registerUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class RegisterForm extends Component {
  componentWillMount() {
    this.props.clearRegisterForm();
  }

  onEmailChange(text) {
    this.props.newEmailChanged(text);
  }

  onPasswordChange(text) {
    this.props.newPasswordChanged(text);
  }
  
  onButtonPress() {    
    const { newEmail, newPassword } = this.props;
    this.props.registerUser({ newEmail, newPassword });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Register
      </Button>
    );
  }


  render() {
    return (
      <Card>
        <CardSection>
          <Input 
            label="Email"
            placeholder="signup@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.newEmail}
          />
        </CardSection>

        <CardSection>
          <Input 
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.newPassword}
          />   	
        </CardSection>

        <Text style={styles.errorTextStyle}>{this.props.error}</Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>        
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: '#ff0000'
  }
};

const mapStateToProps = ({ register }) => {
  const { newEmail, newPassword, error, loading } = register;
  
  return { 
    newEmail, 
    newPassword,
    error,
    loading
  };
};

export default connect(mapStateToProps, { 
	clearRegisterForm,
  newEmailChanged, 
	newPasswordChanged,
  registerUser
})(RegisterForm);
