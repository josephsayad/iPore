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
            <Icon name="ios-document" style={{ color: '#2876cc' }} />
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
