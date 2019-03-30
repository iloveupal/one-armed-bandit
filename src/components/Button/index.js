import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const ButtonContainer = styled.div`
    width: 200px;
    height: 45px;
    border-radius: 5px;
    background-color: ${props => (props.secondary) ? '#fff' : '#2d3436'};
    color: ${props => (props.secondary) ? '#2d3436' : '#fff'};
    opacity: ${props => (props.isDisabled) ? 0.5 : 1};
    display: flex;
    flex-flow: row no-wrap;
    justify-content: center;
    align-items: center;
    border: 2px solid #2d3436;
    margin: 0 15px;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    font-weight: bold;
    cursor: pointer;
`;


export default class Button extends PureComponent {
    static propTypes = {
        title: PropTypes.node.isRequired,
        isDisabled: PropTypes.bool,
        secondary: PropTypes.bool,
        onClick: PropTypes.func.isRequired,
    };

    handleClick = () => {
        if ( !this.props.isDisabled ) {
            this.props.onClick();
        }
    }

    render () {
        return (
            <ButtonContainer
                isDisabled={this.props.isDisabled}
                secondary={this.props.secondary}
                onClick={this.handleClick}
            >
                <span>{ this.props.title }</span>
            </ButtonContainer>
        );
    }
}
