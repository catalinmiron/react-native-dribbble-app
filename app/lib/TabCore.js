/**
 * The examples provided by Uncle Charlie are for non-commercial testing and
 * evaluation purposes only.
 *
 * Uncle Charlie reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @providesModule Tabs
 * @flow-weak
 */

import React from "react";

import {
	StyleSheet,
	View,
  Image,
	Text,
	TouchableOpacity,
	Keyboard,
	Platform,
} from "react-native";

import TabItem from './TabItem';

type State = {
	keyboardUp: boolean,
	currentTabView: ?ReactElement<*>
};

type Props = {
	style: any,
	selectedStyle: any,
	selected: string,
	iconStyle: any,
	locked: boolean,
	tintColor: string,
	defaultTintColor: string,
	onPress: ?(el: any)=>void
};

const TAB_DIC = {};

export default class Tabs extends React.Component {
	props: Props;
	state: State;

	_renderTabItem:(el: ReactElement<*>) => ReactElement<*>;
	_renderTabView: (currentTab: string) => ReactElement<*>;
	onSelect: (el: any) => void;
	keyboardWillShow: (e: any) => void;
	keyboardWillHide: (e: any) => void;

	constructor(props) {
    super(props);

    this.state = {
      keyboardUp: false,
      currentTabView: null
    };

		this.tabView = null;

		this._renderTabItem = this._renderTabItem.bind(this);
		this._renderTabView = this._renderTabView.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.keyboardWillHide = this.keyboardWillHide.bind(this);
    this.keyboardWillShow = this.keyboardWillShow.bind(this);
  }

	static get Item() {
		return TabItem;
	}

  onSelect(el: any){
    let tabContent = null;

    if (el.props.onPress) {
      tabContent = el.props.children;
      el.props.onPress(el);
    } else if (this.props.onSelect) {
      tabContent = this.props.children;
      this.props.onPress(el);
    }

    this.setState({
      currentTabView: tabContent
    });
  }

  componentWillMount(){
    if (Platform.OS === "android") {
      Keyboard.addListener("keyboardDidShow", this.keyboardWillShow);
      Keyboard.addListener("keyboardDidHide", this.keyboardWillHide);
    }

		React.Children.forEach(this.props.children, (el) => {
			TAB_DIC[el.props.title.toLowerCase()] = el.props.children;
		});
  }

  keyboardWillShow(e: any) {
  	this.setState({ keyboardUp: true });
  };

  keyboardWillHide(e: any) {
    this.setState({ keyboardUp: false });
  };

	_renderTabItem(el) {
		let element = null;
		let selectedTab = this.props.selected;

		// if(selectedTab == (el.props.name || el.key)) {
		if(el.props.selected) {
			element = React.cloneElement(el, {selected: true, style: [el.props.style, this.props.selectedStyle, el.props.selectedStyle], tintColor: this.props.tintColor ? this.props.tintColor: this.props.defaultTintColor});
		} else {
			element = React.cloneElement(el, {selfcted: false, tintColor: this.props.tintColor ? this.props.tintColor: this.props.defaultTintColor});
		}

		return element;
	}

	_renderTabView(currentTab) {
		let navs = [];
		for (let k in TAB_DIC) {
			let v = TAB_DIC[k];
			if (k != currentTab) {
				navs.push(React.cloneElement(v, {...v.props, style: {width:0, height:0}}));
			} else {
				navs.push(v);
			}
		}

		return (
			<View style={{flex: 1}}>
				{navs}
			</View>
		);
	}

  render() {
		const self = this;
		let selected = this.props.selected;
		// if (!selected){
		// 	React.Children.forEach(this.props.children.filter(c=>c), (el: any): void=>{
		// 		if (!selected || el.props.initial){
		// 				selected = el.props.name || el.key;
		// 		}
		//
		// 		console.log(el.props.selected ? 'TAB ITEM selected' : 'item not selected');
		// 	});
		// }

		let tabView = null;
		let selectedTab = this.props.selected;
		React.Children.forEach(this.props.children, (el) => {
			console.log(`title:- ${el.props.title}, ${el.props.selected}, ${!el.props.children ? 'NO View': 'View'}`);
			if(el.props.selected) {
				tabView = el.props.children;
			}
		});
		return (
      <View style={{flex: 1}}>
        {/* {this.state.currentTabView} */}
				{/* {tabView} */}
				{this._renderTabView(selectedTab)}

  			<View style={[styles.tabbarView, this.props.style, this.state.keyboardUp && styles.hidden]}>

  				{React.Children.map(this.props.children.filter(c=>c), (el)=>
  					<TouchableOpacity key={el.props.name + "touch"}
  						testID={el.props.testID}
  						style={[styles.iconView, this.props.iconStyle, (el.props.name || el.key) == selected ? this.props.selectedIconStyle || el.props.selectedIconStyle || {} : {} ]}
  						onPress={():boolean=>!self.props.locked && self.onSelect(el)}
  						onLongPress={()=>self.onSelect(el)}
  						activeOpacity={el.props.pressOpacity}>
  							{this._renderTabItem(el)}
  					</TouchableOpacity>
  				)}
  			</View>
      </View>
		);
  }
}

Tabs.defaultProps = {
	defaultTintColor: '#808080'
}

const styles = StyleSheet.create({
	tabbarView: {
		position:"absolute",
		bottom:0,
		right:0,
		left:0,
		height:50,
		opacity:1,
		backgroundColor:"transparent",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",

		flex: 1
	},
	topBorder: {
		flexDirection: 'row',
		position:"absolute",
		top: 0,
		backgroundColor: 'red',
		height: 10,
	},
	iconView: {
		flex: 1,
		height: 40,
		justifyContent: "center",
		alignItems: "center",
	},
	hidden: {
		height: 0,
	},
});
