import React from 'react';
import { PrizeoutOfferValueOptions } from '../../../slices/offers-slice';

import './checkout.less';

interface CheckoutCostSummaryProps {
    giftcard: PrizeoutOfferValueOptions;
}

export const CheckoutCostSummary: React.FC<CheckoutCostSummaryProps> = ({ giftcard }): React.ReactElement => {
    const redemptionAmount = (giftcard.cost_in_cents / 100).toFixed(2);
    const finalValue = (giftcard.value_in_cents / 100).toFixed(2);

    function bonusLine() {
        let displayPercent = '';
        let bonus = null;

        if (!giftcard.display_bonus && !giftcard.display_monetary_bonus) {
            return '';
        }
        if (!giftcard.display_bonus) {
            bonus = giftcard.display_monetary_bonus / 100;
        } else {
            const bonusPercent = giftcard.display_bonus / 100;
            displayPercent = `(${giftcard.display_bonus}%)`;
            bonus = Math.round(giftcard.cost_in_cents * bonusPercent) / 100;
        }

        return (
            <>
                <label className="bonus-line">{`Prizeout Bonus${displayPercent}`}</label>
                <div className="value bonus-line">${bonus.toFixed(2)}</div>
            </>
        );
    }

    return (
        <section className="checkout-cost-summary">
            <div className="grid">
                <label>Redemption Amount</label>
                <div className="value">${redemptionAmount}</div>
                {bonusLine()}
                <label>You Get</label>
                <div className="value">{finalValue}</div>
            </div>
        </section>
    );
};

export default CheckoutCostSummary;
