import api from '../api';

export function dateChangeS(value) {
    return {
        type: "DATE_CHANGE_S",
        payload: value
    }
}

export function liczChangeS(value) {
    return {
        type: "LICZ_CHANGE_S",
        payload: value
    }
}

export function dateChangeE(value) {
    return {
        type: "DATE_CHANGE_E",
        payload: value
    }
}

export function liczChangeE(value) {
    return {
        type: "LICZ_CHANGE_E",
        payload: value
    }
}
