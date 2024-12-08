// src/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('user'),
  successMessage: null
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await authService.login(credentials);
      if (response.token) {
        const userData = {
          data: response.user, // Encapsuler l'utilisateur dans 'data'
          token: response.token
        };
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
      } else {
        return thunkAPI.rejectWithValue('Token non reçu du serveur');
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Erreur lors de la connexion';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, thunkAPI) => {
    try {
      const response = await authService.register(userData);
      if (response.data && response.data.token) {
        const formattedResponse = {
          data: response.data.user, // Encapsuler l'utilisateur dans 'data'
          token: response.data.token
        };
        localStorage.setItem('user', JSON.stringify(formattedResponse));
        return formattedResponse;
      } else {
        return thunkAPI.rejectWithValue('Données d\'inscription invalides');
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Erreur lors de l\'inscription';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('user');
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.successMessage = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.successMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.successMessage = 'Connexion réussie';
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.successMessage = 'Inscription réussie';
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
      });
  }
});

export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthSuccess = (state) => state.auth.successMessage;

export const { logout, clearError, clearSuccess } = authSlice.actions;
export default authSlice.reducer;
