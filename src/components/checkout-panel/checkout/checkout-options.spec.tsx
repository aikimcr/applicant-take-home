import { render, screen } from '../../../testing/test-utils';
import React from 'react';
import '@testing-library/jest-dom';

import { CheckoutOptions } from './checkout-options';
import { PrizeoutOffer } from '../../../slices/offers-slice';

describe('Test CheckoutOptions', () => {
    const testOffer: PrizeoutOffer = {
        checkout_hero_url: null,
        currency_code: 'USD',
        description: '0',
        giftcard_list: [
            {
                checkout_value_id: '775af84c-d388-4da7-b4cf-89f7fee1ebda',
                cost_in_cents: 1470,
                display_bonus: 2.04,
                display_monetary_bonus: null,
                value_in_cents: 1500,
            },
            {
                checkout_value_id: '21a2b9c5-f668-4c04-907b-019c53d72074',
                cost_in_cents: 2450,
                display_bonus: 2.04,
                display_monetary_bonus: null,
                value_in_cents: 2500,
            },
            {
                checkout_value_id: '24ed1a3d-8d86-4c7f-8bc8-1f4c3e6399b8',
                cost_in_cents: 4900,
                display_bonus: 2.04,
                display_monetary_bonus: null,
                value_in_cents: 5000,
            },
        ],
        image_url: 'https://d13080yemosbe2.cloudfront.net/Images/GiftCardFaceplates/External/MAGZ-D-00-16-1_fp01.png',
        is_enabled: true,
        logomark_url: null,
        name: 'Magazines.com',
        stores: [],

        support_creative_list: [],
        tag: null,
    };

    test('Component matches snapshot', () => {
        const newCardHandler = jest.fn();
        const { asFragment } = render(<CheckoutOptions offer={testOffer} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
