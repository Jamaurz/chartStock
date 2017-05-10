import React from 'react';
import { connect } from 'react-redux';

import { dateChangeS, liczChangeS, dateChangeE, liczChangeE } from '../actions/dateAtion';
import TimeDisplay from '../components/TimeDisplay.jsx';

import './DateDisplay.sass';

import prefix  from '../../etc/config.json';

var socket = io.connect(prefix.api);

@connect((store) => {
    return {
        start: store.date.start,
        end: store.date.end,
        liczStart: store.date.liczStart,
        liczEnd: store.date.liczEnd
    };
})
export default class DateDisplay extends React.Component {
    dateChangeS(value) {
        this.props.dispatch(dateChangeS(value.target.value));
        socket.emit('refresh');
    }

    liczChangeS() {
        this.props.dispatch(liczChangeS());
        socket.emit('refresh');
    }

    dateChangeE(value) {
        this.props.dispatch(dateChangeE(value.target.value));
        socket.emit('refresh');
    }

    liczChangeE() {
        this.props.dispatch(liczChangeE());
        socket.emit('refresh');
    }

    render() {
        return (
           <div class='dateDisplay'>
               <TimeDisplay
                   display={'start'}
                   time={this.props.start}
                   dateChange={this.dateChangeS.bind(this)}
                   liczChange={this.liczChangeS.bind(this)}
                   licz={this.props.liczStart}
               />
               <TimeDisplay
                   display={'end'}
                   time={this.props.end}
                   dateChange={this.dateChangeE.bind(this)}
                   liczChange={this.liczChangeE.bind(this)}
                   licz={this.props.liczEnd}
               />
           </div>
        )
    }
}