import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: "",
  userData: null,
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    login: (state, action) => {
       state.token = action.payload.token;
       state.userData = action.payload;
    },
    logout: (state) => {
      state.token = "";
      state.userData = null;
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;