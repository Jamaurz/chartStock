import React from 'react'
import { Line } from 'react-chartjs-2';

import './Chart.sass'

export default function Chart(props) {
    let data = {};
    let map = '';
    if(props.data && props.data.length != 0) {
        data = {
            labels: props.labels,
            datasets: props.data
        };
        map = props.data.map((el, index) => {
            return <span key={index} style={{backgroundColor: el.borderColor}}>{el.label} <i title='delete' onClick={() => {props.clickHandler(el.label)}}>X</i></span>
        });
    }
    let myoptions = {
        legend: {
            display: false,
        },
        scales: {
            xAxes: [{
                display: false
            }]
        }
        // tooltips: {
        //     callbacks: {
        //         label: function(tooltipItem, data) {
        //             console.log(tooltipItem, data)
        //             return data.datasets[tooltipItem.datasetIndex].label;
        //             return 'sina'
        //         }
        //     }
        // }
    };

    return (
        <div class='chartDisplay'>
            <Line data={data} options={myoptions} />
            <p class='chartItem'>
                {
                    map
                }
            </p>
        </div>
    )

}