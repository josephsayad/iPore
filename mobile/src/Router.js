import React from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import LogoutButton from './components/LogoutButton';
import Dashboard from './components/Dashboard';
import PipelineRunCreate from './components/PipelineRunCreate';
import Poretools from './components/Poretools';
import Nanook from './components/Nanook';
import Maftools from './components/Maftools';


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
          title="iPore" 
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
          renderLeftButton={() => { return <LogoutButton />; }}
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

      <Scene key="toolOne">
        <Scene
          key="poretools" 
          component={Poretools} 
          title='Poretools'
          leftTitle="Back"
          onLeft={() => Actions.main({ type: 'reset' })}
          initial
        />
      </Scene>
      
      <Scene key="toolTwo">
        <Scene
          key="nanook" 
          component={Nanook} 
          title='Nanook'
          leftTitle="Back"
          onLeft={() => Actions.main({ type: 'reset' })}
        />
      </Scene>

      <Scene key="toolThree">
        <Scene
          key="maftools" 
          component={Maftools} 
          title='Maftools'
          leftTitle="Back"
          onLeft={() => Actions.main({ type: 'reset' })}
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
    color: '#2876cc',
    fontSize: 22,
    fontWeight: '200'
  }
};

export default RouterComponent;
