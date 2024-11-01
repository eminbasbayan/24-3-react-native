// store/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    email: string;
    name: string;
  } | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; name: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    register: (state, action: PayloadAction<{ email: string; name: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    }
  }
});

export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;