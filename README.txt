"Hi Devs,

My simple idea to solve the test is the following:

-The first and default view is the order (for simplicity, I decided to join the create and the list with the reports view).
-But first, before creating an order, you need to create at least one client and one item (because they have a one-to-many relationship with the orders).
-Then, when at least one client and one item have been created, you can create the order by selecting the status. (I initially considered setting a default status, but for testing and simplicity, I decided to allow users to choose the status.) After selecting the status, you can choose the client and fill in the other fields. The order will be created."
-"Then, for the reports (which were in the order view), I decided to simplify it based on my experience. I added a select field with status options that filter the results when you choose any option, and you can further narrow down the results by selecting dates."
-Finally to run the project run the command "docker-compose up" 
NOTE: I let a command and a file to create & fill the database with data to test


Application Services

Create a Client
HTTP Method: POST
Route: /create_client
Description: This service allows registering a new client in the database.
Request Format:

json
{
    "name": "Client's Name"
}
Successful Response Format:
"Client registered successfully"

List Clients
HTTP Method: GET
Route: /list_client
Description: This service returns a list of all clients registered in the database.
Successful Response Format:

json
[
    {
        "id": 1,
        "name": "Client's Name"
    },
    {
        "id": 2,
        "name": "Another Client"
    }
]
Create an Item
HTTP Method: POST
Route: /create_item
Description: This service allows registering a new item in the database.
Request Format:

json
{
    "title": "Item Title",
    "description": "Item Description",
    "url": "Item URL",
    "price": 20.99
}
Successful Response Format:
"Item registered successfully"

List Items
HTTP Method: GET
Route: /list_items
Description: This service returns a list of all items registered in the database.
Successful Response Format:

json
[
    {
        "id": 1,
        "title": "Item Title",
        "description": "Item Description",
        "url": "Item URL",
        "price": 20.99
    },
    {
        "id": 2,
        "title": "Another Item",
        "description": "Item Description",
        "url": "Another URL",
        "price": 15.99
    }
]
List Status
HTTP Method: GET
Route: /list_status
Description: This service returns a list of all available statuses in the database.
Successful Response Format:

json
[
    {
        "id": 1,
        "name": "Status 1"
    },
    {
        "id": 2,
        "name": "Status 2"
    }
]
List Orders
HTTP Method: GET
Route: /list_orders
Description: This service returns a list of all orders registered in the database, including details about the client, item, and the status of each order.
Successful Response Format:

json
[
    {
        "id": 1,
        "create_date": "2023-09-05",
        "status": "Status 1",
        "status_id": 1,
        "client": "Client 1",
        "client_id": 1,
        "shipping_address": "Shipping Address 1",
        "shipping_promise": "2023-09-10",
        "item": "Item 1",
        "item_id": 1,
        "quantity": 2
    },
    {
        "id": 2,
        "create_date": "2023-09-06",
        "status": "Status 2",
        "status_id": 2,
        "client": "Client 2",
        "client_id": 2,
        "shipping_address": "Shipping Address 2",
        "shipping_promise": "2023-09-12",
        "item": "Item 2",
        "item_id": 2,
        "quantity": 1
    }
]
Create an Order
HTTP Method: POST
Route: /create_order
Description: This service allows registering a new order in the database.
Request Format:

json
{
    "client": 1,
    "createDate": "2023-09-07",
    "shippingAddress": "New Shipping Address",
    "shippingPromise": "2023-09-15",
    "status": 1,
    "item": 3,
    "quantity": 3
}
Successful Response Format:
"Order registered successfully"

Update an Order
HTTP Method: PUT
Route: /update
Description: This service allows updating an existing order in the database.
Request Format:

json
{
    "id": 1,
    "client": 2,
    "createDate": "2023-09-08",
    "shippingAddress": "Updated Shipping Address",
    "shippingPromise": "2023-09-20",
    "status": 2,
    "item": 4,
    "quantity": 4
}
Successful Response Format:
"Order updated successfully"