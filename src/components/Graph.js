import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import numeral from 'numeral'

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
};

const buildChartData = (data) => {

    const chartData = [];
    let lastDataPoint
    for (let date in data.cases) {
        console.log(date)
        if (lastDataPoint) {
            const newDataPoint = {
                x: date,
                y: data['cases'][date] - lastDataPoint,
            }
            chartData.push(newDataPoint);
        }

        lastDataPoint = data['cases'][date];
    }

    return chartData;
}

function Graph(props) {

    const [data, setData] = useState({});
    const [graphState, setGraphState] = useState("");

    useEffect(() => {
        setGraphState(props.country)

        // const url = `https://disease.sh/v3/covid-19/historical/ + ${graphState == "" ? "all" : props.country}`;

        async function getData() {

            await fetch("https://disease.sh/v3/covid-19/historical/all")
                .then(res => res.json())
                .then(data => setData(data))
        }

        getData();

    }, [])





    return (
        <div style={{ height: "250px" }}>
            <Line
                type={'line'}
                data={{
                    datasets: [
                        {
                            backgroundColor: "rgba(0,255,255, 0.5)",
                            borderColor: "#00FFFF",
                            data: buildChartData(data),
                        },
                    ],
                }}
                options={options}
            ></Line>
        </div>
    )
}

export default Graph
