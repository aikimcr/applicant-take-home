import { render, screen } from '../../../testing/test-utils';
import React from 'react';
import '@testing-library/jest-dom';

import { CheckoutCostSummary } from './checkout-cost-summary';
import { PrizeoutOfferValueOptions } from '../../../slices/offers-slice';
import { click } from '@testing-library/user-event/dist/click';

describe('Test CheckoutCostSummary', () => {
    test('Component matches snapshot', () => {
        const testCard: PrizeoutOfferValueOptions = {
            checkout_value_id: 'xyzzy',
            cost_in_cents: 1212,
            display_bonus: 33,
            display_monetary_bonus: null,
            value_in_cents: 1612,
        };

        const { asFragment } = render(<CheckoutCostSummary giftcard={testCard} />);
        expect(asFragment()).toMatchSnapshot();
    });

    test('show display_bonus (percentage) if it is defined', () => {
        const testCard: PrizeoutOfferValueOptions = {
            checkout_value_id: 'xyzzy',
            cost_in_cents: 1212,
            display_bonus: 33,
            display_monetary_bonus: null,
            value_in_cents: 1612,
        };

        render(<CheckoutCostSummary giftcard={testCard} />);

        expect(screen.getByText('Prizeout Bonus(33%)')).toBeVisible();
        expect(screen.getByText('$4.00')).toBeVisible();
    });

    test('show display_monetary bonus if it is defined', () => {
        const testCard: PrizeoutOfferValueOptions = {
            checkout_value_id: 'xyzzy',
            cost_in_cents: 1212,
            display_bonus: null,
            display_monetary_bonus: 200,
            value_in_cents: 1412,
        };

        render(<CheckoutCostSummary giftcard={testCard} />);

        expect(screen.getByText('Prizeout Bonus')).toBeVisible();
        expect(screen.getByText('$2.00')).toBeVisible();
    });

    test('show display_monetary bonus if display_bonus is zero', () => {
        const testCard: PrizeoutOfferValueOptions = {
            checkout_value_id: 'xyzzy',
            cost_in_cents: 1212,
            display_bonus: 0,
            display_monetary_bonus: 200,
            value_in_cents: 1412,
        };

        render(<CheckoutCostSummary giftcard={testCard} />);

        expect(screen.getByText('Prizeout Bonus')).toBeVisible();
        expect(screen.getByText('$2.00')).toBeVisible();
    });

    test('hide the bonus line if neither value is defined', () => {
        const testCard: PrizeoutOfferValueOptions = {
            checkout_value_id: 'xyzzy',
            cost_in_cents: 1212,
            display_bonus: null,
            display_monetary_bonus: null,
            value_in_cents: 1212,
        };

        render(<CheckoutCostSummary giftcard={testCard} />);

        expect(screen.queryByText(/Prizeout Bonus/)).not.toBeInTheDocument();
    });

    test('hide the bonus line if both values are zero', () => {
        const testCard: PrizeoutOfferValueOptions = {
            checkout_value_id: 'xyzzy',
            cost_in_cents: 1212,
            display_bonus: 0,
            display_monetary_bonus: 0,
            value_in_cents: 1212,
        };

        render(<CheckoutCostSummary giftcard={testCard} />);

        expect(screen.queryByText(/Prizeout Bonus/)).not.toBeInTheDocument();
        expect(screen.queryByText('$0.00')).not.toBeInTheDocument();
    });
});
