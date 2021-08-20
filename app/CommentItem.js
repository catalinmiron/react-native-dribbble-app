"use strict";
import React, {
  Component,
  Image,
  StyleSheet,
  PixelRatio,
  Text,
  TouchableHighlight,
  View,
  Dimensions
} from 'react-native';

import * as getImage from './helpers/getImage';
import { Icon } from 'react-native-vector-icons/FontAwesome';
import HTML from 'react-native-htmlview';
const screen = Dimensions.get('window');

export default class CommentItem extends Component {
  constructor(props) {
    super(props);
  }//constructor

  render() {
    return (
      <View>
        <TouchableHighlight
          onPress={this.props.onSelect.bind(this, this.props.comment)}
          underlayColor={"#f3f3f3"}>
          <View>
            <View style={styles.commentContent}>
                <Image source={getImage.authorAvatar(this.props.comment.user)}
                       style={styles.avatar}/>
              <View style={styles.commentBody}>
                <Text style={styles.userName}>
                  {this.props.comment.user.name}
                </Text>
                <Text style={styles.commentText}>
                  <HTML value={this.props.comment.body} />
                </Text>
              </View>
            </View>
            <View style={styles.cellBorder} />
          </View>
        </TouchableHighlight>
      </View>
    )//return
  }//render
}//class
CommentItem.propTypes = {comments: React.PropTypes.array.isRequired};
CommentItem.defaultProps = {comments: []};

const styles = StyleSheet.create({
  commentContent: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start"
  },
  userName: {
    fontWeight: "700"
  },
  commentBody: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  commentText: {
    flex: 1,
    flexDirection: "row"
  },
  cellBorder: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    // Trick to get the thinest line the device can display
    height: 1 / PixelRatio.get(),
    marginLeft: 4,
  },
  avatar: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginRight: 10
  }
});
