var React = require("react-native");
var {
  ActivityIndicatorIOS,
  StyleSheet,
  View,
} = React;

var Loading = React.createClass({
  render: function() {
    return (
      <View style={[styles.container, styles.centerText]}>
        <ActivityIndicatorIOS
            animating={this.props.isLoading}
            style={styles.spinner}
          />
      </View>
    );
  }
});

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

module.exports = Loading;
