import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import { selectInstance, displayPoretoolsOutput, displayMaftoolsOutput } from '../actions';
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

          <TouchableWithoutFeedback>
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

  renderItem() {
    const { pipelineName, status } = this.props.pipelineInstance;
    const { labelStyles, titleStyles } = styles;
   
    if (status === 'incomplete') {
      return (
        <TouchableWithoutFeedback onPress={() => this.props.selectInstance(pipelineName)}>
          <View>
            <CardSection style={{ backgroundColor: '#469eff', borderColor: '#2876cc' }}>
              <Text style={labelStyles}>
                Instance ID
              </Text>
              <Text style={titleStyles}>
                {pipelineName}
              </Text>
            </CardSection>
          </View>
        </TouchableWithoutFeedback>
      );
    } else if (status === 'complete') {
      return (
        <TouchableWithoutFeedback onPress={() => this.props.selectInstance(pipelineName)}>
          <View>
            <CardSection style={{ backgroundColor: '#469eff', borderColor: '#2876cc' }}>
              <Text style={labelStyles}>
                Instance ID
              </Text>
              <Text style={titleStyles}>
                {pipelineName}
              </Text>
            </CardSection>
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
    fontWeight: '500'
  },

  titleStyles: {
    fontSize: 14,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#ffffff'
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
  displayMaftoolsOutput
})(PipelineListItem);
