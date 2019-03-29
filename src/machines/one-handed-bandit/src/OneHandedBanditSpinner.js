import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import SlotMachine from 'Components/SlotMachine';
import SlotComponent from 'Components/SlotComponent';

import {
    selectRandomSlotValues,
    initializeSpinnerIntervals,
    getNextSlotsState,
    generateSlotGraph,
} from './OneHandedBanditUtils';


export class OneHandedBanditSpinnerPure extends PureComponent {
    static propTypes = {
        SlotComponent: PropTypes.element.isRequired,
        isSpinning: PropTypes.bool.isRequired,
        slotsCount: PropTypes.number.isRequired,
        possibleSlotValues: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        onFinishedSpinning: PropTypes.func.isRequired,
    }

    spinnerIntervals = [];
    // a map that will help the update fn transition between possible slot values faster.
    // will look like { <prevSlotValue>: <nextSlotValue> }; 
    slotGraph = null;

    constructor (props) {
        super(props);

        this.slotGraph = generateSlotGraph(props.possibleSlotValues);

        this.setState({
            slots: selectRandomSlotValues(props.slotsCount, props.possibleSlotValues),
        });
    }

    startSpinning = () => {
        this.spinnerIntervals = initializeSpinnerIntervals(this.props.slotsCount, this.updateSlot);
    }

    stopSpinning = () => {
        this.spinnerIntervals.forEach((timerId) => clearInterval(timerId));
        this.spinnerIntervals = [];

        this.props.onFinishedSpinning(this.state.slots);
    }

    updateSlot = (slotIndex) => {
        this.setState((prevState) => {
            return {
                slots: getNextSlotsState({
                    currentSlotsState: prevState.slots,
                    slotGraph: this.slotGraph,
                    slotIndexToUpdate: slotIndex,
                }),
            };
        })
    }

    render () {
        return (
            <SlotMachine>
                { this.state.slots.map((slot, index) => (
                    <this.props.SlotComponent
                        slot={slot}
                        key={index}
                    />
                )) }
            </SlotMachine>
        );
    }
}

