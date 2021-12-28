import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

import STRIPE_PUBLISHABLE from '../constants/stripe';
import  '../style/css/common.css';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

const CURRENCY = 'USD';

const fromDollarToCent = amount => parseInt(amount * 100);

const successPayment = data => {
  alert('Payment Successful');
};

const errorPayment = data => {
  alert('Payment Error');
};



const StripePayment = ({ name, order_id, amount,address }) =>
{
  const dispatch = useDispatch()
  
  const onToken = (amount, order_id) => token =>
 {  

    console.log("amount ",amount," descriptios: ",order_id," token : ",token)
    // dispatch(updateProduct({amount,order_id,token}))
      
   
}
  return(
<StripeCheckout
  name={name}
  description={'Order '+order_id}
  amount={fromDollarToCent(amount)}
  token={onToken(amount,order_id)}
  currency={CURRENCY}
  stripeKey={STRIPE_PUBLISHABLE}
  panelLabel="Pay" 
  image="/coloshop-new.png"
  ComponentClass="div"
  zipCode={false} 
  allowRememberMe   
  reconfigureOnUpdate={false}
   >
   <Button
          variant='custom'
          type='button'
          className='btn-block'     
  >
                  Pay
    </Button>
</StripeCheckout>
  )}
export default StripePayment;
