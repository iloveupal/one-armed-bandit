import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const RowDiv = styled.div`
    display: flex;
    flex-flow: row no-wrap;
    justify-content: center;
    padding: 20px 0;
`;


export default class Row extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    render () {
        return (
            <RowDiv>
                { this.props.children }
            </RowDiv>
        );
    }
}