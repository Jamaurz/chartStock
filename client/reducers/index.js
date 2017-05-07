import { combineReducers } from "redux"

import common from "./commonReducer"
import item from "./itemReducer"

export default combineReducers({
    common,
    item
})
