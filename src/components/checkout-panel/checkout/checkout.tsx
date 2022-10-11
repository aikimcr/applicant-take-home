import React from 'react';
import PropTypes from 'prop-types';
import { useAppSelector } from '../../../hooks';
import { getActiveOffer, getCurrentOfferRequest } from '../../../slices/offers-slice';
import { GiftCard } from '../../common';
import checkoutPanelViewWrapper, { SetViewProps } from '../view-wrapper';
import CheckoutButton from './checkout-button';
import CheckoutOptions from './checkout-options';

import './checkout.less';

async function fakeFetcher(url: any, options: any) {
    console.log(url, options);
    return { msg: 'Okay' };
}

const CheckoutPanelView: React.FC<SetViewProps> = ({ setView }): React.ReactElement => {
    const activeOffer = useAppSelector(getActiveOffer);
    const offerRequest = useAppSelector(getCurrentOfferRequest);

    async function doCheckout() {
        if (offerRequest == null) {
            return;
        }

        await fakeFetcher('fake_host/checkout', {
            body: JSON.stringify(offerRequest),
            headers: {
                'content-type': 'application/json',
            },
            method: 'POST',
            mode: 'cors',
        });

        setView('checkout-confirmation');
    }

    return (
        <section className="checkout">
            {activeOffer ? (
                <div className="grid grid--top-bottom grid--stretch-top">
                    <div className="grid__item">
                        <section className="checkout__brand">
                            <div className="grid grid--top-bottom grid-stretch-top">
                                <div className="grid__item">
                                    <GiftCard
                                        name={activeOffer.name}
                                        imgUrl={activeOffer.image_url}
                                        altText={activeOffer.name}
                                        className="offer"
                                    />
                                </div>
                                <div className="grid__item">
                                    <CheckoutOptions offer={activeOffer} />
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="grid__item">
                        <section className="checkout__calculation">
                            <CheckoutButton onClick={doCheckout} />
                        </section>
                    </div>
                </div>
            ) : null}
        </section>
    );
};

CheckoutPanelView.propTypes = {
    setView: PropTypes.func,
};

export default checkoutPanelViewWrapper(CheckoutPanelView, 'checkout');
