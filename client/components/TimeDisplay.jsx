import React from 'react'

export default function TimeDisplay(props) {
    let time = props.time;
    let content = '';

    if(props.time == '') {
        let date = new Date();
        if(props.display == 'start') {
            time = date.getFullYear() - 1 + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
        } else {
            time = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
        }
    }

    if(props.licz) {
        content = <p onClick={props.liczChange}>{props.display}: {time}</p>;
    } else {
        content = <p>{props.display}: <input type="date" onBlur={props.liczChange} onChange={(val) => { props.dateChange(val) }} value={time}/></p>
    }

    return (
        <div>
            { content }
        </div>
    )

}