import { render, screen } from '../../../testing/test-utils';
import React from 'react';
import '@testing-library/jest-dom';

import { CheckoutOptionsButtons } from './checkout-options-buttons';
import { PrizeoutOfferValueOptions } from '../../../slices/offers-slice';

describe('Test CheckoutOptionsButtonse', () => {
    const testCards: PrizeoutOfferValueOptions[] = [
        {
            checkout_value_id: 'xyzzy1',
            cost_in_cents: 340,
            display_bonus: 10,
            display_monetary_bonus: null,
            value_in_cents: 374,
        },
        {
            checkout_value_id: 'xyzzy2',
            cost_in_cents: 1020,
            display_bonus: null,
            display_monetary_bonus: 200,
            value_in_cents: 1230,
        },
    ];

    test('Component matches snapshot', () => {
        const newCardHandler = jest.fn();
        const { asFragment } = render(
            <CheckoutOptionsButtons giftcardList={testCards} onNewGiftCard={newCardHandler} />,
        );
        expect(asFragment()).toMatchSnapshot();
    });

    test('Change giftcard index', () => {
        const newCardHandler = jest.fn();
        render(<CheckoutOptionsButtons giftcardList={testCards} onNewGiftCard={newCardHandler} />);

        const firstButton = screen.getByText('$3.40');
        firstButton.click();

        expect(newCardHandler).toBeCalledTimes(1);
        expect(newCardHandler).toBeCalledWith(0);
    });
});
