import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { BrowserRouter as Router } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';
import { ColorModeScript } from '@chakra-ui/react';
import theme from './theme';

ReactDOM.render(
    //Wrapping ChakraProvider at the root of our app
    <ChakraProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Router>
                <App/> 
             </Router>
    </ChakraProvider>

    , document.getElementById('root')
);