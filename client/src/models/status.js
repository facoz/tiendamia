import { useState, useEffect} from "react";
import '../App.css';

export default function GetStatus({statusSeted, selectedStatus}) {
    const [status, setStatus] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:3001/list_status")
            .then((data) => data.json())
            .then((val) => setStatus(val));
    }, []);

    return (
        <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
                Status
            </span>
            <select
                className="form-select"
                aria-label="client"
                aria-describedby="addon-wrapping"
                onChange={(e) => statusSeted(e.target.value)}
                value = {selectedStatus}
            >
                <option value="">Select a status</option>
                {status.map((opts, i) => (
                    <option key={i} value={opts.id}>
                        {opts.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
