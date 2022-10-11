import { render, screen } from '../../../testing/test-utils';
import React from 'react';
import '@testing-library/jest-dom';

import { CheckoutButton } from './checkout-button';

describe('Test CheckoutButtone', () => {
    test('Component matches snapshot', () => {
        const clickHandler = jest.fn();
        const { asFragment } = render(<CheckoutButton onClick={clickHandler} />);
        expect(asFragment()).toMatchSnapshot();
    });

    test('submit giftcard on click', () => {
        const clickHandler = jest.fn();
        render(<CheckoutButton onClick={clickHandler} />);

        const button = screen.getByText('Prizeout Gift Card');
        button.click();

        expect(clickHandler).toBeCalledTimes(1);
    });
});
