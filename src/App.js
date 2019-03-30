import React, { PureComponent } from 'react';

import Casino from './casino';
import OneHandedBandit from './machines/one-handed-bandit';


export class App extends PureComponent {
    render () {
        return (
            <Casino
                Machine={OneHandedBandit}
            />
        );
    }
}