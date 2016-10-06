//@flow

import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  ListView,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

import DemoCell from './demoCell';
import ShotCell from '../ShotCell';
import * as api from "../helpers/api";
import UNActivityIndicator, {LOADING_TYPE} from './universalLoading';
import ShotDetails from '../ShotDetails';

export default class DemoList extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      isLoading: false,
      isLoadingTail: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      filter: this.props.filter,
      queryNumber: 0,
    };

    this.resultsCache = {
        dataForQuery: [],
        nextPageNumberForQuery: [],
        totalForQuery: [],
    };

    this.LOADING = {};

    //bind
    this._renderRow = this._renderRow.bind(this);
    this._renderSeparator = this._renderSeparator.bind(this);
    this._pressRow = this._pressRow.bind(this);
    this._renderView = this._renderView.bind(this);

    // bind ds
    this._getDataSource = this._getDataSource.bind(this);
    this._getShots = this._getShots.bind(this);
  }

  componentWillMount() {
    this._getShots(this.state.filter);
  }

  _getShots(query: string) {
    this.setState({
      isLoading: true,
      queryNumber: this.state.queryNumber + 1,
      isLoadingTail: false,
    });

    api.getShotsByType(query, 1).catch((error) => {
      this.LOADING[query] = false;
      this.resultsCache.dataForQuery[query] = undefined;

      this.setState({
          dataSource: this._getDataSource([]),
          isLoading: false,
      });
    }).then((responseData) => {
      this.setState({
        isLoading: false,
        dataSource: this._getDataSource(responseData),
      });
    }).done();
  }

  _getDataSource(shots: Array<any>): ListView.DataSource {
    return this.state.dataSource.cloneWithRows(shots);
  }

  _renderRow(rowData: Object, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
    return (
      <ShotCell
        onSelect={() => this._pressRow(rowData)}
        shot={rowData}
      />
    )
  }

  _renderSeparator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
    return (
      <View key={`{sectionID}-${rowID}`}
        style={styles.seperator}>

      </View>
    );
  }

  _pressRow(shot: Object) {
    this.props.navigator.push({
        component: ShotDetails,
        passProps: {shot},
        title: shot.title
    });
  }

  _renderView() {
    if (this.state.isLoading) {
      return (
        <UNActivityIndicator loadingType={LOADING_TYPE.Large} />
      );
    }

    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderSeparator={this._renderSeparator}
          automaticallyAdjustContentInsets={false}
          enableEmptySectoins={false}
          />
      </View>
    );
  }

  render() {
    return (
      this._renderView()
    );
  }
};

DemoList.defaultProps = {
    filter: ""
};

DemoList.propTypes = {
    filter: React.PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 64,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  text: {
    flex: 1,
  },
  seperator: {
    height: 1,
    backgroundColor: '#eeeeee'
  },

});
