import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://api.spacexdata.com/v3/missions';

export const fetchMissions = createAsyncThunk('type/fetchMissions', async (_, thunkAPI) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

const initialState = [];

const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {},
});

export default missionsSlice.reducer;
