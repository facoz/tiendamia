import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CreateOrder, ListOrders } from './models/orders';
import { CreateClient } from './models/client';
import { CreateItem } from './models/items';

function App() {
  const [view, setView] = useState('createOrder');
  const [vals, setVals] = useState({});

  const changeView = (newView) => {
    setView(newView);
  };

  const renderView = () => {
    switch (view) {
      case 'createOrder':
        return <div> <CreateOrder vals={vals} /> <ListOrders setVals={setVals} /></div>;
      case 'createClient':
        return <CreateClient />;
      case 'createItem':
        return <CreateItem />;
      default:
        return <ListOrders setVals={setVals} />;
    }
  };

  return (
    <div className="container">
      <div className="App">
        <br/>
        <div>
          <button className='btn btn-dark' onClick={() => changeView('createOrder')}>Create & list Order</button>
          <button className='btn btn-dark' onClick={() => changeView('createClient')}>Create Client</button>
          <button className='btn btn-dark' onClick={() => changeView('createItem')}>Create Item</button>
        </div>
        <br />
        {renderView()}
      </div>
    </div>
  );
}

export default App;
