import ReactDOM from 'react-dom';
import React from 'react';

import { App } from './App';
import OneHandedBandit from './machines/one-handed-bandit';


ReactDOM.render(
    <App
        Machine={OneHandedBandit}
    />,
    document.getElementById('app'),
);