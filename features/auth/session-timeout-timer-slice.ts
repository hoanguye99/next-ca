import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'

export interface TimerState {
  sessionTimeoutTimer: null | NodeJS.Timeout
}

const initialState: TimerState = {
  sessionTimeoutTimer: null,
}

export const sessionTimeoutTimerSlice = createSlice({
  name: 'sessionTimeoutTimer',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setTimer: (state: TimerState, action: PayloadAction<NodeJS.Timeout>) => {
      state.sessionTimeoutTimer = action.payload
    },
    clearTimer: (state: TimerState) => {
      if (state.sessionTimeoutTimer !== null) {
        clearTimeout(state.sessionTimeoutTimer)
      }
      state.sessionTimeoutTimer = null
    },
  },
})

export const { setTimer, clearTimer } = sessionTimeoutTimerSlice.actions

export const selectSessionTimeoutTimer = (state: RootState) =>
  state.sessionTimeoutTimer.sessionTimeoutTimer

export const sessionTimeoutTimerReducer = sessionTimeoutTimerSlice.reducer
