import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'


const buildChartData = (data) => {
    const expdata = [];
    let lastDatapoint;
    for (let date in data) {


        if (lastDatapoint) {
            let newData = {
                x: date,
                y: data[date] - lastDatapoint
            }

            expdata.push(newData);
        }
        lastDatapoint = data[date]
    }
    return expdata;
}


function GraphDemo(props) {

    const [data, setData] = useState({});

    const country = props.country
    console.log(country)
    console.log(props.data)
     let dataFactor = "timeline" in props.data
     let caseData,deathData,recoveredData
     if(dataFactor)
     {
         console.log(dataFactor)
         caseData = props.data['timeline']['cases']
         deathData = props.data['timeline']['deaths']
         recoveredData = props.data['timeline']['recovered']

     }
     else if(!dataFactor)
     {
        caseData = props.data['cases']
        deathData = props.data['deaths']
        recoveredData = props.data['recovered']
     }

     console.log(caseData,deathData,recoveredData)
    // const data = (country==""?props.data:props.data.timeline)

    useEffect(() => {

        const fetchData = async () => {

            const url = `https://disease.sh/v3/covid-19/historical/${country==="" ? "all" : country}?lastdays=120`
            console.log(url)
            await fetch(url)
            .then((res)=>{res.json()})
            .then((data)=>setData(data))

        }

        fetchData();
    },[country])
    return (
        <Line

            data={{
                datasets: [{
                    label: "deaths",
                    backgroundColor: "rgba(255,0,0, 0.2)",
                    borderColor: "#ff0000",
                    data: buildChartData(deathData),
                    fill : true
                },
                {
                    label: "recovered",
                    backgroundColor: "rgba(0,255,0, 0.2)",
                    borderColor: "#00ff00",
                    data: buildChartData(recoveredData),
                    fill : true
                },
                {
                    label: "cases",
                    backgroundColor: "rgba(0,0,255, 0.2)",
                    borderColor: "#0000ff",
                    data: buildChartData(caseData),
                    fill : true
                }

                ]
            }}>

        </Line>
    )
}

export default GraphDemo
