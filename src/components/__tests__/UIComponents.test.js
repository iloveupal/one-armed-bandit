import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Button from '../Button';
import Label from '../Label';
import Row from '../Row';


describe('Ui Components', () => {
    test('Button component should match snapshot', () => {
        const component = renderer.create(
            <Button
                title="test"
                onClick={jest.fn()}
            />
        );

        expect(component.toJSON()).toMatchSnapshot();

        component.update(
            <Button
                title="test"
                onClick={jest.fn()}
                isDisabled
            />
        );

        expect(component.toJSON()).toMatchSnapshot();

        component.update(
            <Button
                title="test"
                onClick={jest.fn()}
                secondary
            />
        );

        expect(component.toJSON()).toMatchSnapshot();
    });

    test('Label component should match snapshot', () => {
        const component = renderer.create(
            <Label
                title="test"
            />
        );

        expect(component.toJSON()).toMatchSnapshot();
    });

    test('Row component should match snapshot', () => {
        const component = renderer.create(
            <Row>
                <div />
                <div />
                <div />
            </Row>
        );

        expect(component.toJSON()).toMatchSnapshot();
    });
});