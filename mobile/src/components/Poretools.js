import React, { Component } from 'react';
import { ScrollView, View, Image, Text, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection } from './common';

class Poretools extends Component {
	
  outputData() {
    const { id, output } = this.props;
    const { titleStyle, imageStyle, linkStyle } = styles;

    if (id !== null && output !== null) {
      const server = 'http://localhost:3001/' + id + '/';
      
      /* Links to visualization output on Server */

      const collectorsCurve = server + output.children[0].path;
      const histogram = server + output.children[1].path;
      const nucDist = server + output.children[2].path;
      const occupancy = server + output.children[3].path;
      const qualDist = server + output.children[4].path;
      const qualpos = server + output.children[5].path;
      const stats = server + output.children[6].path;
      const tabular = server + output.children[7].path;

      /* Links to visualization output on Server */

      return (
        <View style={{ paddingBottom: 15 }}>
          <Card>
            <CardSection>
              <Text style={titleStyle}>Yield Plot</Text>
            </CardSection>
            <CardSection>
              <Image source={{ uri: collectorsCurve }} style={imageStyle} />
            </CardSection>
          </Card>

          <Card>
            <CardSection>
              <Text style={titleStyle}>Histogram of Read Sizes</Text>
            </CardSection>
            <CardSection>
              <Image source={{ uri: histogram }} style={imageStyle} />
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
              <Text style={titleStyle}>Nucleotide Composition</Text>
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
              <Text style={titleStyle}>Quality Score Composition</Text>
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
              <Text style={titleStyle}>Box-Whisker Plot</Text>
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
              <Text style={titleStyle}>Read Size Statistics</Text>
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
  const { output } = select;

  return { id, output }; 
};

export default connect(mapStateToProps, {})(Poretools);
