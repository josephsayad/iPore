/**
 * Header Component
 * Header.js: implementation, and export of 
 * the Header component. 
 */

import React from 'react';
import { Text, View } from 'react-native';

const Header = (props) => {
  const { textStyle, viewStyle } = styles; 

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.text}</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center', 
    height: 65,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.2,
    elevation: 2, 
    position: 'relative'
  },
  
  textStyle: {
    fontSize: 25,
    fontWeight: '400',
    color: '#000'
  }
};

export { Header };
