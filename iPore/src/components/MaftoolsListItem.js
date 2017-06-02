import React, { Component } from 'react';
import { Text, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection } from './common';

class MaftoolsListItem extends Component {
  
  render() {
    
    const { titleStyle, linkStyle } = styles;
    const { id, item } = this.props;
    
    const server = 'http://192.168.150.1:3001/' + id + '/';

    return (
      <Card>
        <CardSection>
          <Text style={titleStyle}>{item.name}</Text>
        </CardSection>
        <CardSection>
          <Text 
            onPress={() => Linking.openURL(server + item.path)}
            style={linkStyle}
          >
            MAF File 
          </Text>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 13,
    fontWeight: '600',
    paddingLeft: 13,
    paddingTop: 5,
    paddingBottom: 5
  },

  linkStyle: {
    color: '#2876cc', 
    paddingLeft: 13, 
    paddingTop: 5, 
    paddingBottom: 5 
  }
};

const mapStateToProps = ({ auth }) => {
  const { id } = auth.user.loggedUser;
  return { id };
};

export default connect(mapStateToProps, {})(MaftoolsListItem);
