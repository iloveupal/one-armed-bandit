import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const LabelContainer = styled.div`
    width: 500px;
    height: 30px;
    border-radius: 5px;
    background-color: #27ae60;
    color: white;
    display: flex;
    flex-flow: row no-wrap;
    justify-content: center;
    align-items: center;
    margin: 0 15px;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    font-weight: bold;
`;


export default class Label extends PureComponent {
    static propTypes = {
        title: PropTypes.node.isRequired,
    };

    render () {
        return (
            <LabelContainer>
                <span>{ this.props.title }</span>
            </LabelContainer>
        );
    }
}
