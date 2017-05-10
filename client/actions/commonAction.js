import api from '../api';

export function inputChange(value) {
    return {
        type: "INPUT_CHANGE",
        payload: value
    }
}

export function setData(value) {
    return {
        type: "SET_DATA",
        payload: value
    }
}

export function setLabels(value) {
    return {
        type: "SET_LABELS",
        payload: value
    }
}

export function refreshStockStore(value) {
    return {
        type: "REFRESH_STOCK",
        payload: value
    }
}

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

export function removeDbStock(label, callback) {
    api.removeDbStock(label).then(function(data) {
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

export function checkAllApi(values, frequency, dS, dE, callback) {
    var result = [];
    var index = 0;
    check(values[index].name, frequency, dS, dE);
    function check(value, frequency, dS, dE) {
        var labelsGlob = [];
        api.checkApi(value, frequency, dS, dE).then(function(data){
            if(data.data) {
                var res = {};
                res.data = [];

                res.backgroundColor = values[index].color;
                res.borderColor = values[index].color;
                data.data.dataset.data.map((item) => {
                    res.data.push(item[1]);
                    if(index + 1 == values.length) {
                        labelsGlob.push(item[0]);
                    }
                });
                res.fill = false;
                res.label = data.data.dataset.dataset_code;

                result.push(res);
                index++;
                if(index < values.length) {
                    check(values[index].name, frequency, dS, dE);
                } else {
                    callback(result, labelsGlob);
                }
            } else {
                callback(result, labelsGlob)
            }
        })
    }
}