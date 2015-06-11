/**
 * Dribbble App
 * TODO: add github link here
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  TabBarIOS,
  View,
  Text
} = React;


var ShotList = require('./app/ShotList');

var DribbbleApp = React.createClass({
  statics: {
    title: '<TabBarIOS>',
    description: 'Tab-based navigation.'
  },

  getInitialState: function() {
    return {
      selectedTab: 'popular'
    };
  },

  _renderContent: function(category: string) {
    return (
      <NavigatorIOS style={styles.wrapper}
        initialRoute={{
          component: ShotList,
          title: category,
          passProps: {filter: category}
        }}
      />
    );
  },

  render: function() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="Popular"
          selected={this.state.selectedTab === 'popular'}
          onPress={() => {
            this.setState({
              selectedTab: 'popular',
            });
          }}>
          {this._renderContent('popular')}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Debuts"
          selected={this.state.selectedTab === 'debuts'}
          onPress={() => {
            this.setState({
              selectedTab: 'debuts'
            });
          }}>
          {this._renderContent('debuts')}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Everyone"
          selected={this.state.selectedTab === 'everyone'}
          onPress={() => {
            this.setState({
              selectedTab: 'everyone',
            });
          }}>
          {this._renderContent('everyone')}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
});

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
  wrapper: {
    flex: 1
  }
});

AppRegistry.registerComponent('DribbbleApp', () => DribbbleApp);

module.exports = DribbbleApp;
