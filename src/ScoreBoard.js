import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Label from 'Components/Label';
import Row from 'Components/Row';


export default class ScoreBoard extends PureComponent {
    static propTypes = {
        points: PropTypes.number.isRequired,
    }
    
    render () {
        return (
            <Row>
                <Label
                    title={`You have earned ${this.props.points} points in total!`}
                />
            </Row>
        )
    }
}
