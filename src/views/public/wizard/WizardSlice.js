import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const baseUrl = process.env.REACT_APP_BASE_URL

export const getRoles = createAsyncThunk("users/getRoles", async () => {
  return await axios.get(`${baseUrl}roles/list`)
})

export const getCitiesByProvinceId = createAsyncThunk("wizard/getCitiesByProvinceId", async (provinceId) => {
  return await axios.get(`${baseUrl}/province/${provinceId}/city/list`)
})

// export const getProvinces = createAsyncThunk("wizard/getProvinces", async () => {
//   return await axios.get(`${baseUrl}/Province/read-province`)
// })

export const getProvinces = createAsyncThunk("wizard/getProvinces", async () => {
  return await axios.get(`https://localhost:7216/api/v1/City/read-city?ProvinceId=1`)
})


//https://localhost:7216/api/v1/City/read-city?ProvinceId=1
export const WizardSlice = createSlice({
  name: "wizard",
  initialState: {
    provinces: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProvinces.fulfilled, (state, action) => {
      state.provinces = action.payload.data
    })
  }
})

export default WizardSlice.reducer
