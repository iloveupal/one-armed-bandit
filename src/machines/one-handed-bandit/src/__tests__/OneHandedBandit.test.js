import React from 'react';
import OneHandedBandit from '../OneHandedBandit';
import OneHandedBanditControls from '../OneHandedBanditControls';
import OneHandedBanditSpinner from '../OneHandedBanditSpinner';
import renderer from 'react-test-renderer';

describe('OneHandedBandit Component', () => {
    it('should pass the isSpinning prop to children', () => {
        const onWin = jest.fn();
        
        const component = renderer.create(
            <OneHandedBandit
                onWin={onWin}
            />,
        );

        expect(component.root.findByType(OneHandedBanditSpinner).props.isSpinning).toBe(false);

        component.root.instance.enterSpinningState();

        expect(component.root.findByType(OneHandedBanditSpinner).props.isSpinning).toBe(true);

        component.root.instance.leaveSpinningState();
        
        expect(component.root.findByType(OneHandedBanditSpinner).props.isSpinning).toBe(false);
    });

    it('should call onWin prop with specific amount of points when the spinner calls onRoundFinished with winning slots', () => {
        const onWin = jest.fn();
        const winningSlots = ['banana', 'banana', 'banana'];
        
        const component = renderer.create(
            <OneHandedBandit
                onWin={onWin}
            />,
        );

        component.root.findByType(OneHandedBanditSpinner).props.onRoundFinished(winningSlots);

        expect(onWin).toHaveBeenCalledWith(100);
    });
});
