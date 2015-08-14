/**
 * Dribbble App
 * Github url: https://github.com/catalinmiron/react-native-dribbble-app
 */
"use strict";

var React = require("react-native");
var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  TabBarIOS,
  View,
  Text
} = React;

var ShotList = require("./app/ShotList"),
    Icon = require("react-native-vector-icons/FontAwesome");

var DribbbleApp = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: "default"
    };
  },

  _renderContent: function(category: string, title: ?string) {
    return (
      <NavigatorIOS style={styles.wrapper}
        initialRoute={{
          component: ShotList,
          title: title,
          passProps: {filter: category}
        }}
      />
    );
  },

  render: function() {
    return (
      <TabBarIOS tintColor={"#ea4c89"}>
        <Icon.TabBarItem
          title="All"
          iconName="dribbble"
          selectedIconName="dribbble"
          selected={this.state.selectedTab === "default"}
          onPress={() => {
            this.setState({
              selectedTab: "default",
            });
          }}>
          {this._renderContent("default", "All")}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="Debuts"
          iconName="trophy"
          selectedIconName="trophy"
          selected={this.state.selectedTab === "debuts"}
          onPress={() => {
            this.setState({
              selectedTab: "debuts",
            });
          }}>
          {this._renderContent("debuts", "Debuts")}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="Animated"
          iconName="heart"
          selectedIconName="heart"
          selected={this.state.selectedTab === "animated"}
          onPress={() => {
            this.setState({
              selectedTab: "animated",
            });
          }}>
          {this._renderContent("animated", "Animated")}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="Rebounds"
          iconName="lightbulb-o"
          selectedIconName="lightbulb-o"
          selected={this.state.selectedTab === "rebounds"}
          onPress={() => {
            this.setState({
              selectedTab: "rebounds",
            });
          }}>
          {this._renderContent("rebounds", "Rebounds")}
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }
});

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: "center",
  },
  tabText: {
    color: "white",
    margin: 50,
  },
  wrapper: {
    flex: 1
  }
});

AppRegistry.registerComponent("DribbbleApp", () => DribbbleApp);

module.exports = DribbbleApp;
