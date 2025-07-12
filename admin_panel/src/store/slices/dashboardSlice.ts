import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { userService, swapRequestService } from '../../lib/supabase';
import { DashboardState, User, SwapRequest } from '../../types';

const initialState: DashboardState = {
  users: [],
  swapRequests: [],
  loading: false,
  error: null,
  filters: {
    status: 'all',
    search: '',
  },
};

export const fetchUsers = createAsyncThunk('dashboard/fetchUsers', async () => {
  const users = await userService.getAllUsers();
  return users;
});

export const fetchSwapRequests = createAsyncThunk('dashboard/fetchSwapRequests', async () => {
  const requests = await swapRequestService.getAllSwapRequests();
  return requests;
});

export const banUser = createAsyncThunk(
  'dashboard/banUser',
  async (userId: string) => {
    const user = await userService.banUser(userId);
    return user;
  }
);

export const unbanUser = createAsyncThunk(
  'dashboard/unbanUser',
  async (userId: string) => {
    const user = await userService.unbanUser(userId);
    return user;
  }
);

export const rejectSwapRequest = createAsyncThunk(
  'dashboard/rejectSwapRequest',
  async (requestId: string) => {
    const request = await swapRequestService.rejectSwapRequest(requestId);
    return request;
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.filters.status = action.payload;
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      // Fetch swap requests
      .addCase(fetchSwapRequests.fulfilled, (state, action: PayloadAction<SwapRequest[]>) => {
        state.swapRequests = action.payload;
      })
      // Ban user
      .addCase(banUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        const index = state.users.findIndex(user => user.user_id === action.payload.user_id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(banUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(banUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to ban user';
      })
      // Unban user
      .addCase(unbanUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        const index = state.users.findIndex(user => user.user_id === action.payload.user_id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(unbanUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unbanUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to unban user';
      })
      // Reject swap request
      .addCase(rejectSwapRequest.fulfilled, (state, action: PayloadAction<SwapRequest>) => {
        const index = state.swapRequests.findIndex(req => req.request_id === action.payload.request_id);
        if (index !== -1) {
          state.swapRequests[index] = action.payload;
        }
      });
  },
});

export const { setStatusFilter, setSearchFilter, clearError } = dashboardSlice.actions;
export default dashboardSlice.reducer;