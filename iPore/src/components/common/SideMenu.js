import React from 'react';
import { View, Text } from 'react-native';

const SideMenu = () => {
  const { sideMenuStyle } = styles 
;
  return (
    <View style={sideMenuStyle}>
      <Text>Menu Here!</Text>
    </View>
  );
};

const styles = {
  sideMenuStyle: {
    backgroundColor: '#000',
    height: 25,
    width: 100
  }
};

export { SideMenu };
