import React from 'react'



function Cards(props) {

    return (
        <div className="cardStyling ">
            <h2 style={{textAlign:"center"}}>{props.heading}</h2>
             {/* <NumberFormat className="cardfigures" thousandSeparator={true} value={props.count} disabled={true}></NumberFormat>  */}
            <h2>{props.count}</h2>
        </div>
    )
}

export default Cards
