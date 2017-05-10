var axios = require('axios');

import prefix  from '../../etc/config.json';
var apiPrefix = prefix.api;

export default {
    checkApi(chartName, frequency, dS, dE) {
        return axios.post(apiPrefix + 'check', {'chartName': chartName, 'frequency': frequency, 'dS': dS, 'dE': dE});
    },
    addDbStock(res) {
        return axios.post(apiPrefix + 'addDbStock', {'res': res});
    },
    removeDbStock(label) {
        return axios.post(apiPrefix + 'removeDbStock', {'label': label});
    },
    refreshStock() {
        return axios.get(apiPrefix + 'refreshStock');
    }
}