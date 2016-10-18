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
  Text
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

    if(selected) {
      // check if selected icon is configed.
      let source = this.props.selectedIcon;
      let tintStyle = {};

      if(!source) {
        source = this.props.icon;
        tintStyle.tintColor = this.props.tintColor;
      }

      return (
        <Image
          style={tintStyle}
          source={source}
        />
        <Text style={itemSelected ? {color: 'blue'}: {color: this.props.tintColor}}>{this.props.title}</Text>
      );
    } else {
      return (
        <Image source={itemSelected ? this.props.selectedIcon : this.props.icon} />
        <Text style={itemSelected ? {color: 'blue'}: {color: 'black'}}>{this.props.title}</Text>
      );
    }
  }

  render() {
    let itemSelected = this.props.selected;

    return (
      <View style={{alignItems: 'center', justifyContent: 'center', padding: 5}}>
        {/* <Image source={itemSelected ? this.props.selectedIcon : this.props.icon} />
        <Text style={itemSelected ? {color: 'blue'}: {color: 'black'}}>{this.props.title}</Text> */}
        {this._renderContent()}
      </View>
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
