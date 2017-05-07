export default function reducer(state={
    input: ''
}, action) {

    if (action.type == 'INPUT_CHANGE') {
        return {
            ...state,
            input: action.payload
        }
    }

    return state
}
