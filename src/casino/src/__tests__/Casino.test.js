import React from 'react';
import renderer from 'react-test-renderer';

import Casino from '../Casino';
import OneHandedBandit from 'Root/machines/one-handed-bandit';
import ScoreBoard from '../ScoreBoard';


describe('Casino component', () => {
    it('when the child prop onWin is called, it should update the total amount of points on the ScoreBoard child component', () => {
        const component = renderer.create(
            <Casino
                Machine={OneHandedBandit}
            />
        );

        component.root.findByType(OneHandedBandit).props.onWin(50);
        component.root.findByType(OneHandedBandit).props.onWin(120);
        component.root.findByType(OneHandedBandit).props.onWin(300);

        expect(component.root.findByType(ScoreBoard).props.points).toEqual(470);
    });
});