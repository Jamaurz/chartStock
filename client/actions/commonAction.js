import api from '../api';

export function inputChange(value) {
    return {
        type: "INPUT_CHANGE",
        payload: value
    }
}

export function refreshStockStore(value) {
    return {
        type: "REFRESH_STOCK",
        payload: value
    }
}

// export function addItem(value) {
//     return {
//         type: "ADD_ITEM",
//         payload: value
//     }
// }

export function refreshStock(callback) {
    api.refreshStock().then(function(data) {
        callback(data.data);
    });
}

export function addDbStock(res, callback) {
    api.addDbStock(res).then(function(data) {
       callback(data.data);
    });
}

export function checkApi(value, frequency, dS, dE, callback) {
    api.checkApi(value, frequency, dS, dE).then(function(data){
        if(data.data) {
            var res = {};
            var value = []
            data.data.dataset.data.map((item) => {
                var obj = {};
                obj.date = item[0];
                obj.val = item[1];
                value.push(obj)
            });
            res.name = data.data.dataset.dataset_code;
            res.value = value;

            callback(res);
        } else {
            callback(false)
        }
    })
}
