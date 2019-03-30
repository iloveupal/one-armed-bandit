import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ScoreBoard from './ScoreBoard';


export default class Casino extends PureComponent {
    static propTypes = {
        Machine: PropTypes.func.isRequired,
    }
    
    state = {
        amountWon: 0,
    }

    _addMoney = (amount) => {
        this.setState((prevState) => ({
            amountWon: prevState.amountWon + amount,
        }));
    }
    
    render () {
        return (
            <div>
                <this.props.Machine
                    onWin={this._addMoney} 
                />
                <ScoreBoard
                    points={this.state.amountWon}
                />
            </div>
        );
    }
}