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
import { registerUser, updateuser } from '../../actions/userAction';

const Shipping = ({user}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { cartItems } = useSelector((state) => state.cart);
    const { shippingInfo } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(user?.Address);
    const [email, setEmail] = useState(user?.Email);
    const [country, setCountry] = useState(user?.country);
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState(user?.Zip);
    const [phoneNo, setPhoneNo] = useState(user?.PhoneNumber);
    const [FirstName,setFirstName]=useState(user?.FirstName)
    const [Password,setPassword]=useState('')
    const itemPrice = cartItems.reduce((total, item) => {
        const price = item.cuttedPrice !== undefined ? item.cuttedPrice : item.price;
        return total + price;
    }, 0);
    
    const shippingSubmit = (e) => {
        e.preventDefault();

        if (phoneNo.toString().length < 8 || phoneNo.toString().length > 10) {
            enqueueSnackbar("Invalid Phone Number", { variant: "error" });
            return;
        }
        if(Password.length>0){
            dispatch(registerUser({FirstName:FirstName, Email:email,PhoneNumber:phoneNo,Password:Password,Address:address,Zip:pincode,country:country}))
        }else{
            dispatch(updateuser(user?.id,{FirstName:FirstName,Email:email,PhoneNumber:phoneNo,Password:Password,Address:address,Zip:pincode,country:country}))
        }
        dispatch(saveShippingInfo({ FirstName,email, address, country, state, pincode, phoneNo }));
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

                                <form  autoComplete="off" className="flex flex-col justify-start gap-3 w-full sm:w-3/4 mx-1 sm:mx-8 my-4">
                                <TextField
                                        value={FirstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        fullWidth
                                        label="Nom"
                                        variant="outlined"
                                        required
                                    />
                                    <TextField
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        fullWidth
                                        label="Address"
                                        variant="outlined"
                                        required
                                    />

                                    <TextField
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        fullWidth
                                        label="Email"
                                        variant="outlined"
                                        required
                                    />
                                      {!user?<TextField
                                        value={Password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        fullWidth
                                        label="Password"
                                        variant="outlined"
                                        required
                                        type="password"
                                    />:null}
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
                                    </div>


                                    <button onClick={(e)=>shippingSubmit(e)} type="button" className="bg-primary-orange w-full sm:w-1/3 my-2 py-3.5 text-sm font-medium text-white shadow hover:shadow-lg rounded-sm uppercase outline-none">CONTINUER</button>
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
