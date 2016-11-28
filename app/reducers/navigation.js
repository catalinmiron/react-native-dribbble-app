/*
  Created by Uncle Charlie, 2016/11/28

  @flow
*/

export type Tab = 'All'
  | 'Debuts'
  | 'Animated'
  | 'Rebounds'

type State = {
  tab: Tab,
}

const initialState = {
  tab: 'All'
}

export default function navigation(state: State = initialState, action): State {
  switch(action.type) {
    case 'SWITCH_TAB'
      return { ...state, tab: action.tab }
    default:
      return initialState
  }
}
