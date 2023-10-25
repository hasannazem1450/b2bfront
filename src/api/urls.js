export default {
  auth: {
    signUp: "/Authentication/sign-up",
    signIn: "/Authentication/sign-in",
    signOut: "/Authentication/sign-out"
  },
  smeProfile: {
    create: "/SmeProfile/create-sme-profile"
  },
    showProfile: {
      show : "/SmeProfile/read-sme-profile?id=54",
      member : "/SmeProfile/read-smeprofile-member",
      news : "/SmeProfile/read-smeprofile-news",
      products : "/SmeProfile/read-sme-products"
  },
  provinces: {
    province : "/Province/read-province"
  },
  cities: {
    city : "/City/read-city"
  },
  industrialparks: {
    industrialpark : "/IndustrialPark/read-IndustrialPark"
  },
  positions: {
    position : "/Position/read-position"
  },
  eventinfos:{
    eventinfo : "/EventInfo/read-event"
  },
  profileSelector:{
    getAllProfiles : "/UserProfile/read-userprofiles"
  },
  homePage:{
    latesProfile:"/SmeProfile/read-latest-sme-profiles"
  }
}
