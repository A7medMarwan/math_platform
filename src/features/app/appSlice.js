import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  platformName: 'ومضات في حل المشكلات',
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setPlatformName(state, action) {
      state.platformName = action.payload
    },
  },
})

export const { setPlatformName } = appSlice.actions
export default appSlice.reducer


