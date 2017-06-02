import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { pipelinesFetch, clearSelect } from '../actions';
import PipelineListItem from './PipelineListItem';

class PipelineList extends Component {
  componentWillMount() {
    const { user } = this.props;
    this.props.pipelinesFetch({ user });

    this.createDataSource(this.props);
  }
  
  /* nextProps are the next set of props the component will be rendered with. 
   * this.props are the current props.
   */

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ pipelineArray }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(pipelineArray);
  }

  renderRow(pipeline) {
    return (
      <PipelineListItem 
        pipelineInstance={pipeline} 
      />
    );
  }

  render() {
    return (
      <ListView 
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
        style={{ paddingTop: 6, borderColor: '#1c528e' }}
      />
    );
  }
}

const mapStateToProps = ({ auth, pipelines }) => {
  const { user } = auth;
  const { pipelineArray } = pipelines;

  return { user, pipelineArray };
};


export default connect(mapStateToProps, { pipelinesFetch, clearSelect })(PipelineList);
