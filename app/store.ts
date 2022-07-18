import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from '@/features/counter/counterSlice'
import { userReducer } from '@/features/auth/user-slice'
import { sessionTimeoutTimerReducer } from '@/features/auth/session-timeout-timer-slice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,

    user: userReducer,
    sessionTimeoutTimer: sessionTimeoutTimerReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
