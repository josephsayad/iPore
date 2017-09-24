/**
 * CardSection Component
 * CardSection.js: sections to divide the content found in a 
 * card, and to further style our AlbumDetails. Functional-
 * based component.
 */

import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  const { viewStyle } = styles;

  return (
    <View style={[viewStyle, props.style]}>
      {props.children}
    </View>
  );
};

const styles = {
  viewStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderColor: '#ddd',
    position: 'relative'
  }
};

export { CardSection };
