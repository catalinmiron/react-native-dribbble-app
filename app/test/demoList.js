//@flow-weak

import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  ListView,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
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
      isLoadingTail: false,
      isRefreshing: false,
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
    this._renderFooter = this._renderFooter.bind(this);

    // bind ds
    this._getDataSource = this._getDataSource.bind(this);
    this._getShots = this._getShots.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
    this._hasMore = this._hasMore.bind(this);
    this._onEndReached = this._onEndReached.bind(this);
  }

  componentWillMount() {
    this._getShots(this.state.filter);
  }

  _getShots(query: string) {
    this.setState({
      // isLoading: true,
      isRefreshing: true,
      queryNumber: this.state.queryNumber + 1,
      isLoadingTail: false,
    });

    api.getShotsByType(query, 1).catch((error) => {
      this.LOADING[query] = false;
      this.resultsCache.dataForQuery[query] = undefined;

      this.setState({
        dataSource: this._getDataSource([]),
        // isLoading: false,
        isRefreshing: false
      });
    }).then((responseData) => {
      this.LOADING[query] = false;
      this.resultsCache.dataForQuery[query] = responseData;
      this.resultsCache.nextPageNumberForQuery[query] = 2;

      this.setState({
        // isLoading: false,
        isRefreshing: false,
        dataSource: this._getDataSource(responseData),
      });
    }).done();
  }

  _getDataSource(shots: Array<any>): ListView.DataSource {
    return this.state.dataSource.cloneWithRows(shots);
  }

  _onRefresh() {
    this.setState({isRefreshing: true});
    this._getShots(this.state.filter);
  }

  _hasMore(): boolean {
    var query = this.state.filter;
    if (!this.resultsCache.dataForQuery[query]) {
          return true;
    }
    return (
      this.resultsCache.totalForQuery[query] !==
        this.resultsCache.dataForQuery[query].length
    );
  }

  _onEndReached() {
    var query = this.state.filter;
    if (!this._hasMore() || this.state.isLoadingTail || this.state.isRefreshing) {
      // We"re already fetching or have all the elements so noop
      return;
    }

    if (this.LOADING[query]) {
      return;
    }

    this.LOADING[query] = true;
    this.setState({
      queryNumber: this.state.queryNumber + 1,
      isLoadingTail: true,
    });

    let page = this.resultsCache.nextPageNumberForQuery[query];
    let resultsCache = this.resultsCache;

    api.getShotsByType(query, page)
      .catch((error) => {
        this.LOADING[query] = false;
        this.setState({
            isLoadingTail: false,
        });
      })
      .then((responseData) => {
        // if(!resultsCache.dataForQuery[query]) {
        //   console.warn('result is invalid');
        //   this.setState({
        //       isLoadingTail: false,
        //       // dataSource: this.getDataSource(this.resultsCache.dataForQuery[query]),
        //   });
        //
        //   return;
        // }

        let shotsForQuery = resultsCache.dataForQuery[query].slice();

        this.LOADING[query] = false;
        // We reached the end of the list before the expected number of results
        if (!responseData) {
          resultsCache.totalForQuery[query] = shotsForQuery.length;
        } else {
          for (var i in responseData) {
              shotsForQuery.push(responseData[i]);
          }
          resultsCache.dataForQuery[query] = shotsForQuery;
          resultsCache.nextPageNumberForQuery[query] += 1;
        }

        this.setState({
          isLoadingTail: false,
          dataSource: this._getDataSource(resultsCache.dataForQuery[query]),
        });
      })
      .done();
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

  _renderFooter() {
    return <View style={styles.scrollSpinner}>
      <UNActivityIndicator loadingType={LOADING_TYPE.Default} />
    </View>;
  }

  _renderView() {
    if (this.state.isLoading) {
      return (
        <Text>Empty Data</Text>
      );
    }

    return (
      <View style={styles.container}>
        <ListView
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh}
            />
          }
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderSeparator={this._renderSeparator}
          renderFooter={this._renderFooter}
          onEndReached={this._onEndReached}
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
  scrollSpinner: {
    marginVertical: 20,
  },

});
