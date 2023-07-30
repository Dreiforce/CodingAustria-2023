import React from 'react';

import { socket } from '../lib/netcode.js'

import SomeUser from '../components/SomeUser'

function Admin({userstate, connected}) {
    
    if(connected) {
        socket.emit('make_admin', {socketID: socket.id})
    }


    return (
        <div>
            <h1 style={{margin: "10px"}}> Admin View</h1>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous"></link>

            <ul>
            {
                Object.keys(userstate).filter(key => key !== "admin").map(key => <SomeUser mystate={userstate[key]}></SomeUser>)
            }
           </ul>
        </div>
    );
}

export default Admin;