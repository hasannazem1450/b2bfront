import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { GetlatesProfile } from "../../../../api/HomePage"
import { getEventinfo } from "../../../../api/mainApis"

export const getEventinfoData = createAsyncThunk("getEventinfoStatus", async () => {
  const response = await getEventinfo()
  return response.data.result.list
})
export const GetlatesProfiles = createAsyncThunk("GetlatesProfile", async () => {
  const response = await GetlatesProfile()
  return response.data.result.profiles
})

export const homePageSlice = createSlice({
  name: "homePageSlice",
  initialState: {
    latesProfile: [],
    slideImages: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetlatesProfiles.fulfilled, (state, action) => {
        state.latesProfile = action.payload
      })
      .addCase(getEventinfoData.fulfilled, (state, action) => {
        state.slideImages = action.payload
      })
  }
})

export default homePageSlice.reducer
