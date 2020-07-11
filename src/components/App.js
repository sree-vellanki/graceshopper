import React, { useState, useEffect } from 'react';

import {
  ProductsList
} from './index';

const App = () => {
  // const [message, setMessage] = useState('');

  // useEffect(() => {
  //   getSomething()
  //     .then(response => {
  //       setMessage(response.message);
  //     })
  //     .catch(error => {
  //       setMessage(error.message);
  //     });
  // });

  return (
    <div className="App">
      TEST:
      <ProductsList />
    </div>
  );
}

export default App;