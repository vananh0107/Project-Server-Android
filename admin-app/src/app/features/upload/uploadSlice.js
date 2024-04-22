import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { uploadService } from './uploadService';
import { toast } from 'react-toastify';
export const uploadImg = createAsyncThunk(
  'upload/post',
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append('images', data[i]);
      }
      return await uploadService.uploadImage(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteImg = createAsyncThunk(
  'upload/delete',
  async (data, thunkAPI) => {
    try {
      return await uploadService.deleteImage(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetStateUpload = createAction('Reset_all');
const initialState = {
  image: false,
  isError: false,
  isSuccess: false,
  message: '',
};
export const uploadSlice = createSlice({
  name: 'image',
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(uploadImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.imgSingle = action.payload;
        state.image=state.imgSingle[0];
      })
      .addCase(uploadImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.image = null;
      })
      .addCase(deleteImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.image = action.payload;
        if (action.payload.length === 0) state.image = null;
      })
      .addCase(deleteImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.image = null;
      })
      .addCase(resetStateUpload, () => initialState);
  },
});
export default uploadSlice.reducer;
