/**
 * Card Component
 * Card.js: standalone component whose sole purpose is
 * to add styling into the application.
 */

import React from 'react';
import { View } from 'react-native';

const PipelineCard = (props) => {
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
    borderBottomWidth: 0,
    marginTop: 18,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 8,
    borderColor: '#d0d0d0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, 
    shadowRadius: 1.5,
    elevation: 5
  }
};

export { PipelineCard };
