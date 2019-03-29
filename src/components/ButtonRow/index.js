import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const ButtonRowDiv = styled.div`
    display: flex;
    flex-flow: row no-wrap;
    justify-content: flex-start;
`;


export default class ButtonRow extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    render () {
        return (
            <ButtonRowDiv>
                { this.props.children }
            </ButtonRowDiv>
        );
    }
}