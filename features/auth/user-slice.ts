import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import loginApi from '@/api/login-api'
import { RootState } from '@/app/store'
import axios from 'axios'
import { LoginError } from '@/models/api'
import { LoginState, LoginType, UserDetail } from '@/models/features'

const initialState: LoginState = {
  loggedIn:
    typeof window !== 'undefined' && localStorage.getItem('nextca-userInfo')
      ? true
      : false,
  userDetail:
    typeof window !== 'undefined' && localStorage.getItem('nextca-userInfo')
      ? (JSON.parse(localStorage.getItem('nextca-userInfo')!) as UserDetail) // eslint-disable-line
      : {
          accessToken: '',
          refreshToken: '',
          role: 'ANONYMOUS',
          emailAddress: '',
          name: '',
          displayName: '',
          JSESSIONID: '',
          key: '',
        },
  status: 'idle',
  failureDescription: '',
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const loginAsync = createAsyncThunk(
  'user/loginAsync',
  async (data: LoginType, { rejectWithValue }) => {
    try {
      const response = await loginApi.login(data)
      typeof window !== 'undefined' &&
        localStorage.setItem('nextca-userInfo', JSON.stringify(response))
      return response
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          throw error
        }

        return rejectWithValue(error.response.data)
      } else {
        // do something else
        // or creating a new error
        throw new Error('different error than axios')
      }
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: handleLogoutAction,
    refreshToken: (state: LoginState, action: PayloadAction<string>) => {
      state.userDetail.accessToken = action.payload
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state: LoginState) => {
        state.status = 'loading'
      })
      .addCase(loginAsync.fulfilled, (state: LoginState, action) => {
        return {
          loggedIn: true,
          userDetail: {
            ...action.payload,
          },
          status: 'idle',
          failureDescription: '',
        }
      })
      .addCase(loginAsync.rejected, (state: LoginState, action) => {
        return {
          loggedIn: false,
          status: 'failed',
          userDetail: {
            accessToken: '',
            refreshToken: '',
            role: 'ANONYMOUS',
            emailAddress: '',
            name: '',
            displayName: '',
            JSESSIONID: '',
            key: '',
          },
          failureDescription: (action.payload as LoginError).description,
        }
      })
  },
})

function handleLogoutAction(state: LoginState) {
  typeof window !== 'undefined' && localStorage.removeItem('nextca-userInfo')
  state.loggedIn = false
  state.userDetail = {
    accessToken: '',
    refreshToken: '',
    role: 'ANONYMOUS',
    emailAddress: '',
    name: '',
    displayName: '',
    JSESSIONID: '',
    key: '',
  }
  state.status = 'idle'
  state.failureDescription = ''
}

export const { logout, refreshToken } = userSlice.actions

export const selectLoggedIn = (state: RootState) => state.user.loggedIn
export const selectUserDetail = (state: RootState) => state.user.userDetail
export const selectStatus = (state: RootState) => state.user.status
export const selectFailureDescription = (state: RootState) =>
  state.user.failureDescription

export const userReducer = userSlice.reducer
