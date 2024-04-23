import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authService } from './authService';
import { toast } from 'react-toastify';

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  message: '',
};
export const loginUser = createAsyncThunk(
  'auth/admin-login',
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getMonthOrder = createAsyncThunk(
  'order/month-total',
  async (thunkAPI) => {
    try {
      return await authService.getMonthOrder();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getYearOrder = createAsyncThunk(
  'order/year-total',
  async (thunkAPI) => {
    try {
      return await authService.getYearOrder();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction('Reset_all');
export const getAllUser = createAsyncThunk(
  'auth/getUsers',
  async (thunkAPI) => {
    try {
      return await authService.getUsers();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const delegate = createAsyncThunk(
  'auth/delegate',
  async (data,thunkAPI) => {
    try {
      return await authService.author(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        if (state.user.role == 'admin') {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          toast.success('Login successful');
        } else {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.user = null;
          if (state.isError === true) {
            toast.error('You not permission');
          }
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
        if (state.isError === true) {
          toast.error('Email or passwor is false');
        }
      })
      .addCase(getAllUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.listUser = action.payload;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.listUser = null;
        if (state.isError === true) {
          toast.error('Error get all user');
        }
      })
      .addCase(getMonthOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMonthOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.monthTotal = action.payload;
      })
      .addCase(getMonthOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.monthTotal = null;
      })
      .addCase(getYearOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getYearOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.yearTotal = action.payload;
      })
      .addCase(getYearOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.yearTotal = null;
      })
      .addCase(delegate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(delegate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        toast.success('Update role successfully');
      })
      .addCase(delegate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error('Error update role');
      })
      .addCase(resetState, () => initialState);
  },
});
export default authSlice.reducer;
