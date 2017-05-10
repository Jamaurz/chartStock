export default function reducer(state={
    input: '',
    labels: [],
    data: []
}, action) {

    if (action.type == 'INPUT_CHANGE') {
        return {
            ...state,
            input: action.payload
        }
    } else if(action.type == 'SET_DATA') {
        return {
            ...state,
            data: action.payload
        }
    } else if(action.type == 'SET_LABELS') {
        return{
            ...state,
            labels: action.payload
        }
    }

    return state
}
