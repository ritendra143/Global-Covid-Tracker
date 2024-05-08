import { createGlobalStyle } from "styled-components"

export const darktheme = {
backgroundColor: "#000000",
backgroundImage: "linear-gradient(147deg, #000000 0%, #012C48 74%)",
headerfontColor : "#012C48",
fontSize : "50px",
headerBackground : "cyan",
color : "cyan"


}

export const lightTheme = {
    backgroundColor: " #757f9a;",
    backgroundImage : "linear-gradient(to right, #757f9a, #d7dde8);",
    headerfontColor : "cyan",
    headerBackground : "#012C48",
    
    // fontSize : "80px"
}

export const GlobalStyles = createGlobalStyle`
html
{
    height : 100%;
    background-size: cover;
    
}
body
{   
    background-color : ${props=>props.theme.backgroundColor};
    background-image : ${props=>props.theme.backgroundImage};    
    background-repeat : no-repeat;
    background-attachment: fixed;
    color : ${props=>props.theme.color};
    
    
}
header
{
    background-color : ${props=>props.theme.headerBackground};
    color : ${props=>props.theme.headerfontColor}
}
footer
{
    background-color : ${props=>props.theme.headerBackground};
    color : ${props=>props.theme.headerfontColor}
}





`