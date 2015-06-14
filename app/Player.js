'use strict';

var React = require('react-native');
var {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Component
} = React;

var Icon = require('FontAwesome'),
    getImage = require('./helpers/getImage'),
    screen = require('Dimensions').get('window'),
    ParallaxView = require('react-native-parallax-view'),
    Modal = require('react-native-modal');


var Player = React.createClass({
  getInitialState: function() {
    return {
      isModalOpen: false
    }
  },

  openModal: function() {
    this.setState({
      isModalOpen: true
    });
  },

  closeModal: function() {
    this.setState({
      isModalOpen: false
    });
  },

  render: function() {
    return (
      <ParallaxView
      backgroundSource={getImage.authorAvatar(this.props.player)}
      blur={'dark'}
      windowHeight={160}
      header={(
        <TouchableOpacity onPress={this.openModal}>
          <View style={styles.headerContent}>
            <View style={styles.innerHeaderContent}>
              <Image source={getImage.authorAvatar(this.props.player)}
              style={styles.playerAvatar} />
              <Text style={styles.playerUsername}>{this.props.player.username}</Text>
              <Text style={styles.playerName}>{this.props.player.name}</Text>
              <View style={styles.playerDetailsRow}>
                <View style={styles.playerCounter}>
                  <Text style={styles.playerCounterText}>Followers</Text>
                  <Text style={styles.playerCounterValue}> {this.props.player.followers_count} </Text>
                </View>
                <View style={styles.playerCounter}>
                  <Text style={styles.playerCounterText}>Shots</Text>
                  <Text style={styles.playerCounterValue}> {this.props.player.shots_count} </Text>
                </View>
                <View style={styles.playerCounter}>
                  <Text style={styles.playerCounterText}>Likes</Text>
                  <Text style={styles.playerCounterValue}> {this.props.player.likes_count} </Text>
                </View>
                <View style={styles.playerCounter}>
                  <Text style={styles.playerCounterText}>Comments</Text>
                  <Text style={styles.playerCounterValue}> {this.props.player.comments_count} </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
      >
        <View style={styles.playerContent}>
          <Text>Add more details about {this.props.player.name}</Text>
        </View>

        <Modal isVisible={this.state.isModalOpen}
               onClose={this.closeModal}
               backdropType="blur"
               backdropBlur="dark"
               forceToFront={true}
               customShowHandler={this._showModalTransition}
               customHideHandler={this._hideModalTransition}
               onPressBackdrop={this.closeModal}>
          <Image source={getImage.authorAvatar(this.props.player)}
                 style={styles.playerImageModal}
                 resizeMode="contain"/>
        </Modal>
      </ParallaxView>
    );
  },
  _showModalTransition: function(transition) {
    transition('opacity', {
      duration: 200,
      begin: 0,
      end: 1
    });
    transition('height', {
      duration: 200,
      begin: - screen.height * 2,
      end: screen.height
    });
  },

  _hideModalTransition: function(transition) {
    transition('height', {
      duration: 200,
      begin: screen.height,
      end: screen.height * 2,
      reset: true
    });
    transition('opacity', {
      duration: 200,
      begin: 1,
      end: 0
    });
  },
});
var styles = StyleSheet.create({
  headerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  innerHeaderContent: {
    // Remove NavigatorHeight
    marginTop: -64,
    alignItems: 'center'
  },
  playerInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  playerUsername: {
    color: '#fff',
    fontWeight: '300'
  },
  playerName: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '900',
    lineHeight: 18
  },
  //Player details list
  playerDetailsRow: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: screen.width / 2,
    marginTop: 20
  },
  playerCounter: {
    flex: 1,
    alignItems: 'center'
  },
  playerCounterText: {
    color: '#fff',
    fontSize: 10,
    justifyContent: 'space-between'
  },
  playerCounterValue: {
    color: '#fff',
    fontWeight: '900'
  },
  playerAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 10
  },
  //Modal
  playerImageModal: {
    height: screen.height / 3
  },
  //playerContent
  playerContent: {
    padding: 20
  }
});

module.exports = Player;
