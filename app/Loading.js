import React from 'react';
import {
  ActivityIndicatorIOS,
  StyleSheet,
  View,
} from 'react-native';

export default class Loading extends React.Component {
  render() {
    return (
      <View style={[styles.container, styles.centerText]}>
        <ActivityIndicatorIOS
            animating={this.props.isLoading}
            style={styles.spinner}
          />
      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "center",
  },
  centerText: {
    alignItems: "center",
  },
  spinner: {
    width: 50,
  }
});
