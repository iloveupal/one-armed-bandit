import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const SlotImage = styled.img`
    width: 100px;
    height: 100px;
`;

export default class SlotComponent extends PureComponent {
    static propTypes = {
        slot: PropTypes.string.isRequired,
        slotImagesMap: PropTypes.object.isRequired,
    }

    render () {
        return (
            <SlotImage src={this.props.slotImagesMap[this.props.slot]} />
        );
    }
}
