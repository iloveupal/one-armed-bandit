import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import SlotMachine from './components/SlotMachine';
import SlotComponent from './components/SlotComponent';

import {
    selectRandomSlotValues,
    initializeSpinnerIntervals,
    getNextSlotsState,
    generateSlotGraph,
} from './OneHandedBanditUtils';


export default class OneHandedBanditSpinner extends PureComponent {
    static propTypes = {
        isSpinning: PropTypes.bool.isRequired,
        slotsCount: PropTypes.number.isRequired,
        possibleSlotValues: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        slotImagesMap: PropTypes.object.isRequired,
        onRoundFinished: PropTypes.func.isRequired,
    }

    spinnerIntervals = [];
    // a map that will help the update fn transition between possible slot values faster.
    // will look like { <prevSlotValue>: <nextSlotValue> }; 
    slotGraph = null;

    constructor (props) {
        super(props);

        this.slotGraph = generateSlotGraph(props.possibleSlotValues);

        this.state = {
            slots: selectRandomSlotValues(props.slotsCount, props.possibleSlotValues),
        };
    }

    componentDidUpdate(prevProps) {
        if ( prevProps.isSpinning === false && this.props.isSpinning === true ) {
            this.startSpinning();
        }

        if ( prevProps.isSpinning === true && this.props.isSpinning === false ) {
            this.stopSpinning();
        }
    }

    startSpinning = () => {
        this.spinnerIntervals = initializeSpinnerIntervals(this.props.slotsCount, this.updateSlot);
    }

    stopSpinning = () => {
        this.spinnerIntervals.forEach((timerId) => clearInterval(timerId));
        this.spinnerIntervals = [];

        this.props.onRoundFinished(this.state.slots);
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
        });
    }

    render () {
        return (
            <SlotMachine>
                { this.state.slots.map((slot, index) => (
                    <SlotComponent
                        slot={slot}
                        slotImagesMap={this.props.slotImagesMap}
                        key={index}
                    />
                )) }
            </SlotMachine>
        );
    }
}
