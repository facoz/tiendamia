import { useState, useEffect} from "react";
import Axios from "axios";
import {ListClients} from './client';
import {ListItems} from './items';
import GetStatus from './status';
import 'bootstrap/dist/css/bootstrap.min.css';
import Moment from 'moment';

export function CreateOrder({vals}) {
    const [createDate, setCreateDate] = useState("");
    const [client, setClient] = useState(0);
    const [status, setStatus] = useState(0);
    const [item, setItems] = useState(0);
    const [shippingAddress, setShippingAddress] = useState("");
    const [shippingPromise, setShippingPromise] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [id, setId] = useState(0);
    const [edit, setEdit] = useState(false);

    useEffect( ()=> {
        setInputsValues(vals);
    },[vals])
    
    const setInputsValues = (vals)=>{
        if(vals.id){
            setEdit(true);
    
            setId(vals.id);
            setCreateDate(Moment(vals.create_date).format("yyyy-MM-DD"));
            setClient(vals.client_id);
            setStatus(vals.status_id);
            setItems(vals.item_id);
            setShippingAddress(vals.shipping_address);
            setShippingPromise(Moment(vals.shipping_promise).format("yyyy-MM-DD"));
            setQuantity(vals.quantity);
        }
    }

    const editOrder = ()=>{
        if (id){
            Axios.put("http://localhost:3001/update",{
                id:id,
                client:client,
                createDate:createDate,
                shippingAddress:shippingAddress,
                shippingPromise:shippingPromise,
                status:status,
                item:item,
                quantity:quantity,
            }).then(()=>{
                alert("Order Updated");
            });
        }
    }

    const createOrder = ()=>{
        Axios.post("http://localhost:3001/create_order",{
        client:client,
        createDate:createDate,
        shippingAddress:shippingAddress,
        shippingPromise:shippingPromise,
        status:status,
        item:item,
        quantity:quantity,
        }).then(()=>{
            alert("Order Created");
        });
    }

    return (
        <div className="card text-center">
            <div className="card-header">
                Create Order
            </div>
            <div className="card-body">
                <div className="order">
                    <GetStatus selectedStatus={status} statusSeted={setStatus}/>
                    <ListClients selectdClient = {client} setClient={setClient}/>
                    <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">Create Date</span>
                        <input onChange={(event)=>{
                            setCreateDate(event.target.value);
                        }} type="date" value={createDate} className="form-date" placeholder="order" aria-label="order" aria-describedby="addon-wrapping"/>
                    </div>
                    <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">Shipping Address</span>
                        <input onChange={(event)=>{
                        setShippingAddress(event.target.value);
                        }} type="text" value={shippingAddress} className="form-control" placeholder="Shipping Address" aria-label="Shipping Address" aria-describedby="addon-wrapping"/>
                    </div>
                    <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">Shipping date</span>
                        <input onChange={(event)=>{
                        setShippingPromise(event.target.value);
                    }} type="date" value={shippingPromise} className="form-date" placeholder="Shipping date" aria-label="Shipping date" aria-describedby="addon-wrapping"/>
                    </div>
                    <ListItems selectedItem={item} itemSeted={setItems}/>
                    <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">Quantity</span>
                        <input onChange={(event)=>{
                        setQuantity(event.target.value);
                    }} type="number" value={quantity} className="form-date" placeholder="quantity" aria-label="quantity" aria-describedby="addon-wrapping"/>
                    </div>
                </div>
            </div>
            <div className="card-footer text-body-secondary">
                {edit ? <button className="btn btn-success" onClick={editOrder}>Update</button> : <button className="btn btn-success" onClick={createOrder}>Save</button>}
            </div>
        </div>
        
    )

}

export function ListOrders({ setVals }) {
    const [orders, setOrders] = useState([]);
    const [filterStatus, setFilterStatus] = useState('');
    const [startDate, setStartDate] = useState(''); // Agrega el estado de la fecha de inicio
    const [endDate, setEndDate] = useState(''); // Agrega el estado de la fecha de fin

    useEffect(() => {
    const getOrders = async () => {
        try {
        const response = await Axios.get('http://localhost:3001/list_orders');
        setOrders(response.data);
        } catch (error) {
        console.error('Error fetching orders:', error);
        }
    };
    getOrders();
    }, []);

    const filteredOrders = orders.filter((order) => {
    const statusMatch = filterStatus ? order.status === filterStatus : true;
    const createdDate = Moment(order.create_date).format('yyyy-MM-DD');
    const startDateMatch = startDate
    ? Moment(createdDate).isSameOrAfter(startDate, 'Day')
    : true;
    const endDateMatch = endDate
    ? Moment(createdDate).isSameOrBefore(endDate, 'Day')
    : true;
    console.log(startDate,Moment(order.create_date).format('yyyy-MM-DD'))
    return statusMatch && startDateMatch && endDateMatch;
    });
    return (
        <div>
            <div className="col-md-9">
                <label htmlFor="statusFilter">Filter by Status:</label>
                <select
                id="statusFilter"
                onChange={(e) => setFilterStatus(e.target.value)}
                value={filterStatus}
                className="form-select col-md-3"
                aria-label="status"
                >
                <option value="">All</option>
                <option value="Approve">Approve</option>
                <option value="Cancel">Cancel</option>
                <option value="Delivery">Delivery</option>
                <option value="Traveling">Traveling</option>
                </select>

                <div className="col-md-3">
                <label htmlFor="startDate">Start Date:</label>
                <input
                    type="date"
                    id="startDate"
                    className="form-control"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                </div>

                <div className="col-md-3">
                <label htmlFor="endDate">End Date:</label>
                <input
                    type="date"
                    id="endDate"
                    className="form-control"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                </div>
            </div>

            <table className="table table-striped table-hover">
            <thead>
                <tr>
                <th>Order Id</th>
                <th>Create Date</th>
                <th>Status</th>
                <th>Client</th>
                <th>Shipping Address</th>
                <th>Shipping Promise</th>
                <th>Shipping Item</th>
                <th>Shipping Quantity</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {filteredOrders.map((val) => (
                <tr key={val.id}>
                    <td>{val.id}</td>
                    <td>{Moment(val.create_date).format('yyyy-MM-DD')}</td>
                    <td>{val.status}</td>
                    <td>{val.client}</td>
                    <td>{val.shipping_address}</td>
                    <td>{Moment(val.shipping_promise).format('yyyy-MM-DD')}</td>
                    <td>{val.item}</td>
                    <td>{val.quantity}</td>
                    <td>
                    <button className="btn btn-primary" onClick={() => setVals(val)}>
                        Edit
                    </button>
                    <button className="btn btn-danger">Delete</button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
}
