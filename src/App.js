import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


export class App extends PureComponent {
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
            </div>
        );
    }
}