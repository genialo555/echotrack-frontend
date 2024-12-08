// src/slices/vehicleSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks pour les actions asynchrones
export const fetchVehicles = createAsyncThunk(
  'vehicles/fetchVehicles',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/vehicles');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addVehicle = createAsyncThunk(
  'vehicles/addVehicle',
  async (vehicleData, thunkAPI) => {
    try {
      const response = await axios.post('/api/vehicles', vehicleData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Ajoutez d'autres thunks (update, delete) si nécessaire

const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Vehicles
      .addCase(fetchVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.vehicles;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // Add Vehicle
      .addCase(addVehicle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addVehicle.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload.vehicle);
      })
      .addCase(addVehicle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default vehicleSlice.reducer;
