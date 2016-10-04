/*

  @flow
*/

import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicatorIOS,
  ListView,
  Dimensions,
  Modal
} from 'react-native';

import Icon from "react-native-vector-icons/FontAwesome";
import getImage from "./helpers/getImage";
import HTML from "react-native-htmlview";
import ParallaxView from "react-native-parallax-view";
import api from "./helpers/api";
import ShotDetails from "./ShotDetails";
import ShotCell from "./ShotCell";
import Loading from "./Loading";

const screen = Dimensions.get('window');

export default class Player extends Component {
    constructor(props) {
        super(props);

        //bind
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.renderShots = this.renderShots.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.selectShot = this.selectShot.bind(this);
    }

  componentWillMount() {
    api.getResources(this.props.player.shots_url).then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData),
        isLoading: false
      });
    }).done();
  }

  openModal() {
    this.setState({
      isModalOpen: true
    });
  }

  closeModal() {
    this.setState({
      isModalOpen: false
    });
  }

  render() {
    return (
      <ParallaxView
      windowHeight={260}
      backgroundSource={getImage.authorAvatar(this.props.player)}
      blur={"dark"}
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
                  <Icon name="users" size={18} color="#fff"/>
                  <Text style={styles.playerCounterValue}> {this.props.player.followers_count} </Text>
                </View>
                <View style={styles.playerCounter}>
                  <Icon name="camera-retro" size={18} color="#fff"/>
                  <Text style={styles.playerCounterValue}> {this.props.player.shots_count} </Text>
                </View>
                <View style={styles.playerCounter}>
                  <Icon name="heart-o" size={18} color="#fff"/>
                  <Text style={styles.playerCounterValue}> {this.props.player.likes_count} </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
      >
      <View style={styles.shotList}>
        {this.state.dataSource.length !== 0 ? this.renderShots() : <Loading />}
      </View>
        <Modal visible={this.state.isModalOpen}
          onDismiss={this.closeModal}>
          <Image source={getImage.authorAvatar(this.props.player)}
                 style={styles.playerImageModal}/>
        </Modal>
      </ParallaxView>
    );
  }

  renderShots() {
    return <ListView
      ref="playerShots"
      renderRow={this.renderRow}
      dataSource={this.state.dataSource}
      automaticallyAdjustContentInsets={false}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps={true}
      showsVerticalScrollIndicator={false}
    />;
  }

  renderRow(shot: Object)  {
    return <ShotCell
      onSelect={() => this.selectShot(shot)}
      shot={shot}
    />;
  }

  selectShot(shot: Object) {
    console.log(shot);
    debugger;
    this.props.navigator.push({
      component: ShotDetails,
      passProps: {shot},
      title: shot.title
    });
  }
};

Player.defaultProps = {
    isModalOpen: false,
    isLoading: true,
    dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
    })
};

var styles = StyleSheet.create({
  listStyle: {
    flex: 1,
    backgroundColor: "red"
  },
  listView: {
    flex: 1,
    backgroundColor: "coral"
  },
  spinner: {
    width: 50,
  },
  headerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  innerHeaderContent: {
    marginTop: 30,
    alignItems: "center"
  },
  playerInfo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    flexDirection: "row"
  },
  playerUsername: {
    color: "#fff",
    fontWeight: "300"
  },
  playerName: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "900",
    lineHeight: 18
  },
  //Player details list
  playerDetailsRow: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: screen.width / 2,
    marginTop: 20
  },
  playerCounter: {
    flex: 1,
    alignItems: "center"
  },
  playerCounterValue: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 14,
    marginTop: 5,
  },
  playerAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#fff",
    marginBottom: 10
  },
  //Modal
  playerImageModal: {
    height: screen.height / 3,
    resizeMode: "contain"
  },
  //playerContent
  playerContent: {
    padding: 20
  }
});
