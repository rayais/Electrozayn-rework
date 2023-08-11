import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { emptyCart } from '../../actions/cartAction';
import { clearErrors, newOrder } from '../../actions/orderAction';
import Loader from '../Layouts/Loader';
import OrderSuccess from './OrderSuccess';

const OrderStatus = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);

    // const { loading, txn, error } = useSelector((state) => state.paymentStatus);
    const { loading: orderLoading, order, error: orderError } = useSelector((state) => state.newOrder);

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const orderData = {
        shippingInfo,
        orderItems: cartItems,
        totalPrice,
    }

    useEffect(() => {
            if (orderData) {
                dispatch(newOrder(orderData))
            } else {
                enqueueSnackbar("Processing Failed!", { variant: "error" });
                    navigate("/orders/failed");
            }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (orderLoading === false) {
            if (order) {
                enqueueSnackbar("Order Placed", { variant: "success" });
                dispatch(emptyCart());
                navigate("/orders/success");
            } else {
                navigate("/products");
            }
        }
        // eslint-disable-next-line
    }, [orderLoading])

    // useEffect(() => {
    //     if (error) {
    //         enqueueSnackbar(error, { variant: "error" });
    //         dispatch(clearErrors());
    //     }
    //     if (orderError) {
    //         enqueueSnackbar(orderError, { variant: "error" });
    //         dispatch(clearErrors());
    //     }
    //     // dispatch(getPaymentStatus(params.id));
    // }, [dispatch, error, orderError, params.id, enqueueSnackbar]);

    return (
        <>
            <Loader />
        <OrderSuccess />
        </>
    );
};

export default OrderStatus;
