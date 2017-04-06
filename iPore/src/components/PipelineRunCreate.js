import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { 
  nameChanged,
  fast5PathChanged, 
  referencePathChanged, 
  runPipeline, 
  clearPipelineRunCreate 
} from '../actions';
import { Card, CardSection, Input, Button } from './common';

class PipelineRunCreate extends Component {
  componentWillMount() {
    this.props.clearPipelineRunCreate();
  }

  onNameChange(text) {
    this.props.nameChanged(text);
  }

  onFast5Change(text) {
    this.props.fast5PathChanged(text);
  }

  onReferenceChange(text) {
    this.props.referencePathChanged(text);
  }

  onButtonPress() {
    const { 
      pipelineName, 
      fast5Path, 
      referencePath,
      user 
    } = this.props;

    this.props.runPipeline({ 
      pipelineName, 
      fast5Path, 
      referencePath,
      user
    });
  }

  render() {
    const { buttonStyle, errorTextStyle } = styles;

    return (
      <Card>
        <CardSection>
          <Input 
            label="ID"
            placeholder="Pipeline name"
            onChangeText={this.onNameChange.bind(this)}
            value={this.props.pipelineName}
          />
        </CardSection>

        <CardSection>
          <Input 
            label="Fast5"
            placeholder="Directory path"
            onChangeText={this.onFast5Change.bind(this)}
            value={this.props.fast5Path}
          />
        </CardSection>

        <CardSection>
          <Input 
            label="Reference"
            placeholder="Directory path"
            onChangeText={this.onReferenceChange.bind(this)}
            value={this.props.referencePath}
          />   	
        </CardSection>

        <Text style={styles.errorTextStyle}>{this.props.error}</Text>

        <CardSection style={buttonStyle}>
          <Button onPress={this.onButtonPress.bind(this)}>
            Run
          </Button>    	
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  buttonStyle: {
    marginTop: 8
  },

  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: '#ff0000'
  }
};

const mapStateToProps = ({ loggedUser, auth }) => {
  const { 
    pipelineName, 
    fast5Path, 
    referencePath,
    error
  } = loggedUser;

  const { user } = auth; 

  return { 
    pipelineName, 
    fast5Path, 
    referencePath,
    error,
    user
  };
};

export default connect(mapStateToProps, {
  nameChanged,
  fast5PathChanged, 
  referencePathChanged,
  runPipeline,
  clearPipelineRunCreate
})(PipelineRunCreate);
