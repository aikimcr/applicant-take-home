import { render, screen } from '../../../testing/test-utils';
import React from 'react';
import '@testing-library/jest-dom';

import { CheckoutOptionButton } from './checkout-option-button';
import { PrizeoutOfferValueOptions } from '../../../slices/offers-slice';

describe('Test CheckoutOptionButton', () => {
    const testCard: PrizeoutOfferValueOptions = {
        checkout_value_id: 'xyzzy',
        cost_in_cents: 1212,
        display_bonus: 33,
        display_monetary_bonus: null,
        value_in_cents: 1612,
    };

    test('Component matches snapshot', () => {
        const clickHandler = jest.fn();

        const { asFragment } = render(
            <CheckoutOptionButton isChecked={false} giftcard={testCard} onClick={clickHandler} />,
        );

        expect(asFragment()).toMatchSnapshot();
    });

    test('Click handler is called', () => {
        const clickHandler = jest.fn();

        render(<CheckoutOptionButton isChecked={false} giftcard={testCard} onClick={clickHandler} />);

        expect(clickHandler).toBeCalledTimes(0);

        const button = screen.queryByText('$12.12');
        expect(button).toBeVisible();
        button.click();

        expect(clickHandler).toBeCalledTimes(1);
    });
});
