import React, { Component } from 'react';
import { ScrollView, View, Image, Text, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection } from './common';

class Poretools extends Component {
	
  outputData() {
    const { id, instanceId, tool, output } = this.props;
    const { titleStyle, imageStyle, linkStyle } = styles;

    if (id !== null && instanceId !== null && tool !== null) {
      const server = 'http://192.168.150.1:3001/' + id + '/';
      
      /* Links to visualization output on Server */

      const collectorsCurve = server + output.children[0].path;
      const histogram = server + output.children[1].path;
      const nucDist = server + output.children[2].path;
      const occupancy = server + output.children[3].path;
      const qualDist = server + output.children[4].path;
      const qualpos = server + output.children[5].path;
      const stats = server + output.children[6].path;
      const tabular = server + output.children[7].path;

      return (
        <View style={{ paddingBottom: 15 }}>
          <Card>
            <CardSection>
              <Text style={titleStyle}>Collectors Curve</Text>
            </CardSection>
            <CardSection>
              <Image source={{ uri: collectorsCurve }} style={imageStyle} />
            </CardSection>
          </Card>

          <Card>
            <CardSection>
              <Text style={titleStyle}>Histogram</Text>
            </CardSection>
            <CardSection>
              <Image source={{ uri: histogram }} style={imageStyle} />
            </CardSection>          
          </Card>
        
          <Card>
            <CardSection>
              <Text style={titleStyle}>NucDist</Text>
            </CardSection>
            <CardSection>
              <Text 
                onPress={() => Linking.openURL(nucDist)}
                style={linkStyle}
              >
                Text File
              </Text>
            </CardSection>
          </Card>

          <Card>
            <CardSection>
              <Text style={titleStyle}>Occupancy</Text>
            </CardSection>
            <CardSection>
              <Image source={{ uri: occupancy }} style={imageStyle} />
            </CardSection>
          </Card>

          <Card>
            <CardSection>
              <Text style={titleStyle}>QualDist</Text>
            </CardSection>
            <CardSection>
              <Text 
                onPress={() => Linking.openURL(qualDist)}
                style={linkStyle}
              >
                Text File
              </Text>
            </CardSection>
          </Card>

          <Card>
            <CardSection>
              <Text style={titleStyle}>Qualpos</Text>
            </CardSection>
            <CardSection>
              <Text 
                onPress={() => Linking.openURL(qualpos)}
                style={linkStyle}
              >
                PDF
              </Text>
            </CardSection>
          </Card>

          <Card>
            <CardSection>
              <Text style={titleStyle}>Stats</Text>
            </CardSection>
            <CardSection>
              <Text 
                onPress={() => Linking.openURL(stats)}
                style={linkStyle}
              >
                Text File
              </Text>
            </CardSection>
          </Card>

          <Card>
            <CardSection>
              <Text style={titleStyle}>Tabular</Text>
            </CardSection>
            <CardSection>
              <Text 
                onPress={() => Linking.openURL(tabular)}
                style={linkStyle}
              >
                Text File
              </Text>
            </CardSection>
          </Card>          

        </View>
      );
    } 
    
    return <Text>Component waiting for re-render...</Text>;
  }

  render() {
    return (
      <ScrollView>
        {this.outputData()}
      </ScrollView>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 13,
    fontWeight: 'bold',
    paddingLeft: 13,
    paddingTop: 5,
    paddingBottom: 5
  },

  imageStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 275, 
    height: 275
  },

  linkStyle: {
    color: '#0000ff', 
    paddingLeft: 13, 
    paddingTop: 5, 
    paddingBottom: 5 
  }
};

const mapStateToProps = ({ auth, select }) => {
  const { id } = auth.user.loggedUser;
  const { instanceId, tool, output } = select;

  return { id, instanceId, tool, output }; 
};

export default connect(mapStateToProps, {})(Poretools);
