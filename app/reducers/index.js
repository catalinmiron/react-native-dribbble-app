/*
  Created by Uncle Charlie, 2016/11/28

  @flow
*/
import { combineReducers } from 'redux'
import notifications from './notifications'
import navigation from './navigation'

export default {
  notifications: notifications,
  navigation: navigation
}
