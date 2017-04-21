import React, { Component } from 'react';
import { Footer, FooterTab, Button, Text, Icon } from 'native-base';

class FooterWithNativeBase extends Component {
  renderFooter() {
    const { parent } = this.props;

    if (parent === 'login') {
      return; 
    } else if (parent === 'register') {
      return;
    } else if (parent === 'dashboard') {
      return (
        <FooterTab>
          <Button>
            <Icon name="home" style={{ color: '#007aff' }} />
            <Text>Dashboard</Text>
          </Button>
          <Button>
            <Icon active name="settings" style={{ color: '#007aff' }} />
            <Text>Inputs</Text>           
          </Button>
          <Button>
            <Icon active name="flask" style={{ color: '#007aff' }} />
            <Text>Outputs</Text>              
          </Button>                    
        </FooterTab>
      );
    }
  }

  render() {
    return (
      <Footer>
        {this.renderFooter()}
      </Footer>
    );
  }
}

export { FooterWithNativeBase };
