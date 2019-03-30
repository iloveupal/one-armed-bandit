import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components'

import OneHandedBanditSpinner from '../OneHandedBanditSpinner';


describe('OneHandedBanditSpinner Component', () => {
    it('should match the snapshot', () => {
        const component = renderer.create(
            <OneHandedBanditSpinner
                isSpinning={false}
                slotsCount={4}
                possibleSlotValues={['banana']}
                slotImagesMap={{
                    banana: 'img'
                }}
                onRoundFinished={jest.fn()}
            />
        );

        const tree = component.toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should call internal method startSpinning when the prop isSpinning changes to true', () => {
        const startSpinning = jest.fn();

        const component = renderer.create(
            <OneHandedBanditSpinner
                isSpinning={false}
                slotsCount={3}
                possibleSlotValues={['banana']}
                slotImagesMap={{
                    banana: 'img'
                }}
                onRoundFinished={jest.fn()}
            />
        );

        component.root.instance.startSpinning = startSpinning;

        component.update(
            <OneHandedBanditSpinner
                isSpinning={true}
                slotsCount={3}
                possibleSlotValues={['banana']}
                slotImagesMap={{
                    banana: 'img'
                }}
                onRoundFinished={jest.fn()}
            />
        );

        expect(startSpinning).toHaveBeenCalledTimes(1);
    });

    
    it('should call the onRoundFinished prop when the prop isSpinning changes to false', () => {
        const onRoundFinished = jest.fn();
        
        const component = renderer.create(
            <OneHandedBanditSpinner
                isSpinning={true}
                slotsCount={3}
                possibleSlotValues={['banana']}
                slotImagesMap={{
                    banana: 'img'
                }}
                onRoundFinished={onRoundFinished}
            />
        );

        component.update(
            <OneHandedBanditSpinner
                isSpinning={false}
                slotsCount={3}
                possibleSlotValues={['banana']}
                slotImagesMap={{
                    banana: 'img'
                }}
                onRoundFinished={onRoundFinished}
            />
        );

        expect(onRoundFinished).toHaveBeenCalledWith(['banana', 'banana', 'banana']);
    });
});
