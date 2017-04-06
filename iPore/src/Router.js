import React from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import PipelineRunCreate from './components/PipelineRunCreate';

const RouterComponent = () => {
  const { 
    sceneStyle,
    navBar,
    navBarTitle 
  } = styles;

  return ( 
    <Router 
      sceneStyle={sceneStyle} 
      navigationBarStyle={navBar} 
      titleStyle={navBarTitle}
    >
      <Scene key="account">
        <Scene 
          key="login" 
          component={LoginForm} 
          title={'iPore'} 
          initial 
        />
        <Scene 
          backTitle="Back"
          key="register" 
          component={RegisterForm} 
          title="Add Member" 
        />
      </Scene>

      <Scene key="main">
        <Scene 
          rightTitle="Add"
          onRight={() => Actions.pipelineRunCreate()}
          key="dashboard"
          component={Dashboard} 
          title="Dashboard"
          initial
        />
        <Scene 
          key="pipelineRunCreate" 
          component={PipelineRunCreate} 
          title='Pipeline' 
        />
      </Scene>
    </Router>
  );
};

const styles = {
  sceneStyle: {
    paddingTop: 65
  },

  navBar: {
    backgroundColor: '#fff',
    borderColor: '#fff',
    height: 71
  },
  
  navBarTitle: {
    color: '#007aff',
    fontSize: 22,
    fontWeight: '200'
  }
};

export default RouterComponent;
