import React from 'react';
import { connect } from "react-redux"

import { inputChange, checkApi, addDbStock} from "../actions/commonAction"

import './InputDisplay.sass';

import prefix  from '../../etc/config.json';

var socket = io.connect(prefix.api);

@connect((store) => {
    return {
        input: store.common.input
    };
})
export default class Layout extends React.Component {
    inputChange(input) {
        this.props.dispatch(inputChange(input.target.value))
    }

    addItem() {
        let frequency = 'daily'; //weekly, monthly
        let date = new Date();
        let dE = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        let dS = date.getFullYear() - 1 + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        var newThis = this;
        var input = this.props.input;
        this.props.dispatch(inputChange(''));

        checkApi(input, frequency, dS, dE, function(data) {
            if(data) {
                addDbStock(input, function (res) {
                    if (res) {
                        socket.emit('refresh');
                        socket.emit('refreshThis');
                    }
                });
            } else {
                alert('error');
            }
        });
    }

    render() {
        return (
           <div class='inputDisplay'>
               <input class='inputText' type='text' onChange={this.inputChange.bind(this)}  value={this.props.input} />
               <input class="'inputButton" type='button' value='Add' onClick={this.addItem.bind(this)} />
           </div>
        )
    }
}