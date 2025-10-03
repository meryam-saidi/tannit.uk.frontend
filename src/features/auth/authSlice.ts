// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
}

const initialToken = localStorage.getItem('authToken');

const initialState: AuthState = {
  token: initialToken,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem('authToken', action.payload); // Persistance
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem('authToken');
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
