import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Button from 'Components/Button';
import Row from 'Components/Row';


export default class OneHandedBanditControls extends PureComponent {
    static propTypes = {
        onStartButtonClicked: PropTypes.func.isRequired,
        onFinishButtonClicked: PropTypes.func.isRequired,
        isSpinning: PropTypes.bool.isRequired,
    }

    render () {
        return (
            <Row>
                <Button
                    title="Start"
                    isDisabled={this.props.isSpinning}
                    onClick={this.props.onStartButtonClicked}
                />
                <Button
                    title="Finish"
                    isDisabled={!this.props.isSpinning}
                    secondary
                    onClick={this.props.onFinishButtonClicked}
                />
            </Row>
        );
    }
}
