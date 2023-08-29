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

const initialState = {
  missions: [],
  status: 'idle',
};

const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMissions.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(fetchMissions.fulfilled, (state, action) => {
        const data = action.payload.map((mission) => ({
          name: mission.mission_name,
          id: mission.mission_id,
          desc: mission.description,
        }));
        return {
          ...state,
          status: 'success',
          missions: data,
        };
      })
      .addCase(fetchMissions.rejected, (state) => ({
        ...state,
        status: 'failed',
      }));
  },
});

export default missionsSlice.reducer;
