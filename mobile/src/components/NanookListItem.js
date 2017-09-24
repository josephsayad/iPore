import React, { Component } from 'react';
import { Text, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection } from './common';

class NanookListItem extends Component {
  renderName() {
    const { name } = this.props.item;
    
    if (name === 'alignment_files') {
      return <Text style={styles.titleStyle}>2D, Complement, and Template Alignment Files</Text>;
    } else if (name === 'analysis') {
      return <Text style={styles.titleStyle}>Analysis</Text>;      
    } else if (name === 'quality_check') {
      return <Text style={styles.titleStyle}>Quality Check</Text>;      
    }
  }


  render() {
    const { id, item } = this.props;

    const server = 'localhost:3001/' + id + '/';

    return (
      <Card>
        <CardSection>
          {this.renderName()}
        </CardSection>
        <CardSection>
          <Text 
            onPress={() => Linking.openURL(server + item.path)}
            style={styles.linkStyle}
          >
            Directory
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

export default connect(mapStateToProps, {})(NanookListItem);
