import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getAllProfiles } from "../../../../api/profileSelector"
import {getEventinfo} from "../../../../api/mainApis"

export const getProfileData = createAsyncThunk("getProfileStatus", async () => {
  const response = await getAllProfiles()
  return response.data.result.list
})

export const getEventinfoData = createAsyncThunk("getEventinfoStatus", async () => {
  const response = await getEventinfo()
  return response.data.result.list
})

export const profileSelectorSlice = createSlice({
  name: "profileSelectorSlice",
  initialState: {
    slideImages: [],
    profile: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfileData.fulfilled, (state, action) => {
        state.profile = action.payload
      })
      .addCase(getEventinfoData.fulfilled, (state, action) => {
        state.slideImages = action.payload
      })
  }
})

export default profileSelectorSlice.reducer
