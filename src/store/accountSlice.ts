import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import  axiosInstance  from "../api/axiosInstance";

type AccountState = {
  email: string | null;
  balance: number;
  vestedBalance: number;
  kycStatus: string | null;
  loading: boolean;
  error?: string;
};

const initialState: AccountState = {
  email: null,
  balance: 0,
  vestedBalance: 0,
  kycStatus: null,
  loading: false,
};

export const fetchAccountMe = createAsyncThunk(
  "account/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/accounts/me");
      return data as {
        email: string;
        balance: number;
        vestedBalance: number;
        kycStatus: string;
      };
    } catch (e: any) {
      return rejectWithValue(e?.response?.data || "Failed to fetch /accounts/me");
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    resetAccount: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAccountMe.pending, (s) => {
        s.loading = true; s.error = undefined;
      })
      .addCase(fetchAccountMe.fulfilled, (s, a) => {
        s.loading = false;
        s.email = a.payload.email;
        s.balance = a.payload.balance ?? 0;
        s.vestedBalance = a.payload.vestedBalance ?? 0;
        s.kycStatus = a.payload.kycStatus ?? null;
      })
      .addCase(fetchAccountMe.rejected, (s, a) => {
        s.loading = false;
        s.error = (a.payload as string) || "Error";
      });
  },
});

export const { resetAccount } = accountSlice.actions;
export default accountSlice.reducer;
