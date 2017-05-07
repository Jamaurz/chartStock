var axios = require('axios');

//import { apiPrefix } from '../../etc/config.json';
var apiPrefix = 'http://localhost:8080/';

export default {
    checkApi(chartName, frequency, dS, dE) {
        return axios.post(apiPrefix + 'check', {'chartName': chartName, 'frequency': frequency, 'dS': dS, 'dE': dE});
    },
    addDbStock(res) {
        return axios.post(apiPrefix + 'addDbStock', {'res': res});
    },
    refreshStock() {
        return axios.get(apiPrefix + 'refreshStock');
    }
}