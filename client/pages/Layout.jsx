import React from 'react';
import { connect } from "react-redux"

import {refreshStock, refreshStockStore, checkAllApi, removeDbStock, setData, setLabels } from "../actions/commonAction"

import Chart from '../components/Chart.jsx'
import DateDisplay from './DateDisplay.jsx'
import InputDisplay from './InputDisplay.jsx'

import './Layout.sass';

import prefix  from '../../etc/config.json';

var socket = io.connect(prefix.api);

@connect((store) => {
    return {
        start: store.date.start,
        end: store.date.end,
        labels: store.common.labels,
        data: store.common.data
    };
})
export default class Layout extends React.Component {
    componentWillMount() {
        var newThis = this;
        socket.emit('init');

        socket.on('start', function() {
            newThis.refresh();
        })
    }


    clickHandler(label) {
        let newThis = this;
        console.log('click handler');
        removeDbStock(label, function(data) {
            if (data) {
                console.log('success');
                newThis.refresh();
                socket.emit('refresh');
            }
        });
    }

    refresh() {
        let frequency = 'daily'; //weekly, monthly
        let date = new Date();
        let dE = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        let dS = date.getFullYear() - 1 + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        if(this.props.start != '') {
            dS = this.props.start;
        }
        if(this.props.end != '') {
            dE = this.props.end;
        }
        var newThis = this;
        refreshStock(function(stock) {
            if (stock.length != 0) {
                checkAllApi(stock, frequency, dS, dE, function (data, labels) {
                    newThis.props.dispatch(setLabels(labels));
                    newThis.props.dispatch(setData(data));
                });
            } else {
                newThis.props.dispatch(setLabels([]));
                newThis.props.dispatch(setData([]))
            }
        });
     }

    render() {
        return (
           <div class='app'>
               <DateDisplay />
               <InputDisplay />
               <Chart data={this.props.data} labels={this.props.labels} clickHandler={this.clickHandler.bind(this)}/>
           </div>


        )
    }
}