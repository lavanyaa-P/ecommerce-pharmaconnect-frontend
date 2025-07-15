// src/customer/pages/Checkout/Checkout.tsx
import { Box, Button, FormControlLabel, Modal, Radio, RadioGroup } from '@mui/material';
import React, { useEffect } from 'react';
import PricingCart from '../Cart/PricingCart';
import AddressCart from './AddressCart';
import AddressForm from './AddressForm';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { fetchUserAddresses } from '../../../State/customer/addressSlice';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../../State/customer/orderSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const paymentGatewayList = [
  {
    value: 'RAZORPAY',
    image:
      'https://bsmedia.business-standard.com/_media/bs/img/article/2022-07/04/full/1656922506-9167.jpg?im=FeatureCrop,size=(826,465)',
    label: '',
  },
  {
    value: 'STRIPE',
    image:
      'https://memberpress.com/wp-content/uploads/2017/09/Integrations-Stripe-1724x970-1.svg',
    label: '',
  },
];

const Checkout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [paymentGateway, setPaymentGateway] = React.useState('RAZORPAY');

  const addresses = useAppSelector((state) => state.address.addresses);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt') || '';
    dispatch(fetchUserAddresses(jwt));
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePaymentChange = (event: any) => {
    setPaymentGateway(event.target.value);
  };

const handleCheckout = async () => {
  const jwt = localStorage.getItem('jwt') || '';

  if (!jwt) {
    alert('User not authenticated');
    return;
  }

  if (!addresses || addresses.length === 0) {
    alert('No address selected');
    return;
  }

  try {
    const resultAction = await dispatch(
      createOrder({
        address: addresses[0],
        jwt,
        paymentGateway,
      })
    );

    if (createOrder.fulfilled.match(resultAction)) {
      console.log("Order successful, navigating to confirmation...");
      navigate('/order-confirmation');
    } else {
      console.error('Order creation failed:', resultAction.payload);
    }
  } catch (error) {
    console.error('Checkout failed:', error);
  }
};



  return (
    <>
      <div className="pt-10 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen">
        <div className="space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-9">
          <div className="col-span-2 space-y-5">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold">Select Address</h1>
              <Button onClick={handleOpen} sx={{ color: '#003399' }}>
                Add new Address
              </Button>
            </div>

            <div className="text-xs font-medium space-y-5">
              <p>Saved Addresses</p>
              <div className="space-y-3">
                {addresses.map((addr) => (
                  <AddressCart key={addr.id} address={addr} />
                ))}
              </div>
            </div>

            <div className="py-4 px-5 rounded-md border">
              <Button onClick={handleOpen} sx={{ color: '#003399' }}>
                Add new Address
              </Button>
            </div>
          </div>

          <div className="col-span-1">
            <div className="space-y-3 border p-5 rounded-md">
              <h1 className="text-primary-color font-medium pb-2 text-center">
                Choose Payment Gateway
              </h1>
              <RadioGroup
                row
                name="row-radio-buttons-group"
                className="flex justify-between pr-0"
                onChange={handlePaymentChange}
                value={paymentGateway}
              >
                {paymentGatewayList.map((item) => (
                  <FormControlLabel
                    key={item.value}
                    className="border w-[45%] pr-2 rounded-md flex justify-center"
                    value={item.value}
                    control={<Radio />}
                    label={
                      <img
                        className={`${
                          item.value === 'stripe' ? 'w-14' : ''
                        } object-cover`}
                        src={item.image}
                        alt={item.label}
                      />
                    }
                  />
                ))}
              </RadioGroup>
            </div>

            <div className="border rounded-md">
              <PricingCart />
              <div className="p-5">
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ py: '11px' }}
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddressForm paymentGateway={paymentGateway} />
        </Box>
      </Modal>
    </>
  );
};

export default Checkout;
