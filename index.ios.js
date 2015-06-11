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


var ShotList = require('./app/ShotList'),
    Icon = require('FontAwesome');

var DribbbleApp = React.createClass({
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
        <Icon.TabBarItem
          title="Popular"
          iconName="heart"
          selectedIconName="heart"
          selected={this.state.selectedTab === 'popular'}
          onPress={() => {
            this.setState({
              selectedTab: 'popular',
            });
          }}>
          {this._renderContent('popular')}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="Debuts"
          iconName="trophy"
          selectedIconName="trophy"
          selected={this.state.selectedTab === 'debuts'}
          onPress={() => {
            this.setState({
              selectedTab: 'debuts',
            });
          }}>
          {this._renderContent('debuts')}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="Everyone"
          iconName="dribbble"
          selectedIconName="dribbble"
          selected={this.state.selectedTab === 'everyone'}
          onPress={() => {
            this.setState({
              selectedTab: 'everyone',
            });
          }}>
          {this._renderContent('everyone')}
        </Icon.TabBarItem>
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
