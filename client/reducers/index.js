import { combineReducers } from "redux"

import common from "./commonReducer"
import date from "./dateReducer"

export default combineReducers({
    common,
    date,
})
