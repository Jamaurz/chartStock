export default function reducer(state={
    stock: []
}, action) {

    if (action.type == 'REFRESH_STOCK') {
        return {
            stock: action.payload
        }
    }

    return state
}
