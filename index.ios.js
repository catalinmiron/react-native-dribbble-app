/**
 * Dribbble App
 * Github url: https://github.com/future-challenger/react-native-dribbble-app
 * @flow
 */

import React from 'react';
import {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  TabBarIOS,
  View,
  Text
} from 'react-native';

import ShotList from "./app/ShotList";
import Icon from "react-native-vector-icons/FontAwesome";

import DemoList from './app/test/demoList';
// import DemoLayoutAnimation from './app/tutorial/DemoLayoutAnimation';
import TutorialList from './app/tutorial/TutorialList';

export default class DribbbleApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: "default"
        };

        //bind
        this._renderContent = this._renderContent.bind(this);
    }

  _renderContent(category: string, title: ?string, comp: ?Object) {
    let componnet = !comp ? DemoList : comp;
    return (
      <NavigatorIOS style={styles.wrapper}
        initialRoute={{
          // component: ShotList,
          component: componnet,
          title: title,
          passProps: {filter: category}
        }}
      />
    );
  }

  render() {
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
        <Icon.TabBarItem
          title="Tutorials"
          iconName="lightbulb-o"
          selectedIconName="lightbulb-o"
          selected={this.state.selectedTab === "tutorials"}
          onPress={() => {
            this.setState({
              selectedTab: "tutorials",
            });
          }}>
          {this._renderContent("tutorials", "Tutorials", TutorialList)}
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }
};

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
