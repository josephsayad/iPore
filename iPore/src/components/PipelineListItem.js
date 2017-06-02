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
    const { toolLabelStyles, toolNameStyles } = styles;

    if (instanceId === pipelineName) {
      return (
        <View>

          <TouchableWithoutFeedback onPress={this.onPoretoolsPress.bind(this)}>
            <View>
              <CardSection>
                <Text style={toolLabelStyles}>
                  Tool
                </Text>
                <Text style={toolNameStyles}>
                  poretools
                </Text>
              </CardSection>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={this.onNanookPress.bind(this)}>
            <View>
              <CardSection>
                <Text style={toolLabelStyles}>
                  Tool
                </Text>
                <Text style={toolNameStyles}>
                  nanook
                </Text>
              </CardSection>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={this.onMaftoolsPress.bind(this)}>
            <View>
              <CardSection>
                <Text style={toolLabelStyles}>
                  Tool
                </Text>
                <Text style={toolNameStyles}>
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
    const { timestampStyles, timestampContainerStyles } = styles;

    const date = timestamp.split('T');
    
    return (
      <View style={timestampContainerStyles}>
        <Text style={timestampStyles}>{date[0]}</Text>
      </View>
    );
  }

  renderItem() {
    const { pipelineName, status } = this.props.pipelineInstance;
    const { labelStyles, titleStyles, entryStyles } = styles;
   
    if (status === 'incomplete') {
      return (
        <TouchableWithoutFeedback onPress={() => this.props.selectInstance(pipelineName)}>
          <View>
            <View style={entryStyles}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={labelStyles}>
                  Instance ID
                </Text>
                <Text style={titleStyles}>
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
            <View style={entryStyles}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={labelStyles}>
                  Instance ID
                </Text>
                <Text style={titleStyles}>
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
  labelStyles: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#ffffff',
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: '700'
  },

  titleStyles: {
    fontSize: 14,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#ffffff'
  },

  timestampStyles: {
    fontSize: 11,
    paddingTop: 3,
    paddingBottom: 2.5,
    color: '#1c528e',
    fontWeight: '700',
    paddingLeft: 7.5,
    paddingRight: 7.5
  },

  timestampContainerStyles: {
    borderColor: '#ffffff',
    height: 25,
    borderRadius: 2,
    borderWidth: 2,
    marginRight: 25,
    backgroundColor: '#ffffff'
  },

  toolLabelStyles: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#007aff',
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: '500'
  },

  toolNameStyles: {
    fontSize: 14,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10
  },

  entryStyles: {
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
