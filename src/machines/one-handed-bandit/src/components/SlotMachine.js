import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const SlotDiv = styled.div`
    display: flex;
    flex-flow: row no-wrap;
    justify-content: center;
    align-items: center;
`;

export default class SlotMachine extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
    }

    render () {
        return (
            <SlotDiv>
                { this.props.children }
            </SlotDiv>
        );
    }
}
