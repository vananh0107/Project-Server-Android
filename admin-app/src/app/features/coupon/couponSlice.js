import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { couponService } from './couponService';
import { toast } from 'react-toastify';
const initialState = {
  coupon: [],
  isError: false,
  isSuccess: false,
  message: '',
};
export const getAllCoupon = createAsyncThunk('coupon/get', async (thunkAPI) => {
  try {
    return await couponService.getCoupon();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const createCoupon = createAsyncThunk(
  'coupon/create',
  async (data, thunkAPI) => {
    try {
      return await couponService.addCoupon(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateCoupon = createAsyncThunk(
  'coupon/update',
  async (data, thunkAPI) => {
    try {
      return await couponService.changeCoupon(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteCoupon = createAsyncThunk(
  'coupon/delete',
  async (data, thunkAPI) => {
    try {
      return await couponService.deleteCounpon(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getSingleCoupon = createAsyncThunk(
  'coupon/getSingle',
  async (id, thunkAPI) => {
    try {
      return await couponService.getACoupon(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const authSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.coupon = action.payload;
        if (state.isSuccess === true) {
          toast.success('Coupon added');
        }
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.coupon = null;
        if (state.isError === true) {
          toast.error('Coupon add fail');
        }
      })
      .addCase(getAllCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.listCoupon = action.payload;
      })
      .addCase(getAllCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.listCoupon = null;
      })
      .addCase(deleteCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deleteCoupon = action.payload;
        if (state.isSuccess) toast.success('Delete successfully');
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.deleteCoupon = null;
        if (state.isError) toast.error('Delete error');
      })
      .addCase(updateCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateCoupon = action.payload;
        if (state.isSuccess) toast.success('Update successfully');
      })
      .addCase(updateCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.updateCoupon = null;
        if (state.isError) toast.error('Update error');
      })
      .addCase(getSingleCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getACoupon = action.payload;
      })
      .addCase(getSingleCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.getACoupon = null;
      });
  },
});
export default authSlice.reducer;
