import React from 'react';

import { socket } from '../lib/netcode.js'


function Admin({userstate, connected}) {
    
    if(connected) {
        socket.emit('make_admin', {socketID: socket.id})
    }


    return (
        <div>
            Adminview
            <ul>
            {
                Object.keys(userstate).filter(key => key !== "admin").map(key => <li>{key}: {

                    JSON.stringify(userstate[key])

                }</li>)
            }
           </ul>
        </div>
    );
}

export default Admin;