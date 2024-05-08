import React, { useEffect, useState } from 'react'


function TotalCases() {

    const [data, setData] = useState([])
    useEffect(() => {

        fetch("https://corona.lmao.ninja/v2/countries?yesterday=0&sort=todayCases", {
            method: "GET"
        }).then(res => res.json()).then((data) => { setData(data) })
    }, [])

    // console.log(data)
    
    // console.log(dict)
    return (
        <table>
            <h1 style={{textAlign:"center"}}>Today Cases</h1>
            {data.map((country) =>
                <tr key={country.countryInfo.iso2}>
                    <td><img src={country.countryInfo.flag} style={{height:"10px",width:"14px"}} alt="flag"></img>  {country.country}</td>
                    <td>{country.todayCases}</td></tr>
            )
            }
            </table>
    )

}

export default TotalCases
