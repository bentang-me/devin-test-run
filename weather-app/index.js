import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';

const WeatherApp = () => {
  return (
    <div>
      <h1>Weather App</h1>
      <p>Welcome to the 8-bit style weather application!</p>
    </div>
  );
};

ReactDOM.render(
  <ChakraProvider>
    <WeatherApp />
  </ChakraProvider>,
  document.getElementById('root')
);
