import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { 
  emailChanged, 
  passwordChanged, 
  loginUser, 
  goToRegisterForm
} from '../actions';
import { 
  Card, 
  CardSection, 
  Input, Button, 
  Spinner, 
  FooterWithNativeBase 
} from './common';

class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);    
  }

  onButtonPress() {    
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  onSecondButtonPress() {    
    this.props.goToRegisterForm();
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    );
  }

  renderRegisterButton() {
    if (this.props.loading) {
      return;
    }

    return (
      <Button onPress={this.onSecondButtonPress.bind(this)}>
        Register
      </Button>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
        <Card>
          <CardSection>
            <Input 
              label="Email"
              placeholder="login@gmail.com"
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
            />
          </CardSection>

          <CardSection>
            <Input 
              secureTextEntry
              label="Password"
              placeholder="password"
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
            />    
          </CardSection>

          <Text style={styles.errorTextStyle}>{this.props.error}</Text>

          <CardSection>
            {this.renderButton()}   
            {this.renderRegisterButton()}     
          </CardSection>
        </Card>
        <View>
          <FooterWithNativeBase 
            style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }} 
            parent={'login'} 
          />
        </View> 
      </View>   
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

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  
  return { 
    email, 
    password, 
    error,
    loading 
  };
};

export default connect(mapStateToProps, { 
  emailChanged, 
  passwordChanged, 
  loginUser,
  goToRegisterForm
})(LoginForm);
