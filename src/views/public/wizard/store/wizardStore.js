import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getProvince, getCity, getIndustrialPark } from "@api/mainApis"
import { getPosition, createProfile } from "@api/profile"

export const getProvinceData = createAsyncThunk("wizard/getProvinceData", async () => {
  const response = await getProvince()
  return response.data.result.list
})

export const getCityData = createAsyncThunk("wizard/getCityData", async (provinceID) => {
  const response = await getCity({ ProvinceId: provinceID })
  return response.data.result.list.map(ctsDb => ({
          value: ctsDb.id,
          label:ctsDb.cityName
      }))
})

export const getPositionData = createAsyncThunk("wizard/getPosition", async () => {
  const response = await getPosition()
  return response.data.result.list.map(posDb => ({
    value: posDb.id,
    label: posDb.name
}))
})

export const getIndustrialParkData = createAsyncThunk("wizard/getIndustrialPark", async () => {
  const response = await getIndustrialPark()
  return response.data.result.list.map(indDb => ({
    value: indDb.id,
    label: indDb.name
}))
})
export const SetcreateProfile = createAsyncThunk("wizard/SetcreateProfile", async (data) => {
  const response = await createProfile(data)
  return response
})


export const wizardSlice = createSlice({
  name: "wizardSlice",
  initialState: {
    province: [],
    city: [],
    posision:[],
    Industrial:[],
    profileresponse:[]
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProvinceData.fulfilled, (state, action) => {
        state.province = action.payload
      })
      .addCase(getCityData.fulfilled, (state, action) => {
        state.city = action.payload
      })
      .addCase(getPositionData.fulfilled, (state, action) => {
        state.posision = action.payload
      })
      .addCase(getIndustrialParkData.fulfilled, (state, action) => {
        state.Industrial = action.payload
      })
      .addCase(SetcreateProfile.fulfilled, (state, action) => {
        state.profileresponse = action.payload
      })
  }
})

export default wizardSlice.reducer
