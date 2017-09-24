import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import NanookListItem from './NanookListItem';

class Nanook extends Component {
  componentWillMount() {
    const { output } = this.props;    

    if (output !== null) {

      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2 
      });

      this.dataSource = ds.cloneWithRows(this.props.output.children);
    }
  }

  renderRow(nanookDir) {
    return <NanookListItem item={nanookDir} />;
  }

  render() { 
    return (
      <ListView
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = ({ select }) => {
  const { output } = select;
  return { output }; 
};

export default connect(mapStateToProps, {})(Nanook);
