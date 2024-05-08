import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darktheme, GlobalStyles } from './themes'
import { useState, useEffect } from 'react';
import GraphDemo from './components/GraphDemo'
import Map from './components/Map'
import TotalCases from './components/TotalCases'
import TotalDeaths from './components/TotalDeaths'
import Cards from './components/Cards'
import NumberFormat from 'react-number-format';
import "leaflet/dist/leaflet.css"
import Totaldemo from './components/Tabledemo'
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'
import { faGithub , faLinkedin} from '@fortawesome/free-brands-svg-icons'


const StyledApp = styled.div`
background : fixed;`
// color : ${props => props.theme.fontColor};



function App() {


  const [theme, setTheme] = useState('dark');
  const [datac, setDatac] = useState({});
  const [mapCenter, setMapCenter] = useState({ lat: 0.80746, lng: -40.4796 })
  const [mapZoom, setmapZoom] = useState(3);
  const [list, setList] = useState([])
  const [country, setCountry] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("");
  const [graph, setGraph] = useState({});


  // console.log(list)
  useEffect(() => {

    fetch("https://disease.sh/v3/covid-19/all").then(res => res.json())
      .then(data => { setDatac(data) })

    setGraphData("");

    // console.log(datac)
  }, [])


  useEffect(() => {

    fetch('https://disease.sh/v3/covid-19/countries')
      .then(res => res.json())
      .then(data => setList(data))


  }, [])


  const onCountryChange = async (e) => {

    // console.log(mapCenter);
    const country = e.target.value;
    // console.log(country);
    setSelectedCountry(country);
    const url = "https://disease.sh/v3/covid-19/countries/" + country;
    // console.log(url);

    await fetch(url).then((res) => res.json())
      .then(data => {
        // console.log(data);
        setMapCenter({ lat: data.countryInfo.lat, lng: data.countryInfo.long })
        setmapZoom(4);
        setDatac(data)
        setCountry(data.country)
        // console.log(datac)      
      })
    setGraphData(country);
  }

  const setGraphData = async (country) => {

    // console.log(country)
    const urlgraph = `https://disease.sh/v3/covid-19/historical/${country == "" ? "all" : country}`
    // console.log(urlgraph);

    await fetch(urlgraph)
      .then(res => res.json())
      .then((data) => {
        setGraph(data)
        console.log(graph)
      })

  }



  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
    // console.log(theme);
  }



  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darktheme}>
      <GlobalStyles />
      <StyledApp>
        <header >
          <h1 className="dbhead">Covid-19 World Tracker</h1>
          <label class="switch" style={{marginRight:"20px"}}>
            <input type="checkbox"></input>
            <span class="slider round" onClick={() => themeToggler()}></span>
          </label>
        </header>


        <div className="parentDiv">
          <div className="centerColumn">
            <div className="cardClass">

              <Cards heading="Total Cases" count={<NumberFormat className="cardfigures" thousandSeparator={true} value={datac.cases} disabled={true}></NumberFormat>} ></Cards>
              <Cards heading="Total Recovered" count={<NumberFormat className="cardfigures" thousandSeparator={true} value={datac.recovered} disabled={true}></NumberFormat>}  ></Cards>
              <Cards heading="Total Deaths" count={<NumberFormat className="cardfigures" thousandSeparator={true} value={datac.deaths} disabled={true}></NumberFormat>}></Cards>
            </div>
            <div className="centerClass">
              <div>
                <select value={country.country} onChange={onCountryChange} >
                  <option> Select Country</option>

                  {list.map((element) =>
                    <option key={element.countryInfo.iso} >{element.country}</option>
                  )}
                </select>
              </div>
              <Map
                countries={list}
                center={mapCenter}
                zoom={mapZoom}
                data={datac}
              ></Map>


            </div>
          </div>


          <div className="rightpane">
            <div>
            <GraphDemo className="graph" data={graph} country={selectedCountry}></GraphDemo>
            </div>
            {/* <GraphDemo data={country==""?graph:graph['timeline']} country={selectedCountry}></GraphDemo> */} 
            <div className="tablediv"> 
              <div className="caseTableContainer">
              <h1>Today Cases</h1>
                <div className="casesTable">
                  <Totaldemo></Totaldemo>
                </div>
              </div>
              <div className="caseTableContainer">
              <h1>Today Deaths</h1>
              <div className="casesTable">
                <TotalDeaths></TotalDeaths>
                </div>
              </div> 
            </div>
            
          </div>
        </div>

        <footer>
          <h2 style={{fontSize:"25px"}} >Creator :TG |@2021</h2>

          <small style={{fontSize:"15px", margin:"0px" ,padding:"0px" }}>*****The data has been taken from the diseases.sh api*****</small>
        <ul className="contact">
          <li><a href="https://github.com/ritendra143"><FontAwesomeIcon color={theme=='light' ? "cyan" : "#012C48"} icon={faGithub}></FontAwesomeIcon></a></li>
          <li><a href="https://www.linkedin.com/in/ritendrasingh-software-developer/"><FontAwesomeIcon color={theme=='light' ? "cyan" : "#012C48"} icon={faLinkedin}></FontAwesomeIcon></a></li>
          <li><a href="mailto:ritendrabhadauriya123@gmail.com"><FontAwesomeIcon color={theme=='light' ? "cyan" : "#012C48"} icon={faEnvelope}></FontAwesomeIcon></a></li>
        </ul>
        </footer>
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
