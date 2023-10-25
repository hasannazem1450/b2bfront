// ** Reducers Imports
import layout from "./layout"
import navbar from "./navbar"
import shop from "./shop"
import auth from "./authentication"
import profileStore from "../views/public/ProfileSelector/store/ProfileStore"
import wizardStore from "../views/public/wizard/store/wizardStore"
import homeStore from "../views/public/HomePage/store/HomeStore"
const rootReducer = { layout, navbar, shop, auth, profileStore, wizardStore, homeStore }

export default rootReducer
