import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import { 
  selectInstance, 
  displayPoretoolsOutput,
  displayNanookOutput, 
  displayMaftoolsOutput
} from '../actions';
import { CardSection } from './common';

class PipelineListItem extends Component {
  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  onPoretoolsPress() {
    const { output } = this.props.pipelineInstance;
    const poretools = output.children[0].children[2];

    this.props.displayPoretoolsOutput(poretools);
  }

  onNanookPress() {
    const { output } = this.props.pipelineInstance;
    const nanook = output.children[0].children[1];

    console.log(nanook);

    this.props.displayNanookOutput(nanook);
  }

  onMaftoolsPress() {
    const { output } = this.props.pipelineInstance;
    const maftools = output.children[0].children[0];

    this.props.displayMaftoolsOutput(maftools);    
  }

  renderCompletedInstanceDetail() {
    const { pipelineName } = this.props.pipelineInstance;
    const { instanceId } = this.props;
    const { toolLabelStyle, toolNameStyle } = styles;

    if (instanceId === pipelineName) {
      return (
        <View>

          <TouchableWithoutFeedback onPress={this.onPoretoolsPress.bind(this)}>
            <View>
              <CardSection>
                <Text style={toolLabelStyle}>
                  Tool
                </Text>
                <Text style={toolNameStyle}>
                  poretools
                </Text>
              </CardSection>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={this.onNanookPress.bind(this)}>
            <View>
              <CardSection>
                <Text style={toolLabelStyle}>
                  Tool
                </Text>
                <Text style={toolNameStyle}>
                  nanook
                </Text>
              </CardSection>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={this.onMaftoolsPress.bind(this)}>
            <View>
              <CardSection>
                <Text style={toolLabelStyle}>
                  Tool
                </Text>
                <Text style={toolNameStyle}>
                  maftools
                </Text>
              </CardSection>
            </View>
          </TouchableWithoutFeedback>

        </View>
      );
    }
  }

  renderTimeStamp() {
    const { timestamp } = this.props.pipelineInstance;
    const { timestampStyle, timestampContainerStyle } = styles;

    const date = timestamp.split('T');
    
    return (
      <View style={timestampContainerStyle}>
        <Text style={timestampStyle}>{date[0]}</Text>
      </View>
    );
  }

  renderItem() {
    const { pipelineName, status } = this.props.pipelineInstance;
    const { labelStyle, titleStyle, entryStyle } = styles;
   
    if (status === 'incomplete') {
      return (
        <TouchableWithoutFeedback onPress={() => this.props.selectInstance(pipelineName)}>
          <View>
            <View style={entryStyle}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={labelStyle}>
                  Instance ID
                </Text>
                <Text style={titleStyle}>
                  {pipelineName}
                </Text>
              </View>
              {this.renderTimeStamp()}
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    } else if (status === 'complete') {
      return (
        <TouchableWithoutFeedback onPress={() => this.props.selectInstance(pipelineName)}>
          <View>
            <View style={entryStyle}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={labelStyle}>
                  Instance ID
                </Text>
                <Text style={titleStyle}>
                  {pipelineName}
                </Text>
              </View>
              {this.renderTimeStamp()}
            </View>
            {this.renderCompletedInstanceDetail()}
          </View>
        </TouchableWithoutFeedback>    
      );
    }
  }

  render() {
    return (
      <View>
        {this.renderItem()}
      </View>
    );
  }
}

const styles = {
  labelStyle: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#ffffff',
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: '700'
  },

  titleStyle: {
    fontSize: 14,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#ffffff'
  },

  timestampStyle: {
    fontSize: 11,
    color: '#ffffff',
    fontWeight: '400',
    paddingLeft: 7.5,
    paddingRight: 7.5,
    paddingTop: 5
  },

  timestampContainerStyle: {
    height: 27,
    borderRadius: 2,
    marginRight: 40,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ffffff'
  },

  toolLabelStyle: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#2876cc',
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: '500'
  },

  toolNameStyle: {
    fontSize: 14,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10
  },

  entryStyle: {
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#1c528e',
    padding: 5,
    paddingLeft: 4.5,
    backgroundColor: '#2876cc',
    position: 'relative',
    alignItems: 'center'
  }
};

const mapStateToProps = ({ auth, select }) => {
  const { id } = auth.user.loggedUser;
  const { instanceId, tool } = select;

  return { id, instanceId, tool }; 
};

export default connect(mapStateToProps, { 
  selectInstance, 
  displayPoretoolsOutput, 
  displayNanookOutput,
  displayMaftoolsOutput
})(PipelineListItem);
