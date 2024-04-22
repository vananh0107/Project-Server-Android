import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { discountService } from './discountService';
import { toast } from 'react-toastify';
const initialState = {
  discount: {},
  listDiscount: [],
  isError: false,
  isSuccess: false,
  message: '',
};
export const getAllDiscount = createAsyncThunk('discount/get', async (thunkAPI) => {
  try {
    return await discountService.getDiscount();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const createDiscount = createAsyncThunk(
  'discount/create',
  async (data, thunkAPI) => {
    try {
      return await discountService.addDiscount(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateDiscount = createAsyncThunk(
  'discount/update',
  async (data, thunkAPI) => {
    try {
      return await discountService.changeDiscount(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteDiscount = createAsyncThunk(
  'discount/delete',
  async (data, thunkAPI) => {
    try {
      return await discountService.deleteDiscount(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getSingleDiscount = createAsyncThunk(
  'discount/getSingle',
  async (id, thunkAPI) => {
    try {
      return await discountService.getADiscount(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const authSlice = createSlice({
  name: 'discount',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDiscount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDiscount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.discount = action.payload;
        if (state.isSuccess === true) {
          toast.success('Discount added');
        }
      })
      .addCase(createDiscount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.discount = null;
        if (state.isError === true) {
          toast.error('Discount add fail');
        }
      })
      .addCase(getAllDiscount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllDiscount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.listDiscount = action.payload;
      })
      .addCase(getAllDiscount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.listDiscount = null;
      })
      .addCase(deleteDiscount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDiscount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deleteDiscount = action.payload;
        if (state.isSuccess) toast.success('Delete successfully');
      })
      .addCase(deleteDiscount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.deleteDiscount = null;
        if (state.isError) toast.error('Delete error');
      })
      .addCase(updateDiscount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDiscount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateDiscount = action.payload;
        if (state.isSuccess) toast.success('Update successfully');
      })
      .addCase(updateDiscount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.updateDiscount = null;
        if (state.isError) toast.error('Update error');
      })
      .addCase(getSingleDiscount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleDiscount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.discount = action.payload;
      })
      .addCase(getSingleDiscount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.discount = null;
      });
  },
});
export default authSlice.reducer;
