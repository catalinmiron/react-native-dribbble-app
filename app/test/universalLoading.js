import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View
} from 'react-native';

export const LOADING_TYPE = {
  Default: 0,
  Gray: 1,
  CustomColor: 2,
  Large: 3,
  LargeCustomColor: 4,
  CustomSize: 5,
};

export default class UNLoading extends React.Component {
  _renderDefault() {
    return (
      <ActivityIndicator
        animating={true}
        style={[styles.centering]}
        color="#cccccc"
      />
    );
  }

  _renderGray() {
    return (
        <ActivityIndicator animating={true}
          style={[styles.centering, {backgroundColor: '#eeeeee'}]}
        />
    );
  }

  //@TODO: refactor this function to make it configurable
  _renderCustomColor() {
    return (
        <ActivityIndicator animating={true} color="#0000ff" />
    );
  }

  _renderLarge() {
    return (
      <ActivityIndicator animating={true}
        style={[styles.centering]}
        size="large"
        color="#cccccc"
      />
    );
  }

  _renderLargeCustomColor() {
    return (
        <ActivityIndicator animating={true}
          size="large"
          color="#0000ff"
        />
    );
  }

  _renderCustomSize() {
    return (
      <ActivityIndicator
        animating={true}
        style={[styles.centering, {transform: [{scale: 1.5}]}]}
        size="large"
      />
    );
  }

  _renderIndicator(loadingType) {
    switch (loadingType) {
      case LOADING_TYPE.Default:
        return this._renderDefault.call(this);
      case LOADING_TYPE.Gray:
        return this._renderGray.call(this);
      case LOADING_TYPE.CustomColor:
        return this._renderCustomColor.call(this);
      case LOADING_TYPE.Large:
        return this._renderLarge.call(this);
      case LOADING_TYPE.LargeCustomColor:
        return this._renderLargeCustomColor.call(this);
      case LOADING_TYPE.CustomSize:
        return this._renderCustomSize.call(this);
      default:
        console.warn("You setting of ActivityIndicator is invalid!");
        return this._renderDefault.call(this);
    };
  }

  render() {
    let loadingType = this.props.loadingType;

    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
        {
          this._renderIndicator.call(this, loadingType)
        }
      </View>
    );

  }
};

const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  gray: {
    backgroundColor: '#cccccc',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
  },
});
