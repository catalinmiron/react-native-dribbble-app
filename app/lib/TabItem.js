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
 * @providesModule TabItem
 * @flow-weak
 */

import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native';

type Props = {
  title: string,
  icon: any,
  selectedIcon: ?any,
  selected: boolean,
  tintColor: string,
  defaultTintColor: string,
  onPress: ?() => void,
  onSelect: () => void,
};

const TAB_IMG_SIZE = 28;

export default class TabItem extends React.Component {
  state: any;
  props: Props;
  _renderContent: () => ReactElement<*>;

  constructor(props) {
    super(props);

    this.state = {

    };

    this._renderContent = this._renderContent.bind(this);
  }

  _renderContent() {
    let selected = this.props.selected;
    let tintStyle = {};
    let source = this.props.icon;

    if(selected) {
      // check if selected icon is configed.
      this.props.selectedIcon;
      if(!source) {
        source = this.props.icon;
      }
      // tint color for image
      tintStyle.tintColor = this.props.tintColor;

      return (
        <View style={{alignItems: 'center', justifyContent: 'center', padding: 5}}>
          <Image
            style={[tintStyle, styles.icon]}
            source={source}
            resizeMode={Image.resizeMode.stretch}
          />
          <Text style={[styles.text, {color: this.props.tintColor}]}>
            {this.props.title}
          </Text>
        </View>
      );
    } else {
      tintStyle.tintColor = this.props.defaultTintColor;
      return (
        <View style={{alignItems: 'center', justifyContent: 'center', padding: 5}}>
          <Image source={source}
            style={[tintStyle, styles.icon]}
            resizeMode={Image.resizeMode.stretch} />
          <Text style={[styles.text, {color: this.props.defaultTintColor}]}>
            {this.props.title}
          </Text>
        </View>
      );
    }
  }

  render() {
    return (
      this._renderContent()
    );
  }
}

TabItem.propTypes = {
  title: React.PropTypes.string.isRequired,
  icon: React.PropTypes.any.isRequired,
  defaultTintColor: React.PropTypes.string.isRequired,

};

TabItem.defaultProps = {
  defaultTintColor: '#808080'
};

var styles = StyleSheet.create({
  icon: {
    width: TAB_IMG_SIZE,
    height: TAB_IMG_SIZE
  },
  text: {
    fontSize: 10,
    marginTop: 3
  }
});

/*
{/* <Image source={itemSelected ? this.props.selectedIcon : this.props.icon} />
<Text style={itemSelected ? {color: 'blue'}: {color: 'black'}}>{this.props.title}</Text> *
/}
*/
