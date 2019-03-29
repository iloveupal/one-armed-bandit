import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
    SPINNING_TIME,
    STAND_BY_TIME,
    WINNING_RULES,
} from './OneHandedBanditConstants';

import OneHandedBanditControls from './OneHandedBanditControls';
import OneHandedBanditSpinner from './OneHandedBanditSpinner';


export default class OneHandedBandit extends PureComponent {
    static propTypes = {
        onWin: PropTypes.func.isRequired,
    }

    standByModeTimer = null;
    spinningModeTimer = null;


    state = {
        isSpinning: false,
    }

    enterStandByState = () => {
        this.standByModeTimer = setTimeout(this.leaveStandByState, STAND_BY_TIME);
        this.setState({
            isSpinning: false,
        });
    }

    leaveStandByState = () => {
        clearTimeout(this.standByModeTimer);
        this.enterSpinningState();
    }

    enterSpinningState = () => {
        this.spinningModeTimer = setTimeout(this.leaveSpinningState, SPINNING_TIME);
        this.setState({
            isSpinning: true,
        });
    }

    leaveSpinningState = () => {
        clearTimeout(this.spinningModeTimer);
        this.enterStandByState();
    }

    handleRoundFinished = (slots) => {
        const points = calculatePoints(slots, WINNING_RULES);
        if ( points ) {
            this.props.onWin(points);
        }
    }
    
    render () {
        return (
            <fragment>
                <OneHandedBanditSpinner
                    isSpinning={this.state.isSpinning}
                    onRoundFinished={this.handleRoundFinished}
                />
                <OneHandedBanditControls
                    isSpinning={this.state.isSpinning}
                    onStartButtonClicked={this.leaveStandByState}
                    onFinishButtonClicked={this.leaveSpinningState}
                />
            </fragment>
        )
    }
}
