export default function reducer(state={
    start: '',
    end: '',
    liczStart: true,
    liczEnd: true
}, action) {

    if (action.type == 'DATE_CHANGE_S') {
        return {
            ...state,
            start: action.payload
        }
    } else if (action.type == 'LICZ_CHANGE_S') {
        return {
            ...state,
            liczStart: !state.liczStart
        }
    } else if (action.type == 'DATE_CHANGE_E') {
        return {
            ...state,
            end: action.payload
        }
    } else if (action.type == 'LICZ_CHANGE_E') {
        return {
            ...state,
            liczEnd: !state.liczStart
        }
    }

    return state
}
