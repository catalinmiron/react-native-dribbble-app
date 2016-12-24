import {
  Platform
} from 'react-native'

export type Notification = {
  id: string,
  url: ?string,
  text: string,
  time: number,
}

export type SeenNotifications = {
  [id: string]: boolean;
}

type State = {
  enabled: ?boolean,
  registered: boolean,
  server: Array<Notification>,
  push: Array<Notification>,
  seen: SeenNotifications,
}

const initialState = {
  server: [],
  push: [],
  enabled: Platform.OS === 'ios' ? null : true,
  registered: false,
  seen: {},
}

export default function notifications(state: State = initialState, action): State {
  switch(action.type) {
    case 'LOADED_NOTIFICATION':
      let list = action.list.map((rawObj) => ({
        id:rawObj.id,
        text: rawObj.text,
        url: rawObj.url,
        time: rawObj.time
      }))
      return {...state, server: list}
    case 'RECEIVED_PUSH_NOTIFICATION':
      return {...state, push: append(action.notification, state.push)}
    case 'TURNED_ON_PUSH_NOTIFICATION':
      return {...state, enabled: true}
    case 'SKIPPED_PUSH_NOTIFICATION':
      return {...state, enabled: false}
    case 'REGISTERED_PUSH_NOTIFICATION':
      return {...state, registered:true}
    case 'RESET_NUXES':
      return {...state, enabled: initialState.enabled}
    case 'SEEN_ALL_NOTIFICATIONS':
      return {...state, seen: fetchAllIds([...state.server, ...state.push])}
    default:
      return initialState
  }
}

function append(notification, list) {
  const id = notification.id
  if(list.find(n => n.id === id)) {
    return list
  }
  return [{id, ...notification}, ...list]
}

function findAllIds(notifs: Array<Notification>): SeenNotifications {
  const seen = {}
  notifs.forEach((notifications) => {
    seen[notification.id] = true
  })
  return seen
}
