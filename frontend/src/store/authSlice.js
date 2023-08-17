import { createSlice } from '@reduxjs/toolkit';
const ltoken = JSON.parse(localStorage.getItem('token'));
const luser = JSON.parse(localStorage.getItem('user'));
const initialState = {
  user: luser,
  token: ltoken,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
