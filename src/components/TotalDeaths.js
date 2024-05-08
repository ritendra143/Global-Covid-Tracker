import React,{useState,useEffect} from 'react'

function TotalDeaths() {
    const [data, setData] = useState([])
    useEffect(() => {

        fetch("https://disease.sh/v3/covid-19/countries?sort=todayDeaths", {
            method: "GET"
        }).then(res => res.json()).then((data) => { setData(data) })
    }, [])

    // console.log(data)

    return (
        <div>
            
            {data.map((country) =>
                <tr key={country.countryInfo.iso2}>
                    <td><img src={country.countryInfo.flag} style={{height:"10px",width:"14px"}} alt="flags"></img>  {country.country}</td>
                    <td>{country.todayDeaths}</td></tr>
            )
            }
            </div>
    )

}


export default TotalDeaths
