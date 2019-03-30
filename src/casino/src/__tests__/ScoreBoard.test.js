import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import ScoreBoard from '../ScoreBoard';
import Label from 'Components/Label';


const getLabel = (points) => `You have earned ${points} points in total!`;

describe('ScoreBoard component', () => {
    it('should match snapshot', () => {
        const component = renderer.create(
            <ScoreBoard
                points={200}
            />
        );

        expect(component.toJSON()).toMatchSnapshot();
    });

    it('should reflect the current score on the child label', () => {
        const component = renderer.create(
            <ScoreBoard
                points={200}
            />
        );

        expect(component.root.findByType(Label).props.title).toEqual(getLabel(200));

        component.update(
            <ScoreBoard
                points={201}
            />
        );

        expect(component.root.findByType(Label).props.title).toEqual(getLabel(201));
    });
});