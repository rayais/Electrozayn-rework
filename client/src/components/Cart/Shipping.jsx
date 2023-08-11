import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import priceSidebar from './PriceSidebar';
import Stepper from './Stepper';
import { useSnackbar } from 'notistack';
import { saveShippingInfo } from '../../actions/cartAction';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import states from '../../utils/states';

const Shipping = ({user}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { cartItems } = useSelector((state) => state.cart);
    const { shippingInfo } = useSelector((state) => state.cart);

    const [address, setAddress] = useState();
    const [email, setEmail] = useState(user.Email);
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState(null);
    const [phoneNo, setPhoneNo] = useState(user.PhoneNumber);
    const itemPrice = cartItems.length > 0 ? (cartItems[0]?.cuttedPrice || cartItems[0].price) : 0;
    const shippingSubmit = (e) => {
        e.preventDefault();

        if (phoneNo.length < 8 || phoneNo.length > 10) {
            enqueueSnackbar("Invalid Phone Number", { variant: "error" });
            return;
        }
        dispatch(saveShippingInfo({ address, country, state, pincode, phoneNo }));
        navigate("/order/confirm");
    }

    return (
        <>
            <MetaData title="Electrozayn - Le monde des composants électronique et de l'électronique Tunisie" />
            <main className="w-full mt-20">

                {/* <!-- row --> */}
                <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7 overflow-hidden">

                    {/* <!-- cart column --> */}
                    <div className="flex-1">

                        <Stepper activeStep={1} user={user}>
                            <div className="w-full bg-white">

                                <form onSubmit={shippingSubmit} autoComplete="off" className="flex flex-col justify-start gap-3 w-full sm:w-3/4 mx-1 sm:mx-8 my-4">

                                    <TextField
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        fullWidth
                                        label="Address"
                                        variant="outlined"
                                        required
                                    />

                                    <TextField
                                        value={user.Email}
                                        fullWidth
                                        label="Email"
                                        variant="outlined"
                                        required
                                    />

                                    <div className="flex gap-6">
                                        <TextField
                                            value={pincode}
                                            onChange={(e) => setPincode(e.target.value)}
                                            type="number"
                                            label="ZIP code"
                                            fullWidth
                                            variant="outlined"
                                            required
                                        />
                                        <TextField
                                            value={phoneNo}
                                            onChange={(e) => setPhoneNo(e.target.value)}
                                            type="number"
                                            label="Téléphone"
                                            fullWidth
                                            variant="outlined"
                                            required
                                        />
                                    </div>

                                    <div className="flex gap-6">
                                        <TextField
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            label="Pays"
                                            fullWidth
                                            required
                                        />
                                        <TextField
                                            label="PRIX"
                                            value={itemPrice}
                                            fullWidth
                                            variant="outlined"
                                            required
                                        />
                                    </div>


                                    <button type="submit" className="bg-primary-orange w-full sm:w-1/3 my-2 py-3.5 text-sm font-medium text-white shadow hover:shadow-lg rounded-sm uppercase outline-none">save and deliver here</button>
                                </form>
                            </div>
                        </Stepper>
                    </div>

                    <priceSidebar cartItems={cartItems} />
                </div>
            </main>
        </>
    );
};

export default Shipping;
