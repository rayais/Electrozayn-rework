import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, registerUser } from '../../actions/userAction';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import FormSidebar from './FormSidebar';
import axios from "axios"



const Register = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    
    const [firstNameError, setFirstNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);

    const { loading, isAuthenticated, error } = useSelector((state) => state.user);

    const [user, setUser] = useState({
        FirstName: "",
        Email: "",
        Password: "",
        PhoneNumber: "",
    });

    const { FirstName, Email, Password, PhoneNumber } = user;

    

    const handleRegister = (e) => {
         e.preventDefault();
    if (FirstName === "") {
      setFirstNameError(true);
    } else {
      setFirstNameError(false);
    }
    if (!/\S+@\S+\.\S+/.test(Email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (Password.length < 8) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    if (!PhoneNumber) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
    if (
      FirstName &&
      /\S+@\S+\.\S+/.test(Email) &&
      Password.length >= 8 &&
      PhoneNumber
    ) {

       dispatch(registerUser(user))
    }
    }

    const handleDataChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate('/')
        }
    }, [dispatch, error, isAuthenticated, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Electrozayn - Le monde des composants électronique et de l'électronique Tunisie" />

            {loading && <BackdropLoader />}
            <main className="w-full mt-12 sm:pt-20 sm:mt-0">

                {/* <!-- row --> */}
                <div className="flex sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow-lg">

                    <FormSidebar
                        title="Looks like you're new here!"
                        tag="Sign up with your mobile number to get started"
                    />

                    {/* <!-- signup column --> */}
                    <div className="flex-1 overflow-hidden">

                        {/* <!-- personal info procedure container --> */}
                        <form
                            onSubmit={handleRegister}
                            encType="multipart/form-data"
                            className="p-5 sm:p-10"
                        >
                            <div className="flex flex-col gap-4 items-start">

                                {/* <!-- input container column --> */}
                                <div className="flex flex-col w-full justify-between sm:flex-col gap-3 items-center">
                                    <TextField
                                        fullWidth
                                        id="full-name"
                                        label="Full Name"
                                        name="FirstName"
                                        value={FirstName}
                                        onChange={handleDataChange}
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        type="email"
                                        name="Email"
                                        value={Email}
                                        onChange={handleDataChange}
                                        required
                                    />
                                </div>
                                {/* <!-- input container column --> */}

                                {/* <!-- input container column --> */}
                                <div className="flex flex-col w-full justify-between sm:flex-row gap-3 items-center">
                                    <TextField
                                        id="password"
                                        label="Password"
                                        type="password"
                                        name="Password"
                                        value={Password}
                                        onChange={handleDataChange}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col w-full justify-between sm:flex-row gap-3 items-center">
                                    <TextField
                                        id="Phone Number"
                                        label="Number"
                                        type="Number"
                                        name="PhoneNumber"
                                        value={PhoneNumber}
                                        onChange={handleDataChange}
                                        required
                                    />
                                </div>
                                {/* <!-- input container column --> */}

                                {/* <div className="flex flex-col w-full justify-between sm:flex-row gap-3 items-center">
                                    <Avatar
                                        alt="Avatar Preview"
                                        src={avatarPreview}
                                        sx={{ width: 56, height: 56 }}
                                    />
                                    <label className="rounded font-medium bg-gray-400 text-center cursor-pointer text-white w-full py-2 px-2.5 shadow hover:shadow-lg">
                                        <input
                                            type="file"
                                            name="avatar"
                                            accept="image/*"
                                            onChange={handleDataChange}
                                            className="hidden"
                                        />
                                        Choose File
                                    </label>
                                </div> */}
                                <button type="submit" className="text-white py-3 w-full bg-primary-orange shadow hover:shadow-lg rounded-sm font-medium">Signup</button>
                                <Link to="/login" className="hover:bg-gray-50 text-primary-blue text-center py-3 w-full shadow border rounded-sm font-medium">Existing User? Log in</Link>
                            </div>

                        </form>
                        {/* <!-- personal info procedure container --> */}

                    </div>
                    {/* <!-- signup column --> */}
                </div>
                {/* <!-- row --> */}

            </main>
        </>
    );
};

export default Register;
