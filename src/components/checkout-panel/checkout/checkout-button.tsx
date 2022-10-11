import React from 'react';
import { Button } from '../../common';

interface CheckoutButtonProps {
    onClick: () => void;
}

export const CheckoutButton: React.FC<CheckoutButtonProps> = ({ onClick }): React.ReactElement => {
    const buttonText = 'Prizeout Gift Card';
    return (
        <>
            <Button
                ariaLabel="Prizeout your gift card"
                color={`primary`}
                onClick={onClick}
                size="medium"
                text={buttonText}
                type="submit"
            />
        </>
    );
};

export default CheckoutButton;
