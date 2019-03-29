import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { POSSIBLE_SLOTS } from '../OneHandedBanditConstants';


const SlotImage = styled.img`
    width: 100px;
    height: 100px;
`;

export default class SlotComponent extends PureComponent {
    static propTypes = {
        slot: PropTypes.oneOf(Object.keys(POSSIBLE_SLOTS)).isRequired,
    }

    render () {
        return (
            <SlotImage src={POSSIBLE_SLOTS[this.props.slot]} />
        );
    }
}
