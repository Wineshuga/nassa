import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://api.spacexdata.com/v3/rockets';

export const getAPI = createAsyncThunk('Rockets/fetchRocket', async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

const initialState = {
  RocketList: [],
  isLoading: true,
  error: undefined,
};

const rocketsSlice = createSlice({
  name: 'rockets',
  initialState,
  reducers: {
    reservation: (state, action) => {
      const { payload: id } = action;
      const updatedRocketList = state.RocketList.map((rocket) => {
        if (rocket.id !== id) {
          return rocket;
        }
        return { ...rocket, reserved: !rocket.reserved };
      });

      return {
        ...state,
        RocketList: updatedRocketList,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAPI.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(getAPI.fulfilled, (state, action) => {
        const rockets = [];
        action.payload.map((item) => {
          let newRocket = {};
          newRocket = {
            id: item.id,
            name: item.rocket_name,
            disc: item.description,
            images: item.flickr_images[1],
            reserved: false,
          };
          return rockets.push(newRocket);
        });
        return {
          ...state,
          RocketList: rockets,
          isLoading: false,
        };
      })
      .addCase(getAPI.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        RocketList: [],
        error: action.error.message,
      }));
  },
});

export const { reservation } = rocketsSlice.actions;

export default rocketsSlice.reducer;
