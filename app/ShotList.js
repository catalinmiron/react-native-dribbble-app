'use strict';

var React = require('react-native');
var {
  ActivityIndicatorIOS,
  ListView,
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;

var api = require('./helpers/api');

var ShotCell = require('./ShotCell');
var ShotDetails = require('./ShotDetails');

// Results should be cached keyed by the query
// with values of null meaning "being fetched"
// and anything besides null and undefined
// as the result of a valid query
var resultsCache = {
  dataForQuery: {},
  nextPageNumberForQuery: {},
  totalForQuery: {},
};

var LOADING = {};

var ShotList = React.createClass({
  getDefaultProps: function() {
    return {
      filter: ''
    };
  },

  getInitialState: function() {
    return {
      isLoading: false,
      isLoadingTail: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      filter: this.props.filter,
      queryNumber: 0,
    };
  },

  componentWillMount: function() {
    this.getShots(this.state.filter);
  },

  getShots: function(query: string) {
    this.setState({filter: query});

    var cachedResultsForQuery = resultsCache.dataForQuery[query];
    if (cachedResultsForQuery) {
      if (!LOADING[query]) {
        this.setState({
          dataSource: this.getDataSource(cachedResultsForQuery),
          isLoading: false
        });
      } else {
        this.setState({isLoading: true});
      }
      return;
    }

    LOADING[query] = true;
    resultsCache.dataForQuery[query] = null;
    this.setState({
      isLoading: true,
      queryNumber: this.state.queryNumber + 1,
      isLoadingTail: false,
    });

    fetch(api.getShotsByType(query, 1))
      .then((response) => response.json())
      .catch((error) => {
        LOADING[query] = false;
        resultsCache.dataForQuery[query] = undefined;

        this.setState({
          dataSource: this.getDataSource([]),
          isLoading: false,
        });
      })
      .then((responseData) => {
        LOADING[query] = false;
        resultsCache.dataForQuery[query] = responseData.shots;
        resultsCache.nextPageNumberForQuery[query] = 2;

        this.setState({
          isLoading: false,
          dataSource: this.getDataSource(responseData.shots),
        });
      })
      .done();
  },

  hasMore: function(): boolean {
    var query = this.state.filter;
    if (!resultsCache.dataForQuery[query]) {
      return true;
    }
    return (
      resultsCache.totalForQuery[query] !==
      resultsCache.dataForQuery[query].length
    );
  },

  onEndReached: function() {
    var query = this.state.filter;
    if (!this.hasMore() || this.state.isLoadingTail) {
      // We're already fetching or have all the elements so noop
      return;
    }

    if (LOADING[query]) {
      return;
    }

    LOADING[query] = true;
    this.setState({
      queryNumber: this.state.queryNumber + 1,
      isLoadingTail: true,
    });

    var page = resultsCache.nextPageNumberForQuery[query];
    fetch(api.getShotsByType(query, page))
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);
        LOADING[query] = false;
        this.setState({
          isLoadingTail: false,
        });
      })
      .then((responseData) => {
        var shotsForQuery = resultsCache.dataForQuery[query].slice();

        LOADING[query] = false;
        // We reached the end of the list before the expected number of results
        if (!responseData.shots) {
          resultsCache.totalForQuery[query] = shotsForQuery.length;
        } else {
          for (var i in responseData.shots) {
            shotsForQuery.push(responseData.shots[i]);
          }
          resultsCache.dataForQuery[query] = shotsForQuery;
          resultsCache.nextPageNumberForQuery[query] += 1;
        }

        this.setState({
          isLoadingTail: false,
          dataSource: this.getDataSource(resultsCache.dataForQuery[query]),
        });
      })
      .done();
  },

  getDataSource: function(shots: Array<any>): ListView.DataSource {
    return this.state.dataSource.cloneWithRows(shots);
  },

  selectShot: function(shot: Object) {
    this.props.navigator.push({
      component: ShotDetails,
      passProps: {shot},
      title: shot.title
    });
  },

  renderFooter: function() {
    if (!this.hasMore() || !this.state.isLoadingTail) {
      return <View style={styles.scrollSpinner} />;
    }
    return <ActivityIndicatorIOS style={styles.scrollSpinner} />;
  },

  renderRow: function(shot: Object)  {
    return (
      <ShotCell
        onSelect={() => this.selectShot(shot)}
        shot={shot}
      />
    );
  },

  render: function() {
    var content = this.state.dataSource.getRowCount() === 0 ?
      <Loading/> :
      <ListView
        ref="listview"
        dataSource={this.state.dataSource}
        renderFooter={this.renderFooter}
        renderRow={this.renderRow}
        onEndReached={this.onEndReached}
        automaticallyAdjustContentInsets={false}
        keyboardDismissMode="onDrag"
        keyboardShouldPersistTaps={true}
        showsVerticalScrollIndicator={false}
      />;

    return (
      <View style={styles.container}>
        <View style={styles.separator} />
        {content}
      </View>
    );
  },
});

var Loading = React.createClass({
  render: function() {
    return (
      <View style={[styles.container, styles.centerText]}>
        <ActivityIndicatorIOS
            animating={this.props.isLoading}
            style={styles.spinner}
          />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centerText: {
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#eeeeee',
  },
  spinner: {
    width: 50,
  },
  scrollSpinner: {
    marginVertical: 20,
  },
});

module.exports = ShotList;
