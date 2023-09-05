import React, { useState, useEffect } from "react";
import Axios from "axios";
import '../App.css';

export function CreateClient() {
    const [name, setName] = useState("");

    const createClient = () => {
        Axios.post("http://localhost:3001/create_client", {
            name: name
        }).then(() => {
            alert("Client Created");
        }).catch((e)=>{
            console.log(e);
        });
    }

    return (
        <div className="card text-center">
            <div className="card-header">
                Create Client
            </div>
            <div className="card-body">
                <div className="client">
                    <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">Name</span>
                        <input
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                            type="text"
                            className="form-control"
                            placeholder="Client Name"
                            aria-label="Client Name"
                            aria-describedby="addon-wrapping"
                        />
                    </div>
                </div>
            </div>
            <div className="card-footer text-body-secondary"> {}
                <button className="btn btn-success" onClick={createClient}>Save</button>
            </div>
        </div>
    )
}

export function ListClients({setClient, selectdClient}) {
    const [clients, setClients] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:3001/list_client")
            .then((data) => data.json())
            .then((val) => setClients(val));
    }, []);

    return (
        <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">Client</span>
            <select
                className="form-select"
                aria-label="client"
                aria-describedby="addon-wrapping"
                onChange={(e) => setClient(e.target.value)}
                value = {selectdClient}
            >
                <option value="">Select a Client</option>
                    {clients.map((opts) => (
                        <option value={opts.id} key={opts.id}>{opts.name}</option>
                    ))
                    }
            </select>
        </div>
    )
}