import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';

class SearchBar extends Component {
  
  render() {
    const { viewStyle, searchContainerStyle, textStyle } = styles;

    return (
      <View style={viewStyle}>
        <View style={searchContainerStyle}>
          <Icon name="search" style={{ color: '#2876cc', fontSize: 18, paddingLeft: 30, paddingTop: 3 }} />
          <Text style={textStyle}>Search...</Text>
        </View>
      </View>
    );
  }
}

const styles = {
  viewStyle: {
    height: 40,
    backgroundColor: '#ededed'
  },

  searchContainerStyle: {
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center'
  },

  textStyle: {
    fontSize: 10,
    paddingTop: 5,
    color: '#2876cc',
    paddingLeft: 25,
    fontWeight: '500'
  }
};

export { SearchBar };
