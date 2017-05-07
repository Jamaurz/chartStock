import React from 'react'
import { connect } from "react-redux"
import { Line } from 'react-chartjs-2';

import { refreshStock, refreshStockStore } from "../actions/commonAction"


@connect((store, ownProps) => {
    return {
        stock: store.item.stock
    };
})
export default class Chart extends React.Component {
    componentWillMount() {
        let that = this;

        refreshStock(function(data) {
            that.props.dispatch(refreshStockStore(data));
        });
    }
    render() {
        let labels = [];
        let values = [];

        this.props.stock.map((stock)=> {
            let obj = {};
            obj.fill = false;
            obj.label = stock.name;
            obj.data = [];

            stock.value.map((value) => {
                obj.data.push(value.val);
            });
            labels = Array(obj.data.length);

            values.push(obj);
        });
        console.log(values);
        let data = {
            labels: labels,
            datasets: values
        };

        let myoptions = {
            // tooltips: {
            //     callbacks: {
            //         label: function(tooltipItem, data) {
            //             console.log(tooltipItem, data)
            //             return 'sina';
            //         }
            //     }
            // }
        };

        // let data2 =  {
        //     labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running", "Running"],
        //     datasets: [
        //         {
        //             fill: false,
        //             backgroundColor: "rgba(179,181,198,0.2)",
        //             borderColor: "rgba(179,181,198,1)",
        //             pointBackgroundColor: "rgba(179,181,198,1)",
        //             pointBorderColor: "#fff",
        //             pointHoverBackgroundColor: "#fff",
        //             pointHoverBorderColor: "rgba(179,181,198,1)",
        //             data: [935.93, 914.86, 928.1, 935.93, 935.93, 914.86, 928.1,935.93]
        //         },
        //         {
        //             fill: false,
        //             backgroundColor: "rgba(255,99,132,0.2)",
        //             borderColor: "rgba(255,99,132,1)",
        //             pointBackgroundColor: "rgba(255,99,132,1)",
        //             pointBorderColor: "#fff",
        //             pointHoverBackgroundColor: "#fff",
        //             pointHoverBorderColor: "rgba(255,99,132,1)",
        //             data: [915.93, 944.86, 898.1, 915.93, 935.93, 934.86, 920.1,895.93]
        //         }
        //     ]
        // };

        return (
            <div>
                <Line data={data} options={myoptions} />
            </div>
        )
    }
}