import React from 'react';
import MapView from './MapView';

function SomeUser({ mystate }) {

    if (mystate.userName == "example") {
        return <div></div>
    }

var getClass =(active)=> {
    if(active) {
        return "btn btn-secondary"
    } else {
        return "btn btn-danger"
    }
}

    return (
        <div className='container' style={{marginBottom: "10px"}}>
            <div class="card" style={{width: "40rem"}}>
                <div class="card-body">
                    <h5 class="card-title">{mystate.userName}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Team status: <span class="badge badge-primary">available</span></h6>
                    {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                    {/* <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a> */}
                    {/* {"userName":"jtesta","spotted":true,"refusedHelp":false,"needAid":false,"arrived":false,"repeat":false,"reinforcements":false} */}
                    
<button type="button" class={getClass(mystate.spotted)}>Spotted</button>
<button type="button" class= {getClass(mystate.refusedHelp)}>Refused Help</button>
<button type="button" class={getClass(mystate.needAid)}>Need Aid</button>
<button type="button" class={getClass(mystate.arrived)}>Arrived</button>
<button type="button" class={getClass(mystate.repeat)}>Repeat</button>
<button type="button" class={getClass(mystate.reinforcements)}>Reinforcements</button>
                </div>
</div>

            {/* <input type="text" value={JSON.stringify(mystate)} /> */}

        </div>
    );
}

export default SomeUser;