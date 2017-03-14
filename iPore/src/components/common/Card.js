/**
 * Card Component
 * Card.js: standalone component whose sole purpose is
 * to add styling into the application.
 */

import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
  const { viewStyle } = styles;

  return (
    <View style={viewStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  viewStyle: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#fff',
    borderBottomWidth: 0, // For CardSection Comp...
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 0.5, 
    marginLeft: 5, 
    marginRight: 5,
    marginTop: 10
  }
};

export { Card };
