import React, { useState, useEffect } from "react";
import Axios from "axios";
import '../App.css';

export function CreateItem() { 
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [price, setPrice] = useState(0);

    const createItem = () => {
        Axios.post("http://localhost:3001/create_item", {
            title: title,
            description: description,
            url: url,
            price: price
        }).then(() => {
            alert("Item Created");
        });
    }

    return (
        <div className="card text-center">
            <div className="card-header">
                Create Item
            </div>
            <div className="card-body">
                <div className="item">
                    <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">Title</span>
                        <input
                            onChange={(event) => {
                                setTitle(event.target.value);
                            }}
                            type="text"
                            className="form-control"
                            placeholder="Title"
                            aria-label="Title"
                            aria-describedby="addon-wrapping"
                        />
                    </div>
                    <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">Description</span>
                        <input onChange={(event)=>{
                        setDescription(event.target.value);
                        }}  type="text" 
                        className="form-control" 
                        placeholder="Description" 
                        aria-label="Description" 
                        aria-describedby="addon-wrapping"/>
                    </div>
                    <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">URL</span>
                        <input onChange={(event)=>{
                        setUrl(event.target.value);
                        }}  type="text" 
                        className="form-control" 
                        placeholder="url" 
                        aria-label="url" 
                        aria-describedby="addon-wrapping"/>
                    </div>
                    <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">PRICE</span>
                        <input onChange={(event)=>{
                        setPrice(event.target.value);
                        }}  type="number" 
                        className="form-control" 
                        placeholder="price" 
                        aria-label="price" 
                        aria-describedby="addon-wrapping"/>
                    </div>
                </div>
            </div>
            <div className="card-footer text-body-secondary">
                <button type="button" className="btn btn-success" onClick={createItem}>Save</button>
            </div>
        </div>
    )
}

export function ListItems({itemSeted, selectedItem}) {
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3001/list_items")
            .then((data) => data.json())
            .then((val) => setItems(val));
    }, []);

    return (
        <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">Item</span>
            <select
                className="form-select"
                aria-label="item"
                aria-describedby="addon-wrapping"
                onChange={(e) => itemSeted(e.target.value)}
                value = {selectedItem}
            >
                <option value="">Select a Item</option>
                {items.map((opts, i) => (
                    <option value={opts.id} key={i}>{opts.title}</option>
                ))}
            </select>
        </div>
    )
}
