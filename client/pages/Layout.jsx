import React from 'react';
import { connect } from "react-redux"

import { inputChange, checkApi, addDbStock, refreshStock, refreshStockStore } from "../actions/commonAction"

import Chart from './Chart.jsx'

import './Layout.sass';

var socket = io.connect('http://localhost:8080/');

@connect((store) => {
    console.log('state', store);
    return {
        input: store.common.input,
        stock: store.item.stock
    };
})
export default class Layout extends React.Component {
    componentWillMount() {
        var that = this;

        socket.emit('init');

        socket.on('start', function() {
            console.log('emit socket layout')
        })
    }

    // componentWillUpdate(nextProps, nextState){
    //     console.log('will update', nextProps, nextState)
    // }

    inputChange(input) {
        this.props.dispatch(inputChange(input.target.value))
    }

    addItem() {
        let frequency = 'daily'; //weekly, monthly
        let date = new Date();
        let dE = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        let dS = date.getFullYear() - 1 + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        var newThis = this;

        checkApi(this.props.input, frequency, dS, dE, function(data) {
            console.log('data', data);

            addDbStock(data, function(res) {
                if(res) {
                    console.log('created');
                } else {
                    console.log('edited');
                }
                refreshStock(function(data) {
                    newThis.props.dispatch(refreshStockStore(data));
                });
            });
        });
        //this.props.dispatch(addItem(this.props.input))
    }
    render() {
        return (
           <div>
               <input type='text' onChange={this.inputChange.bind(this)}  value={this.props.input} />
               <input type='button' value='Add' onClick={this.addItem.bind(this)} />
               <Chart />
           </div>
        )
    }
}