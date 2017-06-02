import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import MaftoolsListItem from './MaftoolsListItem';

class Maftools extends Component {
  
  /* Specify data source before mounting Maftools */

  componentWillMount() {
    const { output } = this.props;    

    if (output !== null) {

      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2 
      });

      this.dataSource = ds.cloneWithRows(this.props.output.children);
    }
  }

  /* Specify how to render each row of the ListView: gets called N times 
   * where N is the number of MAF files generated.
   */

  renderRow(mafFile) {
    return <MaftoolsListItem item={mafFile} />;
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

export default connect(mapStateToProps, {})(Maftools);
