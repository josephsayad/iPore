import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, Text } from 'react-native';
import { CardSection } from './common';

class PipelineListItem extends Component {
  render() {
  	const { pipelineName, output } = this.props.pipelineInstance;
  	const userID = this.props.id; 

  	/* Web Server on Port 3001: Broadcasts the Data */
    
    const dataOnServer = 'http://192.168.150.1:3001/' + userID + '/'

    const maftools = output.children[0].children[0];
    const nanook = output.children[0].children[1];
    const poretools = output.children[0].children[2];

    const collectorsCurve = dataOnServer + poretools.children[0].path;

  	return (
      <View>
      	<CardSection>
      	  <Text style={styles.titleStyle}>
      	    {pipelineName}
          </Text>
        </CardSection>
        <CardSection>
          <Image source={{ uri: collectorsCurve }} style={{width: 100, height: 100}} />
        </CardSection>
      </View>
  	);
  }
}

const styles = {
  titleStyle: {
  	fontSize: 18,
  	paddingLeft: 15
  }
}

const mapStateToProps = ({ auth }) => {
  const { id } = auth.user.loggedUser;

  return { id };
};

export default connect(mapStateToProps, {})(PipelineListItem);
