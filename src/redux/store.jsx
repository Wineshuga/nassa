import { configureStore } from '@reduxjs/toolkit';
import rocketsReducer from './rocketsSlice';
import missionsReducer from './mission/missionsSlice';

const store = configureStore({
  reducer: {
    rockets: rocketsReducer,
    missions: missionsReducer,

  },
});

export default store;
