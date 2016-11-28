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

function Notifications(state: State = initialState, action): State {
  switch(action.type) {
    case 'LOADED_NOTIFICATION':
      let list = action.list.map((rawObj) => ({
        id:rawObj.id,
        text: rawObj.text,
        url: rawObj.url,
        time: rawObj.time
      }))
      return {...state, server: list}
    default:
      return initialState
  }
}
