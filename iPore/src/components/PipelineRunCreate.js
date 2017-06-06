import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { 
  nameChanged,
  // fast5PathChanged, 
  referencePathUpdated, 
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

  // onFast5Change(text) {
  //   this.props.fast5PathChanged(text);
  // }

  // onReferenceChange(text) {
  //   this.props.referencePathChanged(text);
  // }

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
    const { 
      buttonStyle, 
      fast5ContainerStyle, 
      labelStyle, 
      pathStyle,
      pickerLabelStyle
    } = styles;

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
          <View style={fast5ContainerStyle}>
            <Text style={labelStyle}>FAST5</Text>
            <Text style={pathStyle}>NanoporeSeq/Server/FAST5</Text>
          </View>
        </CardSection>

        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={pickerLabelStyle}>Reference Genome</Text>
          <Picker
            selectedValue={this.props.referencePath}
            onValueChange={
              value => this.props.referencePathUpdated({ 
                prop: 'referencePath', value 
              })}
          > 
            <Picker.Item 
              label="ecoli_dh10b_cs" 
              value="`pwd`/References/ecoli_dh10b_cs.fasta" 
            />
            <Picker.Item 
              label="campylobacter_jejuni" 
              value="`pwd`/References/campylobacter_jejuni.fasta" 
            />
            <Picker.Item 
              label="listeria_monocytogenes" 
              value="`pwd`/References/listeria_monocytogenes.fasta" 
            />
            <Picker.Item 
              label="staphylococcus_aureus" 
              value="`pwd`/References/staphylococcus_aureus.fasta" 
            />
            <Picker.Item 
              label="streptococcus_pneumoniae" 
              value="`pwd`/References/streptococcus_pneumoniae.fasta" 
            />
            <Picker.Item 
              label="streptococcus_pyogenes" 
              value="`pwd`/References/streptococcus_pyogenes.fasta" 
            />
            <Picker.Item 
              label="vibrio_cholerae" 
              value="`pwd`/References/vibrio_cholerae.fasta" 
            />
            <Picker.Item 
              label="vibrio_parahaemolyticus" 
              value="`pwd`/References/vibrio_parahaemolyticus.fasta" 
            />
            <Picker.Item 
              label="vibrio_vulnificus" 
              value="`pwd`/References/vibrio_vulnificus.fasta" 
            />
          </Picker>        
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

  fast5ContainerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  labelStyle: {
    fontSize: 15,
    fontWeight: '600',
    paddingLeft: 20,
    flex: 1
  },

  pathStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 14,
    lineHeight: 23,
    flex: 2
  },

  pickerLabelStyle: {
    fontSize: 15,
    fontWeight: '600',
    paddingLeft: 20
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
  // fast5PathChanged, 
  referencePathUpdated,
  runPipeline,
  clearPipelineRunCreate
})(PipelineRunCreate);
