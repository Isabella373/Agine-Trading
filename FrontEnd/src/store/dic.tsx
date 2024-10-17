"use client";
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState, AppDispatch } from '@/store'; // Adjust the import paths to your store

interface CandlestickData {
  time: number;
  [key: string]: any; // Adjust based on the actual data structure
}

interface CandlestickResponse {
  [symbol: string]: CandlestickData[];
}

interface CandleState {
  sp500_list: string[];
  candleStick: {
    [key: string]: CandlestickData[];
  };
  status: 'loading' | 'success' | 'failed';
  flag: string;
}

// Async Thunks
export const loadCandleSticks = createAsyncThunk<CandlestickResponse | undefined, string[], { dispatch: AppDispatch; state: RootState }>(
  "post/getCandleStickData",
  async (symbols, { dispatch }) => {
    try {
      const response = await axios.post<CandlestickResponse>(
        "http://127.0.0.1:8000/candlestickDataTarget/",
        symbols,
        { headers: { 'Content-Type': 'application/json' } }
      );
      symbols.forEach(element => {
        response.data[element].sort((a, b) => a.time - b.time).reverse();
      });
      dispatch(updateCandleStickBatch(response.data));
      return response.data;
    } catch (error) {
      console.error("Error loading candlestick data:", error);
      return undefined;
    }
  }
);

export const loadCandleStick = createAsyncThunk<CandlestickResponse | undefined, string[], { dispatch: AppDispatch; state: RootState }>(
  "post/getCandleStickData",
  async (symbols, { dispatch }) => {
    try {
      const response = await axios.post<CandlestickResponse>(
        "http://127.0.0.1:8000/candlestickDataTarget/",
        symbols,
        { headers: { 'Content-Type': 'application/json' } }
      );
      response.data[symbols[0]].sort((a, b) => a.time - b.time).reverse();
      dispatch(updateFlag(symbols[0]));
      return response.data;
    } catch (error) {
      console.error("Error loading candlestick data:", error);
      return undefined;
    }
  }
);

// Initial state
const initialState: CandleState = {
  sp500_list: ["A", "AAL", "AAPL", "ABBV", "ABNB", /*... other symbols */],
  candleStick: {},
  status: "loading",
  flag: "MMM",
};

// Slice
export const candleSlice = createSlice({
  name: 'candlestick',
  initialState,
  reducers: {
    updateSP500_list: (state, action: PayloadAction<string[]>) => {
      state.sp500_list = action.payload;
    },
    updateFlag: (state, action: PayloadAction<string>) => {
      state.flag = action.payload;
    },
    updateCandleStickBatch: (state, action: PayloadAction<CandlestickResponse>) => {
      state.candleStick = { ...state.candleStick, ...action.payload };
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loadCandleStick.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadCandleStick.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload) {
          state.candleStick = { ...state.candleStick, ...action.payload };
        }
      })
      .addCase(loadCandleStick.rejected, (state) => {
        state.status = "failed";
      });
  }
});

// Action exports
export const { updateSP500_list, updateFlag, updateCandleStickBatch } = candleSlice.actions;

// Reducer export
export default candleSlice.reducer;
