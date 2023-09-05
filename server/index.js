const db_config = require("./models/db");
const express =  db_config.express;
const app = db_config.getExpress();
const db = db_config.getDB();


app.post("/create_client", async (req, res) => {
    const name = req.body.name;

    try {
        const result = await db.query("INSERT into clients values (NULL, ?)", [name]);
        res.send("Client registered successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
    }
});



app.get("/list_client", async (req, res) => {
    try {
        const result = await db.query("SELECT * from clients");
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
    }
});


app.post("/create_item", async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const url = req.body.url;
    const price = req.body.price;

    try {
        const result = await db.query("INSERT into items values (NULL,?,?,?,?)", [title, description, url, price]);
        res.send("Item registered successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
    }
});


app.get("/list_items", async (req, res) => {
    try {
        const result = await db.query("SELECT * from items");
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
    }
});

app.get("/list_status", async (req, res) => {
    try {
        const result = await db.query("SELECT * from status");
        res.json(result[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
    }
});

app.get("/list_orders", async (req, res) => {
    try {
        const query = `
            SELECT 
                o.id as id, 
                o.create_date, 
                s.name as status, 
                s.id as status_id, 
                c.name as client, 
                c.id as client_id, 
                o.shipping_address, 
                o.shipping_promise, 
                i.title as item, 
                i.id as item_id, 
                o.quantity 
            FROM orders o
            INNER JOIN clients c ON o.client_id = c.id
            INNER JOIN items i ON o.item_id = i.id
            INNER JOIN status s ON o.status_id = s.id
        `;
        
        const result = await db.query(query);
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
    }
});


app.post("/create_order", async (req, res) => {
    const { client, createDate, shippingAddress, shippingPromise, status, item, quantity } = req.body;

    try {
        const query = `
            INSERT INTO orders (create_date, status_id, client_id, shipping_address, shipping_promise, item_id, quantity)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        
        await db.query(query, [createDate, status, client, shippingAddress, shippingPromise, item, quantity]);
        res.send("Order registered successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
    }
});


app.put("/update", async (req, res) => {
    const { id, client, createDate, shippingAddress, shippingPromise, status, item, quantity } = req.body;

    try {
        const query = `
            UPDATE orders
            SET create_date = ?, status_id = ?, client_id = ?, shipping_address = ?, shipping_promise = ?, item_id = ?, quantity = ?
            WHERE id = ?
        `;
        
        await db.query(query, [createDate, status, client, shippingAddress, shippingPromise, item, quantity, id]);
        res.send("Order updated successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
    }
});


app.listen(3001, ()=>{
    console.log("corriendo en el puerto 3001");
})