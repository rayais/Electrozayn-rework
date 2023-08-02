import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';
import PriceSidebar from './PriceSidebar';
import Stepper from './Stepper';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { emptyCart } from '../../actions/cartAction';
import { newOrder } from '../../actions/orderAction';

const OrderConfirm = () => {

    const navigate = useNavigate();
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { loading: orderLoading, order, error: orderError } = useSelector((state) => state.newOrder);

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const orderData = {
        shippingInfo,
        orderItems: cartItems,
        totalPrice,
    }
    
    const handleConfirm = () => {
        dispatch(newOrder(orderData))
        dispatch(emptyCart())
        navigate('/orders')

    }

    

    return (
        <>
        <MetaData title="Electrozayn - Le monde des composants électronique et de l'électronique Tunisie" />

        <main className="w-full mt-20">

            {/* <!-- row --> */}
            <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">

                {/* <!-- cart column --> */}
                <div className="flex-1">

                    <Stepper activeStep={2}>
                        <div className="w-full bg-white">
                            {cartItems?.map((item, i) => (
                                <CartItem {...item} inCart={false} key={i} />
                            ))}
                        </div>
                        <div className="flex justify-between items-center mt-4 bg-white px-6 py-3 rounded-b-sm">
                            <p className="text-sm">Order confirmation email will be sent to <span className="font-medium">{user.email}</span></p>
                            <button onClick={handleConfirm} className="bg-primary-orange px-6 py-2 text-white font-medium rounded-sm shadow hover:shadow-lg uppercase">continue</button>
                        </div>
                    </Stepper>
                </div>

                <PriceSidebar cartItems={cartItems} />
            </div>
        </main>
        </>
    );
};

export default OrderConfirm;
