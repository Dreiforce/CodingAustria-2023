import React from 'react';

function MapView() {

var test = (e) => {
    var rect = e.target.getBoundingClientRect();
    var x = (e.clientX - rect.left) / (rect.right - rect.left); //x position within the element.
    var y = (e.clientY - rect.top) / (rect.bottom - rect.top);  //y position within the element.
    console.log("map pressed on position " + x + " " + y)
}

    return (
<div onClick={test} style={{background: "#ff3030", height:"100vh"}}>

</div>
    );
}
 
export default MapView;