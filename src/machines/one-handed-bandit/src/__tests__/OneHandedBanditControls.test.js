import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import OneHandedBanditControls from '../OneHandedBanditControls';


describe('OneHandedBanditControls Component', () => {
    it('should match snapshot', () => {
        const onStartButtonClicked = jest.fn();
        const onFinishButtonClicked = jest.fn();
        
        const component = renderer.create(
            <OneHandedBanditControls
                isSpinning={false}
                onStartButtonClicked={onStartButtonClicked}
                onFinishButtonClicked={onFinishButtonClicked}
            />
        );

        const tree = component.toJSON();

        expect(tree).toMatchSnapshot();
    })

    it('should pass isDisabled props to the buttons properly', () => {
        const onStartButtonClicked = jest.fn();
        const onFinishButtonClicked = jest.fn();
        
        const component = renderer.create(
            <OneHandedBanditControls
                isSpinning={false}
                onStartButtonClicked={onStartButtonClicked}
                onFinishButtonClicked={onFinishButtonClicked}
            />
        );

        const finishButton = component.root.findByProps({ title: 'Finish' });
        const startButton = component.root.findByProps({ title: 'Start' });

        expect(finishButton.props.isDisabled).toBe(true);
        expect(startButton.props.isDisabled).toBe(false);

        component.update(
            <OneHandedBanditControls
                isSpinning={true}
                onStartButtonClicked={onStartButtonClicked}
                onFinishButtonClicked={onFinishButtonClicked}
            />
        );

        expect(finishButton.props.isDisabled).toBe(false);
        expect(startButton.props.isDisabled).toBe(true);
    });

    it('should propagate the click event when it arises', () => {
        const onStartButtonClicked = jest.fn();
        const onFinishButtonClicked = jest.fn();
        
        const component = renderer.create(
            <OneHandedBanditControls
                isSpinning={false}
                onStartButtonClicked={onStartButtonClicked}
                onFinishButtonClicked={onFinishButtonClicked}
            />
        );

        const startButton = component.root.findByProps({ title: 'Start' });

        startButton.props.onClick();

        expect(onStartButtonClicked).toHaveBeenCalled();
    })
});
