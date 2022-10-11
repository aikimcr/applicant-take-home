import React from 'react';
import PropTypes from 'prop-types';
import checkoutPanelViewWrapper, { SetViewProps } from '../view-wrapper';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks';
import { getActiveOffer, getCurrentGiftCard, setActiveOffer } from '../../../slices/offers-slice';
import { AppDispatch } from '../../../store';

import './checkout-confirmation.less';
import { Button } from '../../common';

const CheckoutConfirmationPanelView: React.FC<SetViewProps> = ({ setView }): React.ReactElement => {
    const activeOffer = useAppSelector(getActiveOffer);
    const giftcard = useAppSelector(getCurrentGiftCard);
    const dispatch = useDispatch<AppDispatch>();

    async function confirmDone() {
        dispatch(setActiveOffer(null));
        setView('checkout');
    }

    const redemptionAmount = giftcard ? (giftcard.cost_in_cents / 100).toFixed(2) : '';
    const name = activeOffer ? activeOffer.name : '';

    // The text here would need to be reviewed and approve by UX/Design
    return (
        <section className="checkout-confirmation">
            <h2>Checkout Confirmed!</h2>
            <section>
                {giftcard ? (
                    <>
                        <div>{`Redeemed $${redemptionAmount}`}</div>
                        <div>{`For ${name}`}</div>
                    </>
                ) : (
                    ''
                )}
            </section>
            <Button
                ariaLabel="Prizeout your gift card"
                color={`primary`}
                onClick={confirmDone}
                size="medium"
                text="Done"
                type="submit"
            />
        </section>
    );
};

CheckoutConfirmationPanelView.propTypes = {
    setView: PropTypes.func,
};

export default checkoutPanelViewWrapper(CheckoutConfirmationPanelView, 'checkout-confirmation');
