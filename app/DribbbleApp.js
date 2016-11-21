/**
 * Dribbble App
 * Github url: https://github.com/future-challenger/react-native-dribbble-app
 * @flow
 */

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  View,
  Image,
  Text,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

import { connect } from 'react-redux'

import ShotList from "./app/ShotList";
import Icon from "react-native-vector-icons/FontAwesome";

import Tabs from './app/lib/TabCore';
import DemoList from './app/test/demoList';
// import DemoLayoutAnimation from './app/tutorial/DemoLayoutAnimation';
import TutorialList from './app/tutorial/TutorialList';

const THEME_COLOR = '#ea4c89';

const mapStateToProps = (state) => {
  selectedTab: 'all',
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch, //explicit map
  }
}

export default class DribbbleApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedTab: "all"
    };

    this.initialRoute = {
			title: '',
			component: null,
			index: 0,
			passProps: {

			}
		}

    //bind
    this._renderContent = this._renderContent.bind(this);
    this._renderScene = this._renderScene.bind(this);
  }

  _renderScene(route: Route, navigator: Navigator) {
    console.log(`###render scene in nav route: ${route.title}`);
  	if (route.component) {
  		return React.createElement(route.component
  			, {...this.props, ...route.passProps, navigator, route});
  	}
  }

  _renderContent(category: string, title: ?string, comp: ?Object) {
    console.log(`#####Navigation content view rendered cate: ${category} title: ${title}`);

    let component = !comp ? DemoList : comp;
    category = category == 'all' ? 'default' : category;

    let route = Object.assign({}, this.initialRoute);
    route.title = title;
    route.component = component
    route.passProps = {filter: category};

    console.log(`#####component is ${route.component.name}`);

    return (
      <Navigator
        style={styles.wrapper}
        initialRoute={route}
        renderScene={(route, navigator) => {
          if (route.component) {
            return React.createElement(route.component
              , {...this.props, ...route.passProps, navigator, route});
          }
        }}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={{backgroundColor: 'white', opacity: 0.8}} />
        }
      />
    );
  }

  render() {
    return (
      <Tabs
        navigatorType='universal'
        tintColor={THEME_COLOR}
        selected={this.state.selectedTab}
        style={{backgroundColor: 'white'}}
        pressOpacity={1}>

        <Tabs.Item
          icon={require('./img/dribbble.png')}
          title='All'
          selected={this.state.selectedTab === 'all'}
          onPress={() => {
            this.setState({selectedTab: 'all'});
          }}>
          {/* {this._renderContent("all", "All")} */}
          <Navigator
            style={styles.wrapper}
            initialRoute={{
              title: 'All',
        			component: DemoList,
        			index: 0,
        			passProps: {
                filter: 'default'
        			}
            }}
            renderScene={(route, navigator) => {
              if (route.component) {
            		return React.createElement(route.component
            			, {...this.props, ...route.passProps, navigator, route});
            	}
            }}
            navigationBar={
              <Navigator.NavigationBar
                routeMapper={NavigationBarRouteMapper}
                style={{backgroundColor: 'white', opacity: 0.8}} />
            }
          />
        </Tabs.Item>
        <Tabs.Item
          icon={require('./img/trophy.png')}
          title='Debuts'
          selected={this.state.selectedTab === 'debuts'}
          onPress={() => {
            this.setState({selectedTab: 'debuts'});
          }}>
          {/* {this._renderContent("debuts", "Debuts")} */}
          <Navigator
            style={styles.wrapper}
            initialRoute={{
              title: 'Debuts',
        			component: DemoList,
        			index: 0,
        			passProps: {
                filter: 'debuts'
        			}
            }}
            renderScene={(route, navigator) => {
              if (route.component) {
            		return React.createElement(route.component
            			, {...this.props, ...route.passProps, navigator, route});
            	}
            }}
            navigationBar={
              <Navigator.NavigationBar
                routeMapper={NavigationBarRouteMapper}
                style={{backgroundColor: 'white', opacity: 0.8}} />
            }
          />
        </Tabs.Item>
        <Tabs.Item
          icon={require('./img/heart.png')}
          title='Animated'
          selected={this.state.selectedTab === 'animated'}
          onPress={() => {
            this.setState({selectedTab: 'animated'});
          }}>
          {/* {this._renderContent("animated", "Animated")} */}
          <Navigator
            style={styles.wrapper}
            initialRoute={{
              title: 'Animated',
        			component: DemoList,
        			index: 0,
        			passProps: {
                filter: 'animated'
        			}
            }}
            renderScene={(route, navigator) => {
              if (route.component) {
            		return React.createElement(route.component
            			, {...this.props, ...route.passProps, navigator, route});
            	}
            }}
            navigationBar={
              <Navigator.NavigationBar
                routeMapper={NavigationBarRouteMapper}
                style={{backgroundColor: 'white', opacity: 0.8}} />
            }
          />
        </Tabs.Item>
        <Tabs.Item
          icon={require('./img/light.png')}
          title='Rebounds'
          selected={this.state.selectedTab === 'rebounds'}
          onPress={() => {
            this.setState({selectedTab: 'rebounds'});
          }}>
          {/* {this._renderContent("rebounds", "Rebounds")} */}
          <Navigator
            style={styles.wrapper}
            initialRoute={{
              title: 'Rebounds',
        			component: DemoList,
        			index: 0,
        			passProps: {
                filter: 'rebounds'
        			}
            }}
            renderScene={(route, navigator) => {
              if (route.component) {
            		return React.createElement(route.component
            			, {...this.props, ...route.passProps, navigator, route});
            	}
            }}
            navigationBar={
              <Navigator.NavigationBar
                routeMapper={NavigationBarRouteMapper}
                style={{backgroundColor: 'white', opacity: 0.8}} />
            }
          />
        </Tabs.Item>
      </Tabs>
    );
  }
};

var NavigationBarRouteMapper = {
	LeftButton(route, navigator, index, navState) {
		if (index > 0) {
			return (
        <View style={{flex: 1, justifyContent:'center', marginLeft: 10}}>
  				<TouchableOpacity style={{  }} onPress={() => {
    				if (index > 0) {
    						navigator.pop();
    					}
    				}}>
  					<Image
              source={require('./img/back_arrow.png')}
              style={{width: 8, height: 15, tintColor: THEME_COLOR}}
              resizeMode='stretch' />
  				</TouchableOpacity>
        </View>
			)
		} else {
			return null
		}
	},

	RightButton(route, navigator, index, navState) {
		return null;
	},

	Title(route, navigator, index, navState) {
		return (
			<TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}>
				<Text style={{ color: THEME_COLOR, margin: 10, fontSize: 16 }}>
					{route.title}
        </Text>
			</TouchableOpacity>
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
  },

  navBar: {
    borderBottomColor: '#48209A',
    borderBottomWidth: 1
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DribbbleApp)
