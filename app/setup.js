
/*
  Created by Uncle Charlie 2016/11/15

  @flow
*/
import React from 'react'
import { View, Text, } from 'react-native'
import { Provider } from 'react-redux'
import DribbbleApp from './DribbbleApp'
import configureStore from './store/configStore'

export default function setup(): ReactClass<{}> {
  console.log('>>>setup')
  console.disableYellowBox = true

  class Root extends React.Component {
    state: {isLoading: boolean, store: any}

    constructor() {
      super()
      this.state = {
        isLoading: true,
        store: configureStore(() => this.setState({isLoading: false}))
      }
    }
    render() {
      if (this.state.isLoading) {
        return null;
      }
      console.log(`===>render root component`)
      return (
        <Provider store={this.state.store}>
          <DribbbleApp />
        </Provider>
      );
    }
  }

  return Root
}

global.LOG = (...args) => {
  console.log('/------------------------------\\');
  console.log(...args);
  console.log('\\------------------------------/');
  return args[args.length - 1];
}

// export default {setup}
