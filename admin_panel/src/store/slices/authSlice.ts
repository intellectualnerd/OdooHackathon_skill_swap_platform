import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { adminAuth } from '../../lib/supabase';
import { AuthState, Admin } from '../../types';

const initialState: AuthState = {
  admin: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const loginAdmin = createAsyncThunk(
  'auth/loginAdmin',
  async ({ email, password }: { email: string; password: string }) => {
    const admin = await adminAuth.signIn(email, password);
    return admin;
  }
);

export const checkAdminStatus = createAsyncThunk(
  'auth/checkAdminStatus',
  async (email: string) => {
    const admin = await adminAuth.checkIsAdmin(email);
    return admin;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.admin = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action: PayloadAction<Admin>) => {
        state.loading = false;
        state.admin = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(checkAdminStatus.fulfilled, (state, action) => {
        if (action.payload) {
          state.admin = action.payload;
          state.isAuthenticated = true;
        }
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;